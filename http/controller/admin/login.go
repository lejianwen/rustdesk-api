package admin

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/lejianwen/rustdesk-api/v2/global"
	"github.com/lejianwen/rustdesk-api/v2/http/controller/api"
	"github.com/lejianwen/rustdesk-api/v2/http/request/admin"
	apiReq "github.com/lejianwen/rustdesk-api/v2/http/request/api"
	"github.com/lejianwen/rustdesk-api/v2/http/response"
	adResp "github.com/lejianwen/rustdesk-api/v2/http/response/admin"
	"github.com/lejianwen/rustdesk-api/v2/model"
	"github.com/lejianwen/rustdesk-api/v2/service"
)

type Login struct {
}

// Login 登录
// @Tags 登录
// @Summary 登录
// @Description 登录
// @Accept  json
// @Produce  json
// @Param body body admin.Login true "登录信息"
// @Success 200 {object} response.Response{data=adResp.LoginPayload}
// @Failure 500 {object} response.Response
// @Router /admin/login [post]
// @Security token
func (ct *Login) Login(c *gin.Context) {
	if global.Config.App.DisablePwdLogin {
		response.Fail(c, 101, response.TranslateMsg(c, "PwdLoginDisabled"))
		return
	}

	// 检查登录限制
	loginLimiter := global.LoginLimiter
	clientIp := c.ClientIP()
	_, needCaptcha := loginLimiter.CheckSecurityStatus(clientIp)

	f := &admin.Login{}
	err := c.ShouldBindJSON(f)
	if err != nil {
		loginLimiter.RecordFailedAttempt(clientIp)
		global.Logger.Warn(fmt.Sprintf("Login Fail: %s %s %s", "ParamsError", c.RemoteIP(), clientIp))
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}

	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		loginLimiter.RecordFailedAttempt(clientIp)
		global.Logger.Warn(fmt.Sprintf("Login Fail: %s %s %s", "ParamsError", c.RemoteIP(), clientIp))
		response.Fail(c, 101, errList[0])
		return
	}

	// 检查是否需要验证码
	if needCaptcha {
		if f.CaptchaId == "" || f.Captcha == "" || !loginLimiter.VerifyCaptcha(f.CaptchaId, f.Captcha) {
			response.Fail(c, 101, response.TranslateMsg(c, "CaptchaError"))
			return
		}
	}

	u := service.AllService.UserService.InfoByUsernamePassword(f.Username, f.Password)

	if u.Id == 0 {
		global.Logger.Warn(fmt.Sprintf("Login Fail: %s %s %s", "UsernameOrPasswordError", c.RemoteIP(), clientIp))
		loginLimiter.RecordFailedAttempt(clientIp)
		if _, needCaptcha = loginLimiter.CheckSecurityStatus(clientIp); needCaptcha {
			response.Fail(c, 110, response.TranslateMsg(c, "UsernameOrPasswordError"))
		} else {
			response.Fail(c, 101, response.TranslateMsg(c, "UsernameOrPasswordError"))
		}
		return
	}

	if !service.AllService.UserService.CheckUserEnable(u) {
		if needCaptcha {
			response.Fail(c, 110, response.TranslateMsg(c, "UserDisabled"))
			return
		}
		response.Fail(c, 101, response.TranslateMsg(c, "UserDisabled"))
		return
	}

	ut := service.AllService.UserService.Login(u, &model.LoginLog{
		UserId:   u.Id,
		Client:   model.LoginLogClientWebAdmin,
		Uuid:     "", //must be empty
		Ip:       clientIp,
		Type:     model.LoginLogTypeAccount,
		Platform: f.Platform,
	})

	// 登录成功，清除登录限制
	loginLimiter.RemoveAttempts(clientIp)
	responseLoginSuccess(c, u, ut.Token)
}
func (ct *Login) Captcha(c *gin.Context) {
	loginLimiter := global.LoginLimiter
	clientIp := c.ClientIP()
	banned, needCaptcha := loginLimiter.CheckSecurityStatus(clientIp)
	if banned {
		response.Fail(c, 101, response.TranslateMsg(c, "LoginBanned"))
		return
	}
	if !needCaptcha {
		response.Fail(c, 101, response.TranslateMsg(c, "NoCaptchaRequired"))
		return
	}
	err, captcha := loginLimiter.RequireCaptcha()
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "CaptchaError")+err.Error())
		return
	}
	err, b64 := loginLimiter.DrawCaptcha(captcha.Content)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "CaptchaError")+err.Error())
		return
	}
	response.Success(c, gin.H{
		"captcha": gin.H{
			"id":  captcha.Id,
			"b64": b64,
		},
	})
}

// Logout 登出
// @Tags 登录
// @Summary 登出
// @Description 登出
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/logout [post]
func (ct *Login) Logout(c *gin.Context) {
	u := service.AllService.UserService.CurUser(c)
	token, ok := c.Get("token")
	if ok {
		service.AllService.UserService.Logout(u, token.(string))
	}
	response.Success(c, nil)
}

// LoginOptions
// @Tags 登录
// @Summary 登录选项
// @Description 登录选项
// @Accept  json
// @Produce  json
// @Success 200 {object} []string
// @Failure 500 {object} response.ErrorResponse
// @Router /admin/login-options [post]
func (ct *Login) LoginOptions(c *gin.Context) {
	loginLimiter := global.LoginLimiter
	clientIp := c.ClientIP()
	banned, needCaptcha := loginLimiter.CheckSecurityStatus(clientIp)
	if banned {
		response.Fail(c, 101, response.TranslateMsg(c, "LoginBanned"))
		return
	}
	ops := service.AllService.OauthService.GetOauthProviders()
	response.Success(c, gin.H{
		"ops":          ops,
		"register":     global.Config.App.Register,
		"need_captcha": needCaptcha,
		"disable_pwd": 	global.Config.App.DisablePwdLogin,
		"auto_oidc":  	global.Config.App.DisablePwdLogin && len(ops) == 1,
	})
}

// OidcAuth
// @Tags Oauth
// @Summary OidcAuth
// @Description OidcAuth
// @Accept  json
// @Produce  json
// @Router /admin/oidc/auth [post]
func (ct *Login) OidcAuth(c *gin.Context) {
	// o := &api.Oauth{}
	// o.OidcAuth(c)
	f := &apiReq.OidcAuthRequest{}
	err := c.ShouldBindJSON(f)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}

	err, state, verifier, nonce, url := service.AllService.OauthService.BeginAuth(c, f.Op)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, err.Error()))
		return
	}

	service.AllService.OauthService.SetOauthCache(state, &service.OauthCacheItem{
		Action:     service.OauthActionTypeLogin,
		Op:         f.Op,
		Id:         f.Id,
		DeviceType: "webadmin",
		// DeviceOs: ct.Platform(c),
		DeviceOs: f.DeviceInfo.Os,
		Uuid:     f.Uuid,
		Verifier: verifier,
		Nonce:    nonce,
	}, 5*60)

	response.Success(c, gin.H{
		"code": state,
		"url":  url,
	})
}

// OidcAuthQuery
// @Tags Oauth
// @Summary OidcAuthQuery
// @Description OidcAuthQuery
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response{data=adResp.LoginPayload}
// @Failure 500 {object} response.Response
// @Router /admin/oidc/auth-query [get]
func (ct *Login) OidcAuthQuery(c *gin.Context) {
	o := &api.Oauth{}
	u, ut := o.OidcAuthQueryPre(c)
	if ut == nil {
		return
	}
	responseLoginSuccess(c, u, ut.Token)
}

func responseLoginSuccess(c *gin.Context, u *model.User, token string) {
	lp := &adResp.LoginPayload{}
	lp.FromUser(u)
	lp.Token = token
	lp.RouteNames = service.AllService.UserService.RouteNames(u)
	response.Success(c, lp)
}
