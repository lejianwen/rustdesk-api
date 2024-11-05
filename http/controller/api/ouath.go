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

	oauthService := service.AllService.OauthService
	var code string
	var url string
	err, code, url = oauthService.BeginAuth(f.Op)
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
		DeviceId: v.Id,
		Uuid:     v.Uuid,
		Ip:       c.ClientIP(),
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
	oauthService := service.AllService.OauthService
	//从缓存中获取
	oauthCache := oauthService.GetOauthCache(cacheKey)
	if oauthCache == nil {
		c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthExpired"))
		return
	}
	op := oauthCache.Op
	action := oauthCache.Action
	var user *model.User
	// 获取用户信息
	code := c.Query("code")
	err, oauthUser := oauthService.Callback(code, op)
	if err != nil {
		c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthFailed")+response.TranslateMsg(c, err.Error()))
		return
	}
	userId := oauthCache.UserId
	openid := oauthUser.OpenId
	if action == service.OauthActionTypeBind {

		//fmt.Println("bind", ty, userData)
		// 检查此openid是否已经绑定过
		utr := oauthService.UserThirdInfo(op, openid)
		if utr.UserId > 0 {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthHasBindOtherUser"))
			return
		}
		//绑定
		user = service.AllService.UserService.InfoById(userId)
		if user == nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "ItemNotFound"))
			return
		}
		//绑定
		err := oauthService.BindOauthUser(userId, oauthUser, op)
		if err != nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "BindFail"))
			return
		}
		c.String(http.StatusOK, response.TranslateMsg(c, "BindSuccess"))
		return

	} else if action == service.OauthActionTypeLogin {
		//登录
		if userId != 0 {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthHasBeenSuccess"))
			return
		}
		user = service.AllService.UserService.InfoByOauthId(op, openid)
		if user == nil {
			oauthConfig := oauthService.InfoByOp(op)
			if !*oauthConfig.AutoRegister {
				//c.String(http.StatusInternalServerError, "还未绑定用户，请先绑定")
				oauthCache.UpdateFromOauthUser(oauthUser)
				url := global.Config.Rustdesk.ApiServer + "/_admin/#/oauth/bind/" + cacheKey
				c.Redirect(http.StatusFound, url)
				return
			}

			//自动注册
			err, user = service.AllService.UserService.RegisterByOauth(oauthUser, op)
			if err != nil {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, err.Error()))
				return
			}
		}
		oauthCache.UserId = user.Id
		oauthService.SetOauthCache(cacheKey, oauthCache, 0)
		// 如果是webadmin，登录成功后跳转到webadmin
		if oauthCache.DeviceType == model.LoginLogClientWebAdmin {
			/*service.AllService.UserService.Login(u, &model.LoginLog{
				UserId:   u.Id,
				Client:   "webadmin",
				Uuid:     "", //must be empty
				Ip:       c.ClientIP(),
				Type:     model.LoginLogTypeOauth,
				Platform: oauthService.DeviceOs,
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
