package orm

import (
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type SqliteConfig struct {
	MaxIdleConns int
	MaxOpenConns int
}

func NewSqlite(sqliteConf *SqliteConfig) *gorm.DB {
	db, err := gorm.Open(sqlite.Open("./data/rustdeskapi.db"), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
	}
	sqlDB, err2 := db.DB()
	if err2 != nil {
		fmt.Println(err2)
	}
	// SetMaxIdleConns 设置空闲连接池中连接的最大数量
	sqlDB.SetMaxIdleConns(sqliteConf.MaxIdleConns)

	// SetMaxOpenConns 设置打开数据库连接的最大数量。
	sqlDB.SetMaxOpenConns(sqliteConf.MaxOpenConns)

	return db
}
