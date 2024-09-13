package config

type Gin struct {
	ApiAddr       string `mapstructure:"api-addr"`
	AdminAddr     string `mapstructure:"admin-addr"`
	Mode          string
	ResourcesPath string `mapstructure:"resources-path"`
}
