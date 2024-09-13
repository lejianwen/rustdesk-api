package model

type Version struct {
	IdModel
	Version uint `json:"version" gorm:"default:0;not null;"`
	TimeModel
}
