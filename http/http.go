package http

import (
	"Gwen/global"
	"Gwen/http/middleware"
	"Gwen/http/router"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
)

func ApiInit() {
	gin.SetMode(global.Config.Gin.Mode)
	g := gin.New()

	if global.Config.Gin.Mode == gin.ReleaseMode {
		//修改gin Recovery日志 输出为logger的输出点
		if global.Logger != nil {
			gin.DefaultErrorWriter = global.Logger.WriterLevel(logrus.ErrorLevel)
		}
	}
	g.NoRoute(func(c *gin.Context) {
		c.String(http.StatusNotFound, "404 not found")
	})
	g.Use(middleware.Logger(), gin.Recovery())
	router.WebInit(g)
	router.Init(g)
	router.ApiInit(g)
	Run(g, global.Config.Gin.ApiAddr)
}
