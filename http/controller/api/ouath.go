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
		response.Error(c, "参数错误")
		return
	}
	if f.Op != model.OauthTypeWebauth && f.Op != model.OauthTypeGoogle && f.Op != model.OauthTypeGithub {
		response.Error(c, "参数错误")
		return
	}

	err, code, url := service.AllService.OauthService.BeginAuth(f.Op)
	if err != nil {
		response.Error(c, err.Error())
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
	q := &api.OidcAuthQuery{}
	err := c.ShouldBindQuery(q)
	if err != nil {
		response.Error(c, "参数错误")
		return
	}
	v := service.AllService.OauthService.GetOauthCache(q.Code)
	if v == nil {
		response.Error(c, "授权已过期，请重新授权")
		return
	}
	if v.UserId == 0 {
		//正在授权
		c.JSON(http.StatusOK, gin.H{})
		return
	}
	u := service.AllService.UserService.InfoById(v.UserId)
	//fmt.Println("auth success u", u)
	if u.Id > 0 {
		service.AllService.OauthService.DeleteOauthCache(q.Code)
		ut := service.AllService.UserService.Login(u, &model.LoginLog{
			UserId:   u.Id,
			Client:   v.DeviceType,
			Uuid:     v.Uuid,
			Ip:       c.ClientIP(),
			Type:     model.LoginLogTypeOauth,
			Platform: v.DeviceOs,
		})
		c.JSON(http.StatusOK, apiResp.LoginRes{
			AccessToken: ut.Token,
			Type:        "access_token",
			User:        *(&apiResp.UserPayload{}).FromUser(u),
		})
		return
	}
	response.Error(c, "用户不存在")
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
		c.String(http.StatusInternalServerError, "state为空")
		return
	}

	cacheKey := state
	//从缓存中获取
	v := service.AllService.OauthService.GetOauthCache(cacheKey)
	if v == nil {
		c.String(http.StatusInternalServerError, "授权已过期，请重新授权")
		return
	}

	ty := v.Op
	ac := v.Action
	//fmt.Println("ty ac ", ty, ac)
	if ty == model.OauthTypeGithub {
		code := c.Query("code")
		err, userData := service.AllService.OauthService.GithubCallback(code)
		if err != nil {
			c.String(http.StatusInternalServerError, "授权失败:"+err.Error())
			return
		}
		if ac == service.OauthActionTypeBind {
			//fmt.Println("bind", ty, userData)
			utr := service.AllService.OauthService.UserThirdInfo(ty, strconv.Itoa(userData.Id))
			if utr.UserId > 0 {
				c.String(http.StatusInternalServerError, "已经绑定其他账号")
				return
			}
			//绑定
			u := service.AllService.UserService.InfoById(v.UserId)
			if u == nil {
				c.String(http.StatusInternalServerError, "用户不存在")
				return
			}
			//绑定github
			err = service.AllService.OauthService.BindGithubUser(strconv.Itoa(userData.Id), userData.Login, v.UserId)
			if err != nil {
				c.String(http.StatusInternalServerError, "绑定失败")
				return
			}
			c.String(http.StatusOK, "绑定成功")
			return
		}
		//登录
		if ac == service.OauthActionTypeLogin {
			if v.UserId != 0 {
				c.String(http.StatusInternalServerError, "授权已经成功")
				return
			}
			u := service.AllService.UserService.InfoByGithubId(strconv.Itoa(userData.Id))
			if u == nil {
				oa := service.AllService.OauthService.InfoByOp(ty)
				if !*oa.AutoRegister {
					//c.String(http.StatusInternalServerError, "还未绑定用户，请先绑定")
					v.ThirdName = userData.Login
					v.ThirdOpenId = strconv.Itoa(userData.Id)
					url := global.Config.Rustdesk.ApiServer + "/_admin/#/oauth/bind/" + cacheKey
					c.Redirect(http.StatusFound, url)
					return
				}

				//自动注册
				u = service.AllService.UserService.RegisterByGithub(userData.Login, int64(userData.Id))
				if u.Id == 0 {
					c.String(http.StatusInternalServerError, "注册失败")
					return
				}
			}

			v.UserId = u.Id
			service.AllService.OauthService.SetOauthCache(cacheKey, v, 0)
			c.String(http.StatusOK, "授权成功")
			return
		}

		//返回js
		c.Header("Content-Type", "text/html; charset=utf-8")
		c.String(http.StatusOK, "授权错误")
		//up := &apiResp.UserPayload{}
		//c.JSON(http.StatusOK, apiResp.LoginRes{
		//	AccessToken: ut.Token,
		//	Type:        "access_token",
		//	User:        *up.FromUser(u),
		//})

	}

}

// WebOauthLogin
// @Tags Oauth
// @Summary WebOauthLogin
// @Description WebOauthLogin
// @Accept  json
// @Produce  json
// @Success 200 {string} string
// @Failure 500 {string} string
// @Router /oauth/login [get]
func (o *Oauth) WebOauthLogin(c *gin.Context) {

}
