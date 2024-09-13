package config

type Cache struct {
	Type      string
	RedisAddr string `mapstructure:"redis-addr"`
	RedisPwd  string `mapstructure:"redis-pwd"`
	RedisDb   int    `mapstructure:"redis-db"`
	FileDir   string `mapstructure:"file-dir"`
}
