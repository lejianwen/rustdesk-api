package middleware

import (
	"Gwen/global"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// Logger 日志中间件
func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		global.Logger.WithFields(
			logrus.Fields{
				"uri":    c.Request.URL,
				"ip":     c.ClientIP(),
				"method": c.Request.Method,
			}).Debug("Request")
		c.Next()
	}
}
