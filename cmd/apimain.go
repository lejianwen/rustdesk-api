package main

import (
	"Gwen/config"
	"Gwen/global"
	"Gwen/http"
	"Gwen/lib/cache"
	"Gwen/lib/jwt"
	"Gwen/lib/lock"
	"Gwen/lib/logger"
	"Gwen/lib/orm"
	"Gwen/lib/upload"
	"Gwen/model"
	"Gwen/service"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"github.com/spf13/cobra"
	"os"
	"strconv"
	"time"
)

// @title 管理系统API
// @version 1.0
// @description 接口
// @basePath /api
// @securityDefinitions.apikey token
// @in header
// @name api-token
// @securitydefinitions.apikey BearerAuth
// @in header
// @name Authorization

var rootCmd = &cobra.Command{
	Use:   "apimain",
	Short: "RUSTDESK API SERVER",
	PersistentPreRun: func(cmd *cobra.Command, args []string) {
		InitGlobal()
	},
	Run: func(cmd *cobra.Command, args []string) {
		//gin
		http.ApiInit()
	},
}

var resetPwdCmd = &cobra.Command{
	Use:     "reset-admin-pwd [pwd]",
	Example: "reset-admin-pwd 123456",
	Short:   "Reset Admin Password",
	Args:    cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		pwd := args[0]
		admin := service.AllService.UserService.InfoById(1)
		err := service.AllService.UserService.UpdatePassword(admin, pwd)
		if err != nil {
			fmt.Printf("reset password fail! %v \n", err)
			return
		}
		fmt.Printf("reset password success! \n")
	},
}
var resetUserPwdCmd = &cobra.Command{
	Use:     "reset-pwd [userId] [pwd]",
	Example: "reset-pwd 2 123456",
	Short:   "Reset User Password",
	Args:    cobra.ExactArgs(2),
	Run: func(cmd *cobra.Command, args []string) {
		userId := args[0]
		pwd := args[1]
		uid, err := strconv.Atoi(userId)
		if err != nil {
			fmt.Printf("userId must be int! \n")
			return
		}
		if uid <= 0 {
			fmt.Printf("userId must be greater than 0! \n")
			return
		}
		u := service.AllService.UserService.InfoById(uint(uid))
		err = service.AllService.UserService.UpdatePassword(u, pwd)
		if err != nil {
			fmt.Printf("reset password fail! %v \n", err)
			return
		}
		fmt.Printf("reset password success! \n")
	},
}

func init() {
	rootCmd.PersistentFlags().StringVarP(&global.ConfigPath, "config", "c", "./conf/config.yaml", "choose config file")
	rootCmd.AddCommand(resetPwdCmd, resetUserPwdCmd)
}
func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func InitGlobal() {
	//配置解析
	global.Viper = config.Init(&global.Config, global.ConfigPath)

	//日志
	global.Logger = logger.New(&logger.Config{
		Path:         global.Config.Logger.Path,
		Level:        global.Config.Logger.Level,
		ReportCaller: global.Config.Logger.ReportCaller,
	})

	global.InitI18n()

	//redis
	global.Redis = redis.NewClient(&redis.Options{
		Addr:     global.Config.Redis.Addr,
		Password: global.Config.Redis.Password,
		DB:       global.Config.Redis.Db,
	})

	//cache
	if global.Config.Cache.Type == cache.TypeFile {
		fc := cache.NewFileCache()
		fc.SetDir(global.Config.Cache.FileDir)
		global.Cache = fc
	} else if global.Config.Cache.Type == cache.TypeRedis {
		global.Cache = cache.NewRedis(&redis.Options{
			Addr:     global.Config.Cache.RedisAddr,
			Password: global.Config.Cache.RedisPwd,
			DB:       global.Config.Cache.RedisDb,
		})
	}
	//gorm
	if global.Config.Gorm.Type == config.TypeMysql {
		dns := global.Config.Mysql.Username + ":" + global.Config.Mysql.Password + "@(" + global.Config.Mysql.Addr + ")/" + global.Config.Mysql.Dbname + "?charset=utf8mb4&parseTime=True&loc=Local"
		global.DB = orm.NewMysql(&orm.MysqlConfig{
			Dns:          dns,
			MaxIdleConns: global.Config.Gorm.MaxIdleConns,
			MaxOpenConns: global.Config.Gorm.MaxOpenConns,
		})
	} else {
		//sqlite
		global.DB = orm.NewSqlite(&orm.SqliteConfig{
			MaxIdleConns: global.Config.Gorm.MaxIdleConns,
			MaxOpenConns: global.Config.Gorm.MaxOpenConns,
		})
	}
	DatabaseAutoUpdate()

	//validator
	global.ApiInitValidator()

	//oss
	global.Oss = &upload.Oss{
		AccessKeyId:     global.Config.Oss.AccessKeyId,
		AccessKeySecret: global.Config.Oss.AccessKeySecret,
		Host:            global.Config.Oss.Host,
		CallbackUrl:     global.Config.Oss.CallbackUrl,
		ExpireTime:      global.Config.Oss.ExpireTime,
		MaxByte:         global.Config.Oss.MaxByte,
	}

	//jwt
	//fmt.Println(global.Config.Jwt.PrivateKey)
	global.Jwt = jwt.NewJwt(global.Config.Jwt.Key, global.Config.Jwt.ExpireDuration*time.Second)

	//locker
	global.Lock = lock.NewLocal()
}
func DatabaseAutoUpdate() {
	version := 260

	db := global.DB

	if global.Config.Gorm.Type == config.TypeMysql {
		//检查存不存在数据库，不存在则创建
		dbName := db.Migrator().CurrentDatabase()
		fmt.Println("dbName", dbName)
		if dbName == "" {
			dbName = global.Config.Mysql.Dbname
			// 移除 DSN 中的数据库名称，以便初始连接时不指定数据库
			dsnWithoutDB := global.Config.Mysql.Username + ":" + global.Config.Mysql.Password + "@(" + global.Config.Mysql.Addr + ")/?charset=utf8mb4&parseTime=True&loc=Local"
			//新链接
			dbWithoutDB := orm.NewMysql(&orm.MysqlConfig{
				Dns: dsnWithoutDB,
			})
			// 获取底层的 *sql.DB 对象，并确保在程序退出时关闭连接
			sqlDBWithoutDB, err := dbWithoutDB.DB()
			if err != nil {
				fmt.Printf("获取底层 *sql.DB 对象失败: %v\n", err)
				return
			}
			defer func() {
				if err := sqlDBWithoutDB.Close(); err != nil {
					fmt.Printf("关闭连接失败: %v\n", err)
				}
			}()

			err = dbWithoutDB.Exec("CREATE DATABASE IF NOT EXISTS " + dbName + " DEFAULT CHARSET utf8mb4").Error
			if err != nil {
				fmt.Println(err)
				return
			}
		}
	}

	if !db.Migrator().HasTable(&model.Version{}) {
		Migrate(uint(version))
	} else {
		//查找最后一个version
		var v model.Version
		db.Last(&v)
		if v.Version < uint(version) {
			Migrate(uint(version))
		}
		// 245迁移
		if v.Version < 245 {
			//oauths 表的 oauth_type 字段设置为 op同样的值
			db.Exec("update oauths set oauth_type = op")
			db.Exec("update oauths set issuer = 'https://accounts.google.com' where op = 'google'")
			db.Exec("update user_thirds set oauth_type = third_type, op = third_type")
			//通过email迁移旧的google授权
			uts := make([]model.UserThird, 0)
			db.Where("oauth_type = ?", "google").Find(&uts)
			for _, ut := range uts {
				if ut.UserId > 0 {
					db.Model(&model.User{}).Where("id = ?", ut.UserId).Update("email", ut.OpenId)
				}
			}
		}
		if v.Version < 246 {
			db.Exec("update oauths set issuer = 'https://accounts.google.com' where op = 'google' and issuer is null")
		}
	}

}
func Migrate(version uint) {
	fmt.Println("migrating....", version)
	err := global.DB.AutoMigrate(
		&model.Version{},
		&model.User{},
		&model.UserToken{},
		&model.Tag{},
		&model.AddressBook{},
		&model.Peer{},
		&model.Group{},
		&model.UserThird{},
		&model.Oauth{},
		&model.LoginLog{},
		&model.ShareRecord{},
		&model.AuditConn{},
		&model.AuditFile{},
		&model.AddressBookCollection{},
		&model.AddressBookCollectionRule{},
		&model.ServerCmd{},
	)
	if err != nil {
		fmt.Println("migrate err :=>", err)
	}
	global.DB.Create(&model.Version{Version: version})
	//如果是初次则创建一个默认用户
	var vc int64
	global.DB.Model(&model.Version{}).Count(&vc)
	if vc == 1 {
		localizer := global.Localizer("")
		defaultGroup, _ := localizer.LocalizeMessage(&i18n.Message{
			ID: "DefaultGroup",
		})
		group := &model.Group{
			Name: defaultGroup,
			Type: model.GroupTypeDefault,
		}
		service.AllService.GroupService.Create(group)

		shareGroup, _ := localizer.LocalizeMessage(&i18n.Message{
			ID: "ShareGroup",
		})
		groupShare := &model.Group{
			Name: shareGroup,
			Type: model.GroupTypeShare,
		}
		service.AllService.GroupService.Create(groupShare)
		//是true
		is_admin := true
		admin := &model.User{
			Username: "admin",
			Nickname: "Admin",
			Status:   model.COMMON_STATUS_ENABLE,
			IsAdmin:  &is_admin,
			GroupId:  1,
		}
		admin.Password = service.AllService.UserService.EncryptPassword("admin")
		global.DB.Create(admin)
	}

}
