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
		response.Error(c, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}
	v := service.AllService.OauthService.GetOauthCache(q.Code)
	if v == nil {
		response.Error(c, response.TranslateMsg(c, "OauthExpired"))
		return
	}
	if v.UserId == 0 {
		//正在授权
		c.JSON(http.StatusOK, gin.H{})
		return
	}
	u := service.AllService.UserService.InfoById(v.UserId)
	//fmt.Println("auth success u", u)
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
	//fmt.Println("ty ac ", ty, ac)
	if ty == model.OauthTypeGithub {
		code := c.Query("code")
		err, userData := service.AllService.OauthService.GithubCallback(code)
		if err != nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthFailed")+response.TranslateMsg(c, err.Error()))
			return
		}
		if ac == service.OauthActionTypeBind {
			//fmt.Println("bind", ty, userData)
			utr := service.AllService.OauthService.UserThirdInfo(ty, strconv.Itoa(userData.Id))
			if utr.UserId > 0 {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthHasBindOtherUser"))
				return
			}
			//绑定
			u := service.AllService.UserService.InfoById(v.UserId)
			if u == nil {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "ItemNotFound"))
				return
			}
			//绑定github
			err = service.AllService.OauthService.BindGithubUser(strconv.Itoa(userData.Id), userData.Login, v.UserId)
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
				u = service.AllService.UserService.RegisterByGithub(userData.Login, strconv.Itoa(userData.Id))
				if u.Id == 0 {
					c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthRegisterFailed"))
					return
				}
			}

			v.UserId = u.Id
			service.AllService.OauthService.SetOauthCache(cacheKey, v, 0)
			c.String(http.StatusOK, response.TranslateMsg(c, "OauthSuccess"))
			return
		}

	}

	if ty == model.OauthTypeGoogle {
		code := c.Query("code")
		err, userData := service.AllService.OauthService.GoogleCallback(code)
		if err != nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthFailed")+response.TranslateMsg(c, err.Error()))
			return
		}
		//将空格替换成_
		googleName := strings.Replace(userData.Name, " ", "_", -1)
		if ac == service.OauthActionTypeBind {
			//fmt.Println("bind", ty, userData)
			utr := service.AllService.OauthService.UserThirdInfo(ty, userData.Email)
			if utr.UserId > 0 {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthHasBindOtherUser"))
				return
			}
			//绑定
			u := service.AllService.UserService.InfoById(v.UserId)
			if u == nil {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "ItemNotFound"))
				return
			}
			//绑定
			err = service.AllService.OauthService.BindGoogleUser(userData.Email, googleName, v.UserId)
			if err != nil {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "BindFail"))
				return
			}
			c.String(http.StatusOK, response.TranslateMsg(c, "BindSuccess"))
			return
		} else if ac == service.OauthActionTypeLogin {
			if v.UserId != 0 {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthHasBeenSuccess"))
				return
			}
			u := service.AllService.UserService.InfoByGoogleEmail(userData.Email)
			if u == nil {
				oa := service.AllService.OauthService.InfoByOp(ty)
				if !*oa.AutoRegister {
					//c.String(http.StatusInternalServerError, "还未绑定用户，请先绑定")

					v.ThirdName = googleName
					v.ThirdOpenId = userData.Email
					url := global.Config.Rustdesk.ApiServer + "/_admin/#/oauth/bind/" + cacheKey
					c.Redirect(http.StatusFound, url)
					return
				}

				//自动注册
				u = service.AllService.UserService.RegisterByGoogle(googleName, userData.Email)
				if u.Id == 0 {
					c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthRegisterFailed"))
					return
				}
			}

			v.UserId = u.Id
			service.AllService.OauthService.SetOauthCache(cacheKey, v, 0)
			c.String(http.StatusOK, response.TranslateMsg(c, "OauthSuccess"))
			return
		}
	}
	if ty == model.OauthTypeOidc {
		code := c.Query("code")
		err, userData := service.AllService.OauthService.OidcCallback(code)
		if err != nil {
			c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthFailed")+response.TranslateMsg(c, err.Error()))
			return
		}
		//将空格替换成_
		// OidcName := strings.Replace(userData.Name, " ", "_", -1)
		if ac == service.OauthActionTypeBind {
			//fmt.Println("bind", ty, userData)
			utr := service.AllService.OauthService.UserThirdInfo(ty, userData.Sub)
			if utr.UserId > 0 {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthHasBindOtherUser"))
				return
			}
			//绑定
			u := service.AllService.UserService.InfoById(v.UserId)
			if u == nil {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "ItemNotFound"))
				return
			}
			//绑定, user preffered_username as username
			err = service.AllService.OauthService.BindOidcUser(userData.Sub, userData.PreferredUsername, v.UserId)
			if err != nil {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "BindFail"))
				return
			}
			c.String(http.StatusOK, response.TranslateMsg(c, "BindSuccess"))
			return
		} else if ac == service.OauthActionTypeLogin {
			if v.UserId != 0 {
				c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthHasBeenSuccess"))
				return
			}
			u := service.AllService.UserService.InfoByOidcSub(userData.Sub)
			if u == nil {
				oa := service.AllService.OauthService.InfoByOp(ty)
				if !*oa.AutoRegister {
					//c.String(http.StatusInternalServerError, "还未绑定用户，请先绑定")

					v.ThirdName = userData.PreferredUsername
					v.ThirdOpenId = userData.Sub
					url := global.Config.Rustdesk.ApiServer + "/_admin/#/oauth/bind/" + cacheKey
					c.Redirect(http.StatusFound, url)
					return
				}

				//自动注册
				u = service.AllService.UserService.RegisterByOidc(userData.PreferredUsername, userData.Sub)
				if u.Id == 0 {
					c.String(http.StatusInternalServerError, response.TranslateMsg(c, "OauthRegisterFailed"))
					return
				}
			}

			v.UserId = u.Id
			service.AllService.OauthService.SetOauthCache(cacheKey, v, 0)
			c.String(http.StatusOK, response.TranslateMsg(c, "OauthSuccess"))
			return
		}
	}

	c.String(http.StatusInternalServerError, response.TranslateMsg(c, "SystemError"))

}
