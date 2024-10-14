package config

import (
	"flag"
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
	"strings"
)

const (
	DebugMode     = "debug"
	ReleaseMode   = "release"
	DefaultConfig = "conf/config.yaml"
)

type App struct {
	WebClient int `mapstructure:"web-client"`
}

type Config struct {
	Lang     string `mapstructure:"lang"`
	App      App
	Gorm     Gorm
	Mysql    Mysql
	Gin      Gin
	Logger   Logger
	Redis    Redis
	Cache    Cache
	Oss      Oss
	Jwt      Jwt
	Rustdesk Rustdesk
}

// Init 初始化配置
func Init(rowVal interface{}) *viper.Viper {
	var config string
	flag.StringVar(&config, "c", "", "choose config file.")
	flag.Parse()
	if config == "" { // 优先级: 命令行 > 默认值
		config = DefaultConfig
	}
	v := viper.New()
	v.AutomaticEnv()
	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))
	v.SetEnvPrefix("RUSTDESK_API")
	v.SetConfigFile(config)
	v.SetConfigType("yaml")
	err := v.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
	v.WatchConfig()
	v.OnConfigChange(func(e fsnotify.Event) {
		//配置文件修改监听
		fmt.Println("config file changed:", e.Name)
		if err2 := v.Unmarshal(rowVal); err2 != nil {
			fmt.Println(err2)
		}
	})
	if err := v.Unmarshal(rowVal); err != nil {
		fmt.Println(err)
	}
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
