package api

import (
	"Gwen/global"
	"Gwen/http/request/api"
	"Gwen/http/response"
	apiResp "Gwen/http/response/api"
	"Gwen/model"
	"Gwen/service"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"strings"
)

type Oauth struct {
}

// OidcAuth
// @Tags Oauth
// @Summary OidcAuth
// @Description OidcAuth
// @Accept  json
// @Produce  json
// @Success 200 {object} apiResp.LoginRes
// @Failure 500 {object} response.ErrorResponse
// @Router /oidc/auth [post]
func (o *Oauth) OidcAuth(c *gin.Context) {
	f := &api.OidcAuthRequest{}
	err := c.ShouldBindJSON(&f)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	//fmt.Println(f)
	if f.Op != model.OauthTypeWebauth && f.Op != model.OauthTypeGoogle && f.Op != model.OauthTypeGithub && f.Op != model.OauthTypeOidc {
		response.Error(c, response.TranslateMsg(c, "ParamsError"))
		return
	}

	err, code, url := service.AllService.OauthService.BeginAuth(f.Op)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, err.Error()))
		return
	}

	service.AllService.OauthService.SetOauthCache(code, &service.OauthCacheItem{
		Action:     service.OauthActionTypeLogin,
		Id:         f.Id,
		Op:         f.Op,
		Uuid:       f.Uuid,
		DeviceName: f.DeviceInfo.Name,
		DeviceOs:   f.DeviceInfo.Os,
		DeviceType: f.DeviceInfo.Type,
	}, 5*60)
	//fmt.Println("code url", code, url)
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"url":  url,
	})
}

func (o *Oauth) OidcAuthQueryPre(c *gin.Context) (*model.User, *model.UserToken) {
	var u *model.User
	var ut *model.UserToken
	q := &api.OidcAuthQuery{}
	clientIp := GetRealIp(c)
	// 解析查询参数并处理错误
	if err := c.ShouldBindQuery(q); err != nil {
		response.Error(c, response.TranslateMsg(c, "ParamsError")+": "+err.Error())
		return nil, nil
	}

	// 获取 OAuth 缓存
	v := service.AllService.OauthService.GetOauthCache(q.Code)
	if v == nil {
		response.Error(c, response.TranslateMsg(c, "OauthExpired"))
		return nil, nil
	}

	// 如果 UserId 为 0，说明还在授权中
	if v.UserId == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "Authorization in progress, please login and bind"})
		return nil, nil
	}

	// 获取用户信息
	u = service.AllService.UserService.InfoById(v.UserId)
	if u == nil {
		response.Error(c, response.TranslateMsg(c, "UserNotFound"))
		return nil, nil
	}

	// 删除 OAuth 缓存
	service.AllService.OauthService.DeleteOauthCache(q.Code)

	// 创建登录日志并生成用户令牌
	ut = service.AllService.UserService.Login(u, &model.LoginLog{
		UserId:   u.Id,
		Client:   v.DeviceType,
		Uuid:     v.Uuid,
		Ip:       clientIp,
		Type:     model.LoginLogTypeOauth,
		Platform: v.DeviceOs,
	})

	if ut == nil {
		response.Error(c, response.TranslateMsg(c, "LoginFailed"))
		return nil, nil
	}

	// 返回用户令牌
	return u, ut
}

// OidcAuthQuery
// @Tags Oauth
// @Summary OidcAuthQuery
// @Description OidcAuthQuery
// @Accept  json
// @Produce  json
// @Success 200 {object} apiResp.LoginRes
// @Failure 500 {object} response.ErrorResponse
// @Router /oidc/auth-query [get]
func (o *Oauth) OidcAuthQuery(c *gin.Context) {
	u, ut := o.OidcAuthQueryPre(c)
	if u == nil || ut == nil {
		return
	}
	c.JSON(http.StatusOK, apiResp.LoginRes{
		AccessToken: ut.Token,
		Type:        "access_token",
		User:        *(&apiResp.UserPayload{}).FromUser(u),
	})
}

// OauthCallback 回调
// @Tags Oauth
// @Summary OauthCallback
// @Description OauthCallback
// @Accept  json
// @Produce  json
// @Success 200 {object} apiResp.LoginRes
// @Failure 500 {object} response.ErrorResponse
// @Router /oauth/callback [get]
func (o *Oauth) OauthCallback(c *gin.Context) {
	state := c.Query("state")
	if state == "" {
		c.String(http.StatusInternalServerError, response.TranslateParamMsg(c, "ParamIsEmpty", "state"))
		return
	}

	cacheKey := state
	//从缓存中获取
	v := service.AllService.OauthService.GetOauthCache(cacheKey)
	if v == nil {
		c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthExpired"))
		return
	}

	ty := v.Op
	ac := v.Action
	var u *model.User
	openid := ""
	thirdName := ""
	//fmt.Println("ty ac ", ty, ac)

	if ty == model.OauthTypeGithub {
		code := c.Query("code")
		err, userData := service.AllService.OauthService.GithubCallback(code)
		if err != nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthFailed")+response.TranslateMsg(c, err.Error()))
			return
		}
		openid = strconv.Itoa(userData.Id)
		thirdName = userData.Login
	} else if ty == model.OauthTypeGoogle {
		code := c.Query("code")
		err, userData := service.AllService.OauthService.GoogleCallback(code)
		if err != nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthFailed")+response.TranslateMsg(c, err.Error()))
			return
		}
		openid = userData.Email
		//将空格替换成_
		thirdName = strings.Replace(userData.Name, " ", "_", -1)
	} else if ty == model.OauthTypeOidc {
		code := c.Query("code")
		err, userData := service.AllService.OauthService.OidcCallback(code)
		if err != nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthFailed")+response.TranslateMsg(c, err.Error()))
			return
		}
		openid = userData.Sub
		thirdName = userData.PreferredUsername
	} else {
		c.String(http.StatusInternalServerError, response.TranslateMsg(c, "ParamsError"))
		return
	}
	if ac == service.OauthActionTypeBind {

		//fmt.Println("bind", ty, userData)
		utr := service.AllService.OauthService.UserThirdInfo(ty, openid)
		if utr.UserId > 0 {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthHasBindOtherUser"))
			return
		}
		//绑定
		u = service.AllService.UserService.InfoById(v.UserId)
		if u == nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "ItemNotFound"))
			return
		}
		//绑定
		err := service.AllService.OauthService.BindOauthUser(ty, openid, thirdName, v.UserId)
		if err != nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "BindFail"))
			return
		}
		c.String(http.StatusOK, response.TranslateMsg(c, "BindSuccess"))
		return

	} else if ac == service.OauthActionTypeLogin {
		//登录
		if v.UserId != 0 {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthHasBeenSuccess"))
			return
		}
		u = service.AllService.UserService.InfoByGithubId(openid)
		if u == nil {
			oa := service.AllService.OauthService.InfoByOp(ty)
			if !*oa.AutoRegister {
				//c.String(http.StatusInternalServerError, "还未绑定用户，请先绑定")
				v.ThirdName = thirdName
				v.ThirdOpenId = openid
				url := global.Config.Rustdesk.ApiServer + "/_admin/#/oauth/bind/" + cacheKey
				c.Redirect(http.StatusFound, url)
				return
			}

			//自动注册
			u = service.AllService.UserService.RegisterByOauth(ty, thirdName, openid)
			if u.Id == 0 {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthRegisterFailed"))
				return
			}
		}
		v.UserId = u.Id
		service.AllService.OauthService.SetOauthCache(cacheKey, v, 0)
		// 如果是webadmin，登录成功后跳转到webadmin
		if v.DeviceType == "webadmin" {
			/*service.AllService.UserService.Login(u, &model.LoginLog{
				UserId:   u.Id,
				Client:   "webadmin",
				Uuid:     "", //must be empty
				Ip:       c.ClientIP(),
				Type:     model.LoginLogTypeOauth,
				Platform: v.DeviceOs,
			})*/
			url := global.Config.Rustdesk.ApiServer + "/_admin/#/"
			c.Redirect(http.StatusFound, url)
			return
		}
		c.String(http.StatusOK, response.TranslateMsg(c, "OauthSuccess"))
		return
	} else {
		c.String(http.StatusInternalServerError, response.TranslateMsg(c, "ParamsError"))
		return
	}

}
