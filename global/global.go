package global

import (
	"Gwen/config"
	"Gwen/lib/cache"
	"Gwen/lib/jwt"
	"Gwen/lib/lock"
	"Gwen/lib/upload"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

var (
	DB        *gorm.DB
	Logger    *logrus.Logger
	Config    config.Config
	Viper     *viper.Viper
	Redis     *redis.Client
	Cache     cache.Handler
	Validator struct {
		Validate    *validator.Validate
		VTrans      ut.Translator
		ValidStruct func(interface{}) []string
		ValidVar    func(field interface{}, tag string) []string
	}
	Oss  *upload.Oss
	Jwt  *jwt.Jwt
	Lock lock.Locker
)
