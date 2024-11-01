package config

import (
	"os"
)

type Rustdesk struct {
	IdServer    string `mapstructure:"id-server"`
	RelayServer string `mapstructure:"relay-server"`
	ApiServer   string `mapstructure:"api-server"`
	Key         string `mapstructure:"key"`
	KeyFile     string `mapstructure:"key-file"`
	Personal    int    `mapstructure:"personal"`
}

func LoadKeyFile(rustdesk *Rustdesk) {
	// Load key file
	if rustdesk.Key != "" {
		return
	}
	if rustdesk.KeyFile != "" {
		// Load key from file
		b, err := os.ReadFile(rustdesk.KeyFile)
		if err != nil {
			return
		}
		rustdesk.Key = string(b)
		return
	}
}
