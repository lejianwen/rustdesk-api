package model

import "Gwen/model/custom_types"

// final String id;
// String hash; // personal ab hash password
// String password; // shared ab password
// String username; // pc username
// String hostname;
// String platform;
// String alias;
// List<dynamic> tags;
// bool forceAlwaysRelay = false;
// String rdpPort;
// String rdpUsername;
// bool online = false;
// String loginName; //login username
// bool? sameServer;

// AddressBook 有些字段是Personal才会上传的
type AddressBook struct {
	RowId            uint                  `gorm:"primaryKey" json:"row_id"`
	Id               string                `json:"id" gorm:"default:0;not null;index"`
	Username         string                `json:"username" gorm:"default:'';not null;"`
	Password         string                `json:"password" gorm:"default:'';not null;"`
	Hostname         string                `json:"hostname" gorm:"default:'';not null;"`
	Alias            string                `json:"alias" gorm:"default:'';not null;"`
	Platform         string                `json:"platform" gorm:"default:'';not null;"`
	Tags             custom_types.AutoJson `json:"tags" gorm:"not null;" swaggertype:"array,string"`
	Hash             string                `json:"hash" gorm:"default:'';not null;"`
	UserId           uint                  `json:"user_id" gorm:"default:0;not null;index"`
	ForceAlwaysRelay bool                  `json:"forceAlwaysRelay" gorm:"default:0;not null;"`
	RdpPort          string                `json:"rdpPort" gorm:"default:'';not null;"`
	RdpUsername      string                `json:"rdpUsername" gorm:"default:'';not null;"`
	Online           bool                  `json:"online" gorm:"default:0;not null;"`
	LoginName        string                `json:"loginName" gorm:"default:'';not null;"`
	SameServer       bool                  `json:"sameServer" gorm:"default:0;not null;"`
	TimeModel
}

type AddressBookList struct {
	AddressBooks []*AddressBook `json:"list"`
	Pagination
}
