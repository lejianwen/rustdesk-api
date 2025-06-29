package admin

import (
	"github.com/lejianwen/rustdesk-api/v2/model"
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
	Id           uint   `json:"id"`
	Op           string `json:"op" validate:"omitempty"`
	OauthType    string `json:"oauth_type" validate:"required"`
	Issuer       string `json:"issuer" validate:"omitempty,url"`
	Scopes       string `json:"scopes" validate:"omitempty"`
	ClientId     string `json:"client_id" validate:"required"`
	ClientSecret string `json:"client_secret" validate:"required"`
	AutoRegister *bool  `json:"auto_register"`
	PkceEnable   *bool  `json:"pkce_enable"`
	PkceMethod   string `json:"pkce_method"`
}

func (of *OauthForm) ToOauth() *model.Oauth {
	oa := &model.Oauth{
		Op:           of.Op,
		OauthType:    of.OauthType,
		ClientId:     of.ClientId,
		ClientSecret: of.ClientSecret,
		AutoRegister: of.AutoRegister,
		Issuer:       of.Issuer,
		Scopes:       of.Scopes,
		PkceEnable:   of.PkceEnable,
		PkceMethod:   of.PkceMethod,
	}
	oa.Id = of.Id
	return oa
}
