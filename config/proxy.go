package config

type Proxy struct {
	Enable bool   `mapstructure:"enable"`
	Host   string `mapstructure:"host"`
}
