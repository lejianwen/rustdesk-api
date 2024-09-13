package config

type Oss struct {
	AccessKeyId     string `mapstructure:"access-key-id"`
	AccessKeySecret string `mapstructure:"access-key-secret"`
	Host            string `mapstructure:"host"`
	CallbackUrl     string `mapstructure:"callback-url"`
	ExpireTime      int64  `mapstructure:"expire-time"`
	MaxByte         int64  `mapstructure:"max-byte"`
}
