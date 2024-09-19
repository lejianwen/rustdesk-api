package model

type UserThird struct {
	IdModel
	UserId     uint   `json:"user_id" gorm:"not null;index"`
	OpenId     string `json:"open_id" gorm:"not null;index"`
	UnionId    string `json:"union_id" gorm:"not null;"`
	ThirdType  string `json:"third_type" gorm:"not null;"`
	ThirdEmail string `json:"third_email"`
	ThirdName  string `json:"third_name"`
	TimeModel
}
