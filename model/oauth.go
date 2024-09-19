package model

type Oauth struct {
	IdModel
	Op           string `json:"op"`
	ClientId     string `json:"client_id"`
	ClientSecret string `json:"client_secret"`
	RedirectUrl  string `json:"redirect_url"`
	AutoRegister *bool  `json:"auto_register"`
	TimeModel
}

const (
	OauthTypeGithub  = "github"
	OauthTypeGoogle  = "google"
	OauthTypeWebauth = "webauth"
)

type OauthList struct {
	Oauths []*Oauth `json:"list"`
	Pagination
}
