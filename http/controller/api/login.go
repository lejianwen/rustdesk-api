package api

import (
	"Gwen/global"
	"Gwen/http/request/api"
	"Gwen/http/response"
	apiResp "Gwen/http/response/api"
	"Gwen/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Login struct {
}

// Login 登录
// @Tags 登录
// @Summary 登录
// @Description 登录
// @Accept  json
// @Produce  json
// @Param body body api.LoginForm true "登录表单"
// @Success 200 {object} apiResp.LoginRes
// @Failure 500 {object} response.ErrorResponse
// @Router /login [post]
func (l *Login) Login(c *gin.Context) {
	f := &api.LoginForm{}
	err := c.ShouldBindJSON(f)
	if err != nil {
		response.Error(c, "系统错误")
		return
	}

	errList := global.Validator.ValidStruct(f)
	if len(errList) > 0 {
		response.Error(c, errList[0])
		return
	}

	u := service.AllService.UserService.InfoByUsernamePassword(f.Username, f.Password)

	if u.Id == 0 {
		response.Error(c, "用户名或密码错误")
		return
	}

	ut := service.AllService.UserService.Login(u)

	c.JSON(http.StatusOK, apiResp.LoginRes{
		AccessToken: ut.Token,
		Type:        "access_token",
		User:        *(&apiResp.UserPayload{}).FromUser(u),
	})
}

// LoginOptions
// @Tags 登录
// @Summary 登录选项
// @Description 登录选项
// @Accept  json
// @Produce  json
// @Success 200 {object} []string
// @Failure 500 {object} response.ErrorResponse
// @Router /login-options [post]
func (l *Login) LoginOptions(c *gin.Context) {
	test := []string{
		//"common-oidc/[{\"name\":\"google\"},{\"name\":\"github\"},{\"name\":\"facebook\"},{\"name\":\"网页授权登录\",\"icon\":\"\"}]",
		//"oidc/myapp",
	}
	c.JSON(http.StatusOK, test)
}

// Logout
// @Tags 登录
// @Summary 登出
// @Description 登出
// @Accept  json
// @Produce  json
// @Success 200 {string} string
// @Failure 500 {object} response.ErrorResponse
// @Router /logout [post]
func (l *Login) Logout(c *gin.Context) {
	u := service.AllService.UserService.CurUser(c)
	token, ok := c.Get("token")
	if ok {
		service.AllService.UserService.Logout(u, token.(string))
	}
	c.JSON(http.StatusOK, nil)

}
