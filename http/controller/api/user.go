package api

import (
	"github.com/gin-gonic/gin"
	apiResp "github.com/lejianwen/rustdesk-api/v2/http/response/api"
	"github.com/lejianwen/rustdesk-api/v2/service"
	"net/http"
)

type User struct {
}

// currentUser 当前用户
// @Tags 用户
// @Summary 用户信息
// @Description 用户信息
// @Accept  json
// @Produce  json
// @Success 200 {object} apiResp.UserPayload
// @Failure 500 {object} response.Response
// @Router /currentUser [get]
// @Security token
//func (u *User) currentUser(c *gin.Context) {
//	user := service.AllService.UserService.CurUser(c)
//	up := (&apiResp.UserPayload{}).FromName(user)
//	c.JSON(http.StatusOK, up)
//}

// Info 用户信息
// @Tags 用户
// @Summary 用户信息
// @Description 用户信息
// @Accept  json
// @Produce  json
// @Success 200 {object} apiResp.UserPayload
// @Failure 500 {object} response.Response
// @Router /currentUser [get]
// @Security token
func (u *User) Info(c *gin.Context) {
	user := service.AllService.UserService.CurUser(c)
	up := (&apiResp.UserPayload{}).FromUser(user)
	c.JSON(http.StatusOK, up)
}
