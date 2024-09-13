package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// Cors 跨域
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.GetHeader("Origin")
		//fmt.Println("origin", origin)
		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Headers", "api-token,content-type,authorization ")
		c.Header("Access-Control-Allow-Methods", c.Request.Method)
		c.Header("Access-Control-Allow-Credentials", "true")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	}
}
