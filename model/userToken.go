package model

type UserToken struct {
	IdModel
	UserId    	uint   `json:"user_id" gorm:"default:0;not null;index"`
	DeviceUuid 	string `json:"device_uuid" gorm:"default:'';omitempty;"`
	DeviceId	string `json:"device_id" gorm:"default:'';omitempty;"`
	Token     	string `json:"token" gorm:"default:'';not null;index"`
	ExpiredAt 	int64  `json:"expired_at" gorm:"default:0;not null;"`
	TimeModel
}

type UserTokenList struct {
	UserTokens []UserToken `json:"list"`
	Pagination
}
