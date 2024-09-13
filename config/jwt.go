package config

import "time"

type Jwt struct {
	PrivateKey     string        `mapstructure:"private-key"`
	ExpireDuration time.Duration `mapstructure:"expire-duration"`
}
