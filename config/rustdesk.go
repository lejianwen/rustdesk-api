package config

import (
	"os"
)

const (
	DefaultIdServerPort    = 21116
	DefaultRelayServerPort = 21117
)

type Rustdesk struct {
	IdServer        string `mapstructure:"id-server"`
	IdServerPort    int    `mapstructure:"-"`
	RelayServer     string `mapstructure:"relay-server"`
	RelayServerPort int    `mapstructure:"-"`
	ApiServer       string `mapstructure:"api-server"`
	Key             string `mapstructure:"key"`
	KeyFile         string `mapstructure:"key-file"`
	Personal        int    `mapstructure:"personal"`
	//webclient-magic-queryonline
	WebclientMagicQueryonline int    `mapstructure:"webclient-magic-queryonline"`
	WsHost                    string `mapstructure:"ws-host"`
}

func (rd *Rustdesk) LoadKeyFile() {
	// Load key file
	if rd.Key != "" {
		return
	}
	if rd.KeyFile != "" {
		// Load key from file
		b, err := os.ReadFile(rd.KeyFile)
		if err != nil {
			return
		}
		rd.Key = string(b)
		return
	}
}
