package admin

import (
	"Gwen/model"
	"encoding/json"
)

type AddressBookForm struct {
	RowId            uint     `json:"row_id"`
	Id               string   `json:"id" validate:"required"`
	Username         string   `json:"username" `
	Password         string   `json:"password" `
	Hostname         string   `json:"hostname" `
	Alias            string   `json:"alias" `
	Platform         string   `json:"platform" `
	Tags             []string `json:"tags"`
	Hash             string   `json:"hash"`
	UserId           uint     `json:"user_id"`
	UserIds          []uint   `json:"user_ids"`
	ForceAlwaysRelay bool     `json:"forceAlwaysRelay"`
	RdpPort          string   `json:"rdpPort"`
	RdpUsername      string   `json:"rdpUsername"`
	Online           bool     `json:"online"`
	LoginName        string   `json:"loginName" `
	SameServer       bool     `json:"sameServer"`
}

func (a AddressBookForm) ToAddressBook() *model.AddressBook {
	//tags转换
	tags, _ := json.Marshal(a.Tags)

	return &model.AddressBook{
		RowId:            a.RowId,
		Id:               a.Id,
		Username:         a.Username,
		Password:         a.Password,
		Hostname:         a.Hostname,
		Alias:            a.Alias,
		Platform:         a.Platform,
		Tags:             tags,
		Hash:             a.Hash,
		UserId:           a.UserId,
		ForceAlwaysRelay: a.ForceAlwaysRelay,
		RdpPort:          a.RdpPort,
		RdpUsername:      a.RdpUsername,
		Online:           a.Online,
		LoginName:        a.LoginName,
		SameServer:       a.SameServer,
	}

}
func (a AddressBookForm) ToAddressBooks() []*model.AddressBook {
	//tags转换
	tags, _ := json.Marshal(a.Tags)

	abs := make([]*model.AddressBook, 0, len(a.UserIds))
	for _, userId := range a.UserIds {
		abs = append(abs, &model.AddressBook{
			RowId:            a.RowId,
			Id:               a.Id,
			Username:         a.Username,
			Password:         a.Password,
			Hostname:         a.Hostname,
			Alias:            a.Alias,
			Platform:         a.Platform,
			Tags:             tags,
			Hash:             a.Hash,
			UserId:           userId,
			ForceAlwaysRelay: a.ForceAlwaysRelay,
			RdpPort:          a.RdpPort,
			RdpUsername:      a.RdpUsername,
			Online:           a.Online,
			LoginName:        a.LoginName,
			SameServer:       a.SameServer,
		})
	}
	return abs
}

type AddressBookQuery struct {
	UserId   int    `form:"user_id"`
	IsMy     int    `form:"is_my"`
	Username string `form:"username"`
	Hostname string `form:"hostname"`
	Id       string `form:"id"`
	PageQuery
}

type ShareByWebClientForm struct {
	Id           string `json:"id" validate:"required"`
	PasswordType string `json:"password_type" validate:"required,oneof=once fixed"` //只能是once,fixed
	Password     string `json:"password" validate:"required"`
	Expire       int64  `json:"expire"`
}

func (sbwcf ShareByWebClientForm) ToShareRecord() *model.ShareRecord {
	return &model.ShareRecord{
		UserId:       0,
		PeerId:       sbwcf.Id,
		PasswordType: sbwcf.PasswordType,
		Password:     sbwcf.Password,
		Expire:       sbwcf.Expire,
	}
}
