package config

type Rustdesk struct {
	IdServer    string `mapstructure:"id-server"`
	RelayServer string `mapstructure:"relay-server"`
	ApiServer   string `mapstructure:"api-server"`
	Key         string `mapstructure:"key"`
}
