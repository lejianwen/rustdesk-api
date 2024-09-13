package router

import (
	_ "Gwen/docs/admin"
	"Gwen/http/controller/admin"
	"Gwen/http/middleware"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func Init(g *gin.Engine) {

	//swagger
	//g.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	g.GET("/admin/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, ginSwagger.InstanceName("admin")))

	adg := g.Group("/api/admin")
	LoginBind(adg)

	adg.Use(middleware.AdminAuth())
	//FileBind(adg)
	UserBind(adg)
	GroupBind(adg)
	TagBind(adg)
	AddressBookBind(adg)
	PeerBind(adg)

	rs := &admin.Rustdesk{}
	adg.GET("/server-config", rs.ServerConfig)

	//访问静态文件
	//g.StaticFS("/upload", http.Dir(global.Config.Gin.ResourcesPath+"/upload"))
}
func LoginBind(rg *gin.RouterGroup) {
	cont := &admin.Login{}
	rg.POST("/login", cont.Login)
	rg.POST("/logout", cont.Logout)
}

func UserBind(rg *gin.RouterGroup) {
	aR := rg.Group("/user")
	{
		cont := &admin.User{}
		aR.GET("/current", cont.Current)
		aR.POST("/changeCurPwd", cont.ChangeCurPwd)
	}
	aRP := rg.Group("/user").Use(middleware.AdminPrivilege())
	{
		cont := &admin.User{}
		aRP.GET("/list", cont.List)
		aRP.GET("/detail/:id", cont.Detail)
		aRP.POST("/create", cont.Create)
		aRP.POST("/update", cont.Update)
		aRP.POST("/delete", cont.Delete)
		aRP.POST("/changePwd", cont.UpdatePassword)
	}
}

func GroupBind(rg *gin.RouterGroup) {
	aR := rg.Group("/group").Use(middleware.AdminPrivilege())
	{
		cont := &admin.Group{}
		aR.GET("/list", cont.List)
		aR.GET("/detail/:id", cont.Detail)
		aR.POST("/create", cont.Create)
		aR.POST("/update", cont.Update)
		aR.POST("/delete", cont.Delete)
	}
}

func TagBind(rg *gin.RouterGroup) {
	aR := rg.Group("/tag")
	{
		cont := &admin.Tag{}
		aR.GET("/list", cont.List)
		aR.GET("/detail/:id", cont.Detail)
		aR.POST("/create", cont.Create)
		aR.POST("/update", cont.Update)
		aR.POST("/delete", cont.Delete)
	}
}

func AddressBookBind(rg *gin.RouterGroup) {
	aR := rg.Group("/address_book")
	{
		cont := &admin.AddressBook{}
		aR.GET("/list", cont.List)
		aR.GET("/detail/:id", cont.Detail)
		aR.POST("/create", cont.Create)
		aR.POST("/update", cont.Update)
		aR.POST("/delete", cont.Delete)
	}
}
func PeerBind(rg *gin.RouterGroup) {
	aR := rg.Group("/peer")
	{
		cont := &admin.Peer{}
		aR.GET("/list", cont.List)
		aR.GET("/detail/:id", cont.Detail)
		aR.POST("/create", cont.Create)
		aR.POST("/update", cont.Update)
		aR.POST("/delete", cont.Delete)
	}
}

/*
func FileBind(rg *gin.RouterGroup) {
	aR := rg.Group("/file")
	{
		cont := &admin.File{}
		aR.POST("/notify", cont.Notify)
		aR.OPTIONS("/oss_token", nil)
		aR.OPTIONS("/upload", nil)
		aR.GET("/oss_token", cont.OssToken)
		aR.POST("/upload", cont.Upload)
	}
}*/
