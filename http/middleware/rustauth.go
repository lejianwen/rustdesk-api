package middleware

import (
	"Gwen/service"
	"github.com/gin-gonic/gin"
)

func RustAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		//fmt.Println(c.Request.Header)
		//获取HTTP_AUTHORIZATION
		token := c.GetHeader("Authorization")
		if token == "" {
			c.JSON(401, gin.H{
				"error": "Unauthorized",
			})
			c.Abort()
			return
		}
		if len(token) <= 7 {
			c.JSON(401, gin.H{
				"error": "Unauthorized",
			})
			c.Abort()
			return
		}
		//提取token，格式是Bearer {token}
		//这里只是简单的提取
		token = token[7:]
		//验证token
		user := service.AllService.UserService.InfoByAccessToken(token)
		if user.Id == 0 {
			c.JSON(401, gin.H{
				"error": "Unauthorized",
			})
			c.Abort()
			return
		}
		if !service.AllService.UserService.CheckUserEnable(user) {
			c.JSON(401, gin.H{
				"error": "账号已被禁用",
			})
			c.Abort()
			return
		}

		c.Set("curUser", user)
		c.Set("token", token)
		c.Next()
	}
}
