package router

import (
	_ "Gwen/docs/admin"
	"Gwen/global"
	"Gwen/http/controller/admin"
	"Gwen/http/controller/admin/my"
	"Gwen/http/middleware"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func Init(g *gin.Engine) {

	//swagger
	//g.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	if global.Config.App.ShowSwagger == 1 {
		g.GET("/admin/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, ginSwagger.InstanceName("admin")))
	}

	adg := g.Group("/api/admin")
	LoginBind(adg)
	adg.POST("/user/register", (&admin.User{}).Register)
	adg.Use(middleware.AdminAuth())
	//FileBind(adg)
	UserBind(adg)
	GroupBind(adg)
	TagBind(adg)
	AddressBookBind(adg)
	PeerBind(adg)
	OauthBind(adg)
	LoginLogBind(adg)
	AuditBind(adg)
	AddressBookCollectionBind(adg)
	AddressBookCollectionRuleBind(adg)
	UserTokenBind(adg)
	ConfigBind(adg)

	//deprecated by ConfigBind
	//rs := &admin.Rustdesk{}
	//adg.GET("/server-config", rs.ServerConfig)
	//adg.GET("/app-config", rs.AppConfig)
	//deprecated end

	ShareRecordBind(adg)
	MyBind(adg)

	//访问静态文件
	//g.StaticFS("/upload", http.Dir(global.Config.Gin.ResourcesPath+"/upload"))
}
func LoginBind(rg *gin.RouterGroup) {
	cont := &admin.Login{}
	rg.POST("/login", cont.Login)
	rg.GET("/captcha", cont.Captcha)
	rg.POST("/logout", cont.Logout)
	rg.GET("/login-options", cont.LoginOptions)
	rg.POST("/oidc/auth", cont.OidcAuth)
	rg.GET("/oidc/auth-query", cont.OidcAuthQuery)
}

func UserBind(rg *gin.RouterGroup) {
	aR := rg.Group("/user")
	{
		cont := &admin.User{}
		aR.GET("/current", cont.Current)
		aR.POST("/changeCurPwd", cont.ChangeCurPwd)
		aR.POST("/myOauth", cont.MyOauth)
		//aR.GET("/myPeer", cont.MyPeer)
		aR.POST("/groupUsers", cont.GroupUsers)
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
	aR := rg.Group("/tag").Use(middleware.AdminPrivilege())
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
		aR.POST("/shareByWebClient", cont.ShareByWebClient)

		arp := aR.Use(middleware.AdminPrivilege())
		arp.GET("/list", cont.List)
		//arp.GET("/detail/:id", cont.Detail)
		arp.POST("/create", cont.Create)
		arp.POST("/update", cont.Update)
		arp.POST("/delete", cont.Delete)
		arp.POST("/batchCreate", cont.BatchCreate)
		arp.POST("/batchCreateFromPeers", cont.BatchCreateFromPeers)

	}
}
func PeerBind(rg *gin.RouterGroup) {
	aR := rg.Group("/peer")
	aR.POST("/simpleData", (&admin.Peer{}).SimpleData)
	aR.Use(middleware.AdminPrivilege())
	{
		cont := &admin.Peer{}
		aR.GET("/list", cont.List)
		aR.GET("/detail/:id", cont.Detail)
		aR.POST("/create", cont.Create)
		aR.POST("/update", cont.Update)
		aR.POST("/delete", cont.Delete)
		aR.POST("/batchDelete", cont.BatchDelete)
	}
}

func OauthBind(rg *gin.RouterGroup) {
	aR := rg.Group("/oauth")
	{
		cont := &admin.Oauth{}
		aR.POST("/confirm", cont.Confirm)
		aR.POST("/bind", cont.ToBind)
		aR.POST("/bindConfirm", cont.BindConfirm)
		aR.POST("/unbind", cont.Unbind)
		aR.GET("/info", cont.Info)
	}
	arp := aR.Use(middleware.AdminPrivilege())
	{
		cont := &admin.Oauth{}
		arp.GET("/list", cont.List)
		arp.GET("/detail/:id", cont.Detail)
		arp.POST("/create", cont.Create)
		arp.POST("/update", cont.Update)
		arp.POST("/delete", cont.Delete)

	}

}
func LoginLogBind(rg *gin.RouterGroup) {
	aR := rg.Group("/login_log")
	cont := &admin.LoginLog{}
	aR.GET("/list", cont.List)
	aR.POST("/delete", cont.Delete)
	aR.POST("/batchDelete", cont.BatchDelete)
}
func AuditBind(rg *gin.RouterGroup) {
	cont := &admin.Audit{}
	aR := rg.Group("/audit_conn").Use(middleware.AdminPrivilege())
	aR.GET("/list", cont.ConnList)
	aR.POST("/delete", cont.ConnDelete)
	aR.POST("/batchDelete", cont.BatchConnDelete)
	afR := rg.Group("/audit_file").Use(middleware.AdminPrivilege())
	afR.GET("/list", cont.FileList)
	afR.POST("/delete", cont.FileDelete)
	afR.POST("/batchDelete", cont.BatchFileDelete)
}
func AddressBookCollectionBind(rg *gin.RouterGroup) {
	aR := rg.Group("/address_book_collection").Use(middleware.AdminPrivilege())
	{
		cont := &admin.AddressBookCollection{}
		aR.GET("/list", cont.List)
		aR.GET("/detail/:id", cont.Detail)
		aR.POST("/create", cont.Create)
		aR.POST("/update", cont.Update)
		aR.POST("/delete", cont.Delete)
	}

}
func AddressBookCollectionRuleBind(rg *gin.RouterGroup) {
	aR := rg.Group("/address_book_collection_rule").Use(middleware.AdminPrivilege())
	{
		cont := &admin.AddressBookCollectionRule{}
		aR.GET("/list", cont.List)
		aR.GET("/detail/:id", cont.Detail)
		aR.POST("/create", cont.Create)
		aR.POST("/update", cont.Update)
		aR.POST("/delete", cont.Delete)
	}
}
func UserTokenBind(rg *gin.RouterGroup) {
	aR := rg.Group("/user_token").Use(middleware.AdminPrivilege())
	cont := &admin.UserToken{}
	aR.GET("/list", cont.List)
	aR.POST("/delete", cont.Delete)
	aR.POST("/batchDelete", cont.BatchDelete)
}
func ConfigBind(rg *gin.RouterGroup) {
	aR := rg.Group("/config")
	rs := &admin.Config{}
	aR.GET("/server", rs.ServerConfig)
	aR.GET("/app", rs.AppConfig)
	aR.GET("/admin", rs.AdminConfig)
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

func MyBind(rg *gin.RouterGroup) {
	{
		cont := &my.ShareRecord{}
		rg.GET("/my/share_record/list", cont.List)
		rg.POST("/my/share_record/delete", cont.Delete)
		rg.POST("/my/share_record/batchDelete", cont.BatchDelete)
	}

	{
		cont := &my.AddressBook{}
		rg.GET("/my/address_book/list", cont.List)
		rg.POST("/my/address_book/create", cont.Create)
		rg.POST("/my/address_book/update", cont.Update)
		rg.POST("/my/address_book/delete", cont.Delete)
		rg.POST("/my/address_book/batchCreateFromPeers", cont.BatchCreateFromPeers)
		rg.POST("/my/address_book/batchUpdateTags", cont.BatchUpdateTags)
	}

	{
		cont := &my.Tag{}
		rg.GET("/my/tag/list", cont.List)
		rg.POST("/my/tag/create", cont.Create)
		rg.POST("/my/tag/update", cont.Update)
		rg.POST("/my/tag/delete", cont.Delete)
	}

	{
		cont := &my.AddressBookCollection{}
		rg.GET("/my/address_book_collection/list", cont.List)
		rg.POST("/my/address_book_collection/create", cont.Create)
		rg.POST("/my/address_book_collection/update", cont.Update)
		rg.POST("/my/address_book_collection/delete", cont.Delete)
	}

	{
		cont := &my.AddressBookCollectionRule{}
		rg.GET("/my/address_book_collection_rule/list", cont.List)
		rg.POST("/my/address_book_collection_rule/create", cont.Create)
		rg.POST("/my/address_book_collection_rule/update", cont.Update)
		rg.POST("/my/address_book_collection_rule/delete", cont.Delete)
	}
	{
		cont := &my.Peer{}
		rg.GET("/my/peer/list", cont.List)

	}
}

func ShareRecordBind(rg *gin.RouterGroup) {
	aR := rg.Group("/share_record").Use(middleware.AdminPrivilege())
	{
		cont := &admin.ShareRecord{}
		aR.GET("/list", cont.List)
		aR.POST("/delete", cont.Delete)
		aR.POST("/batchDelete", cont.BatchDelete)
	}

}
