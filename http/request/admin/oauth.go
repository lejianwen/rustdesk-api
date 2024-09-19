package admin

import "Gwen/model"

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
	Op           string `json:"op" validate:"required"`
	ClientId     string `json:"client_id" validate:"required"`
	ClientSecret string `json:"client_secret" validate:"required"`
	RedirectUrl  string `json:"redirect_url" validate:"required"`
	AutoRegister *bool  `json:"auto_register"`
}

func (of *OauthForm) ToOauth() *model.Oauth {
	oa := &model.Oauth{
		Op:           of.Op,
		ClientId:     of.ClientId,
		ClientSecret: of.ClientSecret,
		RedirectUrl:  of.RedirectUrl,
		AutoRegister: of.AutoRegister,
	}
	oa.Id = of.Id
	return oa
}
