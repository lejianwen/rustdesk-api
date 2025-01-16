package config

import (
	"os"
	"strconv"
	"strings"
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
	WebclientMagicQueryonline int `mapstructure:"webclient-magic-queryonline"`
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
func (rd *Rustdesk) ParsePort() {
	// Parse port
	idres := strings.Split(rd.IdServer, ":")
	if len(idres) == 1 {
		rd.IdServerPort = DefaultIdServerPort
	} else if len(idres) == 2 {
		rd.IdServerPort, _ = strconv.Atoi(idres[1])
	}

	relayres := strings.Split(rd.RelayServer, ":")
	if len(relayres) == 1 {
		rd.RelayServerPort = DefaultRelayServerPort
	} else if len(relayres) == 2 {
		rd.RelayServerPort, _ = strconv.Atoi(relayres[1])
	}
}
