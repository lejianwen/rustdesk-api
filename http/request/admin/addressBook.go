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
	ForceAlwaysRelay bool     `json:"forceAlwaysRelay"`
	RdpPort          string   `json:"rdp_port"`
	RdpUsername      string   `json:"rdp_username"`
	Online           bool     `json:"online"`
	LoginName        string   `json:"login_name" `
	SameServer       bool     `json:"same_server"`
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

type AddressBookQuery struct {
	UserId int `form:"user_id"`
	IsMy   int `form:"is_my"`
	PageQuery
}
