package admin

import (
	"Gwen/model"
	"strings"
)

type BindOauthForm struct {
	Op string `json:"op" binding:"required"`
}

type OauthConfirmForm struct {
	Code string `json:"code" binding:"required"`
}
type UnBindOauthForm struct {
	Op string `json:"op" binding:"required"`
}
type OauthForm struct {
	Id           uint   			`json:"id"`
	Op           string 			`json:"op" validate:"omitempty"`
	OauthType    string 			`json:"oauth_type" validate:"required"`
	Issuer	     string 			`json:"issuer" validate:"omitempty,url"`
	Scopes	   	 string 			`json:"scopes" validate:"omitempty"`
	ClientId     string 			`json:"client_id" validate:"required"`
	ClientSecret string 			`json:"client_secret" validate:"required"`
	RedirectUrl  string 			`json:"redirect_url" validate:"required"`
	AutoRegister *bool  			`json:"auto_register"`
}

func (of *OauthForm) ToOauth() *model.Oauth {
	op := strings.ToLower(of.Op)
	op = strings.TrimSpace(op)
	if op == "" {
		switch of.OauthType {
		case model.OauthTypeGithub:
			of.Op = model.OauthNameGithub
		case model.OauthTypeGoogle:
			of.Op = model.OauthNameGoogle
		case model.OauthTypeOidc:
			of.Op = model.OauthNameOidc
		case model.OauthTypeWebauth:
			of.Op = model.OauthNameWebauth
		default:
			of.Op = of.OauthType
		}
	}
	oa := &model.Oauth{
		Op:           of.Op,
		OauthType:	  of.OauthType,
		ClientId:     of.ClientId,
		ClientSecret: of.ClientSecret,
		RedirectUrl:  of.RedirectUrl,
		AutoRegister: of.AutoRegister,
		Issuer:       of.Issuer,
		Scopes:       of.Scopes,
	}
	oa.Id = of.Id
	return oa
}
