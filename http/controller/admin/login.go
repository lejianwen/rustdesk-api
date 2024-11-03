package admin

import (
	"Gwen/global"
	"Gwen/http/controller/api"
	"Gwen/http/request/admin"
	apiReq "Gwen/http/request/api"
	"Gwen/http/response"
	adResp "Gwen/http/response/admin"
	"Gwen/model"
	"Gwen/service"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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
	f := &admin.Login{}
	err := c.ShouldBindJSON(f)
	clientIp := api.GetRealIp(c)
	if err != nil {
		global.Logger.Warn(fmt.Sprintf("Login Fail: %s %s %s", "ParamsError", c.RemoteIP(), clientIp))
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}

	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		global.Logger.Warn(fmt.Sprintf("Login Fail: %s %s %s", "ParamsError", c.RemoteIP(), clientIp))
		response.Fail(c, 101, errList[0])
		return
	}
	u := service.AllService.UserService.InfoByUsernamePassword(f.Username, f.Password)

	if u.Id == 0 {
		global.Logger.Warn(fmt.Sprintf("Login Fail: %s %s %s", "UsernameOrPasswordError", c.RemoteIP(), clientIp))
		response.Fail(c, 101, response.TranslateMsg(c, "UsernameOrPasswordError"))
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

	response.Success(c, &adResp.LoginPayload{
		Token:      ut.Token,
		Username:   u.Username,
		RouteNames: service.AllService.UserService.RouteNames(u),
		Nickname:   u.Nickname,
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
	res := service.AllService.OauthService.List(1, 100, func(tx *gorm.DB) {
		tx.Select("op").Order("id")
	})
	var ops []string
	for _, v := range res.Oauths {
		ops = append(ops, v.Op)
	}
	response.Success(c, gin.H{
		"ops":      ops,
		"register": global.Config.App.Register,
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

	err, code, url := service.AllService.OauthService.BeginAuth(f.Op)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, err.Error()))
		return
	}

	service.AllService.OauthService.SetOauthCache(code, &service.OauthCacheItem{
		Action:     service.OauthActionTypeLogin,
		Op:         f.Op,
		Id:         f.Id,
		DeviceType: "webadmin",
		// DeviceOs: ct.Platform(c),
		DeviceOs: f.DeviceInfo.Os,
		Uuid:     f.Uuid,
	}, 5*60)

	response.Success(c, gin.H{
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
// @Success 200 {object} response.Response{data=adResp.LoginPayload}
// @Failure 500 {object} response.Response
// @Router /admin/oidc/auth-query [get]
func (ct *Login) OidcAuthQuery(c *gin.Context) {
	o := &api.Oauth{}
	u, ut := o.OidcAuthQueryPre(c)
	if ut == nil {
		return
	}
	//fmt.Println("u:", u)
	//fmt.Println("ut:", ut)
	response.Success(c, &adResp.LoginPayload{
		Token:      ut.Token,
		Username:   u.Username,
		RouteNames: service.AllService.UserService.RouteNames(u),
		Nickname:   u.Nickname,
	})
}
