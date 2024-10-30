package model

type Oauth struct {
	IdModel
	Op           string `json:"op"`
	ClientId     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	RedirectUrl  string `json:"redirect_url"`
	AutoRegister *bool  `json:"auto_register"`
	Scopes       string `json:"scopes"`
	Issuer	     string `json:"issuer"`
	TimeModel
}

const (
	OauthTypeGithub  = "github"
	OauthTypeGoogle  = "google"
	OauthTypeOidc    = "oidc"
	OauthTypeWebauth = "webauth"
)

type OauthList struct {
	Oauths []*Oauth `json:"list"`
	Pagination
}
