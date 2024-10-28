package model

type Tag struct {
	IdModel
	Name         string                 `json:"name" gorm:"default:'';not null;"`
	UserId       uint                   `json:"user_id" gorm:"default:0;not null;index"`
	Color        uint                   `json:"color" gorm:"default:0;not null;"` //color 是flutter的颜色值,从0x00000000 到 0xFFFFFFFF; 前两位表示透明度，后面6位表示颜色, 可以转成rgba
	CollectionId uint                   `json:"collection_id" gorm:"default:0;not null;index"`
	Collection   *AddressBookCollection `json:"collection,omitempty"`
	TimeModel
}

type TagList struct {
	Tags []*Tag `json:"list"`
	Pagination
}
