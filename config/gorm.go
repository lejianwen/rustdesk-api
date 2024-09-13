package config

const (
	TypeSqlite = "sqlite"
	TypeMysql  = "mysql"
)

type Gorm struct {
	Type         string `mapstructure:"type"`
	MaxIdleConns int    `mapstructure:"max-idle-conns"`
	MaxOpenConns int    `mapstructure:"max-open-conns"`
}

type Mysql struct {
	Addr     string `mapstructure:"addr"`
	Username string `mapstructure:"username"`
	Password string `mapstructure:"password"`
	Dbname   string `mapstructure:"dbname"`
}
