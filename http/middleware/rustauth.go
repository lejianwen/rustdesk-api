package middleware

import (
	"Gwen/global"
	"Gwen/service"
	"github.com/gin-gonic/gin"
)

func RustAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		//fmt.Println(c.Request.URL, c.Request.Header)
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

		//检查是否设置了jwt key
		if len(global.Jwt.Key) > 0 {
			uid, _ := service.AllService.UserService.VerifyJWT(token)
			if uid == 0 {
				c.JSON(401, gin.H{
					"error": "Unauthorized",
				})
				c.Abort()
				return
			}
		}

		user, ut := service.AllService.UserService.InfoByAccessToken(token)
		if user.Id == 0 {
			c.JSON(401, gin.H{
				"error": "Unauthorized",
			})
			c.Abort()
			return
		}
		if !service.AllService.UserService.CheckUserEnable(user) {
			c.JSON(401, gin.H{
				"error": "Unauthorized",
			})
			c.Abort()
			return
		}

		c.Set("curUser", user)
		c.Set("token", token)

		service.AllService.UserService.AutoRefreshAccessToken(ut)

		c.Next()
	}
}
