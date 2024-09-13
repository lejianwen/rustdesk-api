package api

import (
	apiResp "Gwen/http/response/api"
	"Gwen/service"
	"fmt"
	"github.com/gin-gonic/gin"
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
func (u *User) currentUser(c *gin.Context) {
	user := service.AllService.UserService.CurUser(c)
	up := (&apiResp.UserPayload{}).FromUser(user)
	c.JSON(http.StatusOK, up)
}

// Info 用户信息
// @Tags 用户
// @Summary 用户信息
// @Description 用户信息
// @Accept  json
// @Produce  json
// @Success 200 {object} apiResp.UserPayload
// @Failure 500 {object} response.Response
// @Router /api [get]
// @Security token
func (u *User) Info(c *gin.Context) {
	user := service.AllService.UserService.CurUser(c)
	up := (&apiResp.UserPayload{}).FromUser(user)
	c.JSON(http.StatusOK, up)
}

// Personal
// @Tags 用户
// @Summary 个人信息
// @Description 个人信息
// @Accept  json
// @Produce  json
// @Param string body string false  "string valid"
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /ab/personal [post]
// @Security BearerAuth
func (u *User) Personal(c *gin.Context) {
	//打印全部body
	fmt.Println(c.Request.Body)

	/**
	guid = json['guid'] ?? '',
	       name = json['name'] ?? '',
	       owner = json['owner'] ?? '',
	       note = json['note'] ?? '',
	       rule = json['rule'] ?? 0;
	*/
	//如果返回了guid，后面的请求会有变化
	c.JSON(http.StatusOK, gin.H{
		//"guid": "123456",
		//"name": "admindddd",
		//"rule": 1,
	})
}
