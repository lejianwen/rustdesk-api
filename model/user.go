package model

type User struct {
	IdModel
	Username string     `json:"username" gorm:"default:'';not null;uniqueIndex"`
	Password string     `json:"-" gorm:"default:'';not null;"`
	Nickname string     `json:"nickname" gorm:"default:'';not null;"`
	Avatar   string     `json:"avatar" gorm:"default:'';not null;"`
	GroupId  uint       `json:"group_id" gorm:"default:0;not null;index"`
	IsAdmin  *bool      `json:"is_admin" gorm:"default:0;not null;"`
	Status   StatusCode `json:"status" gorm:"default:1;not null;"`
	TimeModel
}

type UserList struct {
	Users []*User `json:"list,omitempty"`
	Pagination
}
