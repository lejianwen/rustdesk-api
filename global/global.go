package global

import (
	"Gwen/config"
	"Gwen/lib/cache"
	"Gwen/lib/jwt"
	"Gwen/lib/lock"
	"Gwen/lib/upload"
	"github.com/gin-gonic/gin"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	"github.com/go-redis/redis/v8"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

var (
	DB         *gorm.DB
	Logger     *logrus.Logger
	ConfigPath string = ""
	Config     config.Config
	Viper      *viper.Viper
	Redis      *redis.Client
	Cache      cache.Handler
	Validator  struct {
		Validate    *validator.Validate
		UT          *ut.UniversalTranslator
		VTrans      ut.Translator
		ValidStruct func(*gin.Context, interface{}) []string
		ValidVar    func(ctx *gin.Context, field interface{}, tag string) []string
	}
	Oss       *upload.Oss
	Jwt       *jwt.Jwt
	Lock      lock.Locker
	Localizer func(lang string) *i18n.Localizer
)
