package router

import (
	_ "Gwen/docs/api"
	"Gwen/global"
	"Gwen/http/controller/api"
	"Gwen/http/middleware"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"net/http"
)

func ApiInit(g *gin.Engine) {

	//g.Use(middleware.Cors())
	//swagger
	g.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, ginSwagger.InstanceName("api")))

	frg := g.Group("/api")

	//frg.Use(middleware.Cors())
	frg.OPTIONS("/*any", nil)

	i := &api.Index{}
	frg.GET("/", i.Index)

	frg.POST("/heartbeat", i.Heartbeat)

	{
		l := &api.Login{}
		// 如果返回oidc则可以通过oidc登录
		frg.GET("/login-options", l.LoginOptions)
		frg.POST("/login", l.Login)

	}
	{
		o := &api.Oauth{}
		// [method:POST] [uri:/api/oidc/auth]
		frg.POST("/oidc/auth", o.OidcAuth)
		// [method:GET] [uri:/api/oidc/auth-query?code=abc&id=xxxxx&uuid=xxxxx]
		frg.GET("/oidc/auth-query", o.OidcAuthQuery)
		//api/oauth/callback
		frg.GET("/oauth/callback", o.OauthCallback)
		frg.GET("/oauth/login", o.OauthCallback)
	}
	{
		pe := &api.Peer{}
		//提交系统信息
		frg.POST("/sysinfo", pe.SysInfo)
	}
	frg.Use(middleware.RustAuth())
	{
		w := &api.WebClient{}
		frg.POST("/server-config", w.ServerConfig)
	}

	{
		u := &api.User{}
		frg.GET("/user/info", u.Info)
		frg.POST("/currentUser", u.Info)
	}
	{
		l := &api.Login{}
		frg.POST("/logout", l.Logout)
	}
	{
		gr := &api.Group{}
		frg.GET("/users", gr.Users)
		frg.GET("/peers", gr.Peers)
	}

	{
		ab := &api.Ab{}
		//获取地址
		frg.GET("/ab", ab.Ab)
		//更新地址
		frg.POST("/ab", ab.UpAb)
	}

	//访问静态文件
	g.StaticFS("/upload", http.Dir(global.Config.Gin.ResourcesPath+"/public/upload"))
}
