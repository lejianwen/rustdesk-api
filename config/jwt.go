package config

import "time"

type Jwt struct {
	Key            string        `mapstructure:"key"`
	ExpireDuration time.Duration `mapstructure:"expire-duration"`
}
