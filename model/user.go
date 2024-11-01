package model

import (
	"fmt"
	"gorm.io/gorm"
)

type User struct {
	IdModel
	Username string     `json:"username" gorm:"default:'';not null;uniqueIndex"`
	Email	string     	`json:"email" gorm:"default:'';not null;uniqueIndex"`
	// Email	string     	`json:"email" `
	Password string     `json:"-" gorm:"default:'';not null;"`
	Nickname string     `json:"nickname" gorm:"default:'';not null;"`
	Avatar   string     `json:"avatar" gorm:"default:'';not null;"`
	GroupId  uint       `json:"group_id" gorm:"default:0;not null;index"`
	IsAdmin  *bool      `json:"is_admin" gorm:"default:0;not null;"`
	Status   StatusCode `json:"status" gorm:"default:1;not null;"`
	TimeModel
}

// BeforeSave 钩子用于确保 email 字段有合理的默认值
func (u *User) BeforeSave(tx *gorm.DB) (err error) {
    // 如果 email 为空，设置为默认值
    if u.Email == "" {
        u.Email = fmt.Sprintf("%s@example.com", u.Username)
    }
    return nil
}

type UserList struct {
	Users []*User `json:"list,omitempty"`
	Pagination
}
