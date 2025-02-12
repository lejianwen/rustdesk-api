package model

import "github.com/lejianwen/rustdesk-api/model/custom_types"

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
	RowId            uint                   `gorm:"primaryKey" json:"row_id"`
	Id               string                 `json:"id" gorm:"default:0;not null;index"`
	Username         string                 `json:"username" gorm:"default:'';not null;"`
	Password         string                 `json:"password" gorm:"default:'';not null;"`
	Hostname         string                 `json:"hostname" gorm:"default:'';not null;"`
	Alias            string                 `json:"alias" gorm:"default:'';not null;"`
	Platform         string                 `json:"platform" gorm:"default:'';not null;"`
	Tags             custom_types.AutoJson  `json:"tags" gorm:"not null;" swaggertype:"array,string"`
	Hash             string                 `json:"hash" gorm:"default:'';not null;"`
	UserId           uint                   `json:"user_id" gorm:"default:0;not null;index"`
	ForceAlwaysRelay bool                   `json:"forceAlwaysRelay" gorm:"default:0;not null;"`
	RdpPort          string                 `json:"rdpPort" gorm:"default:'';not null;"`
	RdpUsername      string                 `json:"rdpUsername" gorm:"default:'';not null;"`
	Online           bool                   `json:"online" gorm:"default:0;not null;"`
	LoginName        string                 `json:"loginName" gorm:"default:'';not null;"`
	SameServer       bool                   `json:"sameServer" gorm:"default:0;not null;"`
	CollectionId     uint                   `json:"collection_id" gorm:"default:0;not null;index"`
	Collection       *AddressBookCollection `json:"collection,omitempty"`
	TimeModel
}

type AddressBookList struct {
	AddressBooks []*AddressBook `json:"list"`
	Pagination
}

type AddressBookCollection struct {
	IdModel
	UserId uint   `json:"user_id" gorm:"default:0;not null;index"`
	Name   string `json:"name" gorm:"default:'';not null;" validate:"required"`
	TimeModel
}
type AddressBookCollectionList struct {
	AddressBookCollection []*AddressBookCollection `json:"list"`
	Pagination
}
type AddressBookCollectionRule struct {
	IdModel
	UserId       uint `json:"user_id" gorm:"default:0;not null;"`
	CollectionId uint `json:"collection_id" gorm:"default:0;not null;index" validate:"required"`
	Rule         int  `json:"rule" gorm:"default:0;not null;" validate:"required,gte=1,lte=3"` // 0: 无 1: 读 2: 读写  3: 完全控制
	Type         int  `json:"type" gorm:"default:1;not null;" validate:"required,gte=1,lte=2"` // 1: 个人 2: 群组
	ToId         uint `json:"to_id" gorm:"default:0;not null;" validate:"required,gt=0"`
	TimeModel
}
type AddressBookCollectionRuleList struct {
	AddressBookCollectionRule []*AddressBookCollectionRule `json:"list"`
	Pagination
}

const (
	ShareAddressBookRuleTypePersonal = 1
	ShareAddressBookRuleTypeGroup    = 2
)
const (
	ShareAddressBookRuleRuleRead        = 1
	ShareAddressBookRuleRuleReadWrite   = 2
	ShareAddressBookRuleRuleFullControl = 3
)
