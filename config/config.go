package config

import (
	"fmt"
	"github.com/spf13/viper"
	"strings"
	"time"
)

const (
	DebugMode     = "debug"
	ReleaseMode   = "release"
	DefaultConfig = "conf/config.yaml"
)

type App struct {
	WebClient        int           `mapstructure:"web-client"`
	Register         bool          `mapstructure:"register"`
	RegisterStatus   int           `mapstructure:"register-status"`
	ShowSwagger      int           `mapstructure:"show-swagger"`
	TokenExpire      time.Duration `mapstructure:"token-expire"`
	WebSso           bool          `mapstructure:"web-sso"`
	DisablePwdLogin  bool          `mapstructure:"disable-pwd-login"`
	CaptchaThreshold int           `mapstructure:"captcha-threshold"`
	BanThreshold     int           `mapstructure:"ban-threshold"`
}
type Admin struct {
	Title           string `mapstructure:"title"`
	Hello           string `mapstructure:"hello"`
	HelloFile       string `mapstructure:"hello-file"`
	IdServerPort    int    `mapstructure:"id-server-port"`
	RelayServerPort int    `mapstructure:"relay-server-port"`
}
type Config struct {
	Lang     string `mapstructure:"lang"`
	App      App
	Admin    Admin
	Gorm     Gorm
	Mysql    Mysql
	Gin      Gin
	Logger   Logger
	Redis    Redis
	Cache    Cache
	Oss      Oss
	Jwt      Jwt
	Rustdesk Rustdesk
	Proxy    Proxy
	Ldap     Ldap
}

func (a *Admin) Init() {
	if a.IdServerPort == 0 {
		a.IdServerPort = DefaultIdServerPort
	}
	if a.RelayServerPort == 0 {
		a.RelayServerPort = DefaultRelayServerPort
	}
}

// Init 初始化配置
func Init(rowVal *Config, path string) *viper.Viper {
	if path == "" {
		path = DefaultConfig
	}
	v := viper.GetViper()
	v.AutomaticEnv()
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))
	v.SetEnvPrefix("RUSTDESK_API")
	v.SetConfigFile(path)
	v.SetConfigType("yaml")
	err := v.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
	/*
		v.WatchConfig()


			//监听配置修改没什么必要
			v.OnConfigChange(func(e fsnotify.Event) {
				//配置文件修改监听
				fmt.Println("config file changed:", e.Name)
				if err2 := v.Unmarshal(rowVal); err2 != nil {
					fmt.Println(err2)
				}
				rowVal.Rustdesk.LoadKeyFile()
				rowVal.Rustdesk.ParsePort()
			})
	*/
	if err := v.Unmarshal(rowVal); err != nil {
		panic(fmt.Errorf("Fatal error config: %s \n", err))
	}
	rowVal.Rustdesk.LoadKeyFile()
	rowVal.Admin.Init()
	return v
}

// ReadEnv 读取环境变量
func ReadEnv(rowVal interface{}) *viper.Viper {
	v := viper.New()
	v.AutomaticEnv()
	if err := v.Unmarshal(rowVal); err != nil {
		fmt.Println(err)
	}
	return v
}
