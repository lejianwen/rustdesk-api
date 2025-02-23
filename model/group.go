package model

const (
	GroupTypeDefault = 1 // 默认
	GroupTypeShare   = 2 // 共享
)

type Group struct {
	IdModel
	Name string `json:"name" gorm:"default:'';not null;"`
	Type int    `json:"type" gorm:"default:1;not null;"`
	TimeModel
}

type GroupList struct {
	Groups []*Group `json:"list"`
	Pagination
}

type DeviceGroup struct {
	IdModel
	Name string `json:"name" gorm:"default:'';not null;"`
	TimeModel
}

type DeviceGroupList struct {
	DeviceGroups []*DeviceGroup `json:"list"`
	Pagination
}
