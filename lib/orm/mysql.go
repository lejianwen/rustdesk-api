package orm

import (
	"fmt"
	"github.com/lejianwen/rustdesk-api/v2/global"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"time"
)

type MysqlConfig struct {
	Dns          string
	MaxIdleConns int
	MaxOpenConns int
}

func NewMysql(mysqlConf *MysqlConfig) *gorm.DB {
	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN:               mysqlConf.Dns, // DSN data source name
		DefaultStringSize: 256,           // string 类型字段的默认长度
		//DisableDatetimePrecision:  true,                    // 禁用 datetime 精度，MySQL 5.6 之前的数据库不支持
		//DontSupportRenameIndex:    true,                    // 重命名索引时采用删除并新建的方式，MySQL 5.7 之前的数据库和 MariaDB 不支持重命名索引
		//DontSupportRenameColumn:   true,                    // 用 `change` 重命名列，MySQL 8 之前的数据库和 MariaDB 不支持重命名列
		//SkipInitializeWithVersion: false,                   // 根据当前 MySQL 版本自动配置
	}), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
		Logger: logger.New(
			global.Logger, // io writer
			logger.Config{
				SlowThreshold:             time.Second, // Slow SQL threshold
				LogLevel:                  logger.Warn, // Log level
				IgnoreRecordNotFoundError: true,        // Ignore ErrRecordNotFound error for logger
				ParameterizedQueries:      true,        // Don't include params in the SQL log
				Colorful:                  true,
			},
		),
	})
	if err != nil {
		fmt.Println(err)
	}
	sqlDB, err2 := db.DB()
	if err2 != nil {
		fmt.Println(err2)
	}
	// SetMaxIdleConns 设置空闲连接池中连接的最大数量
	sqlDB.SetMaxIdleConns(mysqlConf.MaxIdleConns)

	// SetMaxOpenConns 设置打开数据库连接的最大数量。
	sqlDB.SetMaxOpenConns(mysqlConf.MaxOpenConns)

	return db
}
