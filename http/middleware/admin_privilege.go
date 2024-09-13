package middleware

import (
	"Gwen/http/response"
	"Gwen/service"
	"github.com/gin-gonic/gin"
)

// AdminPrivilege ...
func AdminPrivilege() gin.HandlerFunc {
	return func(c *gin.Context) {
		u := service.AllService.UserService.CurUser(c)

		if !service.AllService.UserService.IsAdmin(u) {
			response.Fail(c, 403, "无权限")
			c.Abort()
			return
		}

		c.Next()
	}
}
