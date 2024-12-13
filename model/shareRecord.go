package model

type ShareRecord struct {
	IdModel
	UserId       uint   `json:"user_id" gorm:"default:0;not null;index"`
	PeerId       string `json:"peer_id" gorm:"default:'';not null;index"`
	ShareToken   string `json:"share_token" gorm:"default:'';not null;index"`
	PasswordType string `json:"password_type" gorm:"default:'';not null;"`
	Password     string `json:"password" gorm:"default:'';not null;"`
	Expire       int64  `json:"expire" gorm:"default:0;not null;"`
	TimeModel
}

// ShareRecordList 分享记录列表
type ShareRecordList struct {
	ShareRecords []*ShareRecord `json:"list,omitempty"`
	Pagination
}
