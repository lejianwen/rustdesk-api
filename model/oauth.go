package model

import (
	"strconv"
	"strings"
)

const OIDC_DEFAULT_SCOPES = "openid,profile,email"

const (
	OauthTypeGithub  string = "github"
	OauthTypeGoogle  string = "google"
	OauthTypeOidc    string = "oidc"
	OauthTypeWebauth string = "webauth"
)

const (
	OauthNameGithub  string = "GitHub"
	OauthNameGoogle  string = "Google"
	OauthNameOidc    string = "OIDC"
	OauthNameWebauth string = "WebAuth"
)

const (
	UserEndpointGithub  string = "https://api.github.com/user"
	UserEndpointGoogle  string = "https://www.googleapis.com/oauth2/v3/userinfo"
	UserEndpointOidc    string = ""
)

type Oauth struct {
	IdModel
	Op           string 	`json:"op"`
	OauthType    string 	`json:"oauth_type"`
	ClientId     string 	`json:"client_id"`
	ClientSecret string 	`json:"client_secret"`
	RedirectUrl  string 	`json:"redirect_url"`
	AutoRegister *bool  	`json:"auto_register"`
	Scopes       string 	`json:"scopes"`
	Issuer	     string 	`json:"issuer"`
	TimeModel
}

type OauthUser struct {
	OpenId 			string 	`json:"open_id" gorm:"not null;index"`
	Name   			string 	`json:"name"`
	Username 		string 	`json:"username"`
	Email  			string 	`json:"email"`
	VerifiedEmail 	bool 	`json:"verified_email,omitempty"`
	Picture			string 	`json:"picture,omitempty"`
}

func (ou *OauthUser) ToUser(user *User, overideUsername bool) {
	if overideUsername {
		user.Username = ou.Username
	}
	user.Email = ou.Email
	user.Nickname = ou.Name
	user.Avatar = ou.Picture
}

type OauthUserBase struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type OidcUser struct {
	OauthUserBase
	Sub               string `json:"sub"`
	VerifiedEmail     bool   `json:"email_verified"`
	PreferredUsername string `json:"preferred_username"`
	Picture           string `json:"picture"`
}

func (ou *OidcUser) ToOauthUser() *OauthUser {
	var username string
	// 使用 PreferredUsername，如果不存在，降级到 Email 前缀
	if ou.PreferredUsername != "" {
		username = ou.PreferredUsername
	} else {
		username = strings.ToLower(strings.Split(ou.Email, "@")[0])
	}

	return &OauthUser{
		OpenId:        ou.Sub,
		Name:          ou.Name,
		Username:      username,
		Email:         ou.Email,
		VerifiedEmail: ou.VerifiedEmail,
		Picture:       ou.Picture,
	}
}

type GoogleUser struct {
	OidcUser
}

// GoogleUser 使用特定的 Username 规则来调用 ToOauthUser
func (gu *GoogleUser) ToOauthUser() *OauthUser {
	return gu.OidcUser.ToOauthUser()
}


type GithubUser struct {
	OauthUserBase
	Id                int         `json:"id"`
	Login             string      `json:"login"`
	AvatarUrl         string      `json:"avatar_url"`
	VerifiedEmail	  bool        `json:"verified_email"`
}

func (gu *GithubUser) ToOauthUser() *OauthUser {
	username := strings.ToLower(gu.Login)
	return &OauthUser{
		OpenId: 		strconv.Itoa(gu.Id),
		Name:   		gu.Name,
		Username: 		username,
		Email:  		gu.Email,
		VerifiedEmail: 	gu.VerifiedEmail,
		Picture:		gu.AvatarUrl,
	}
}



type OauthList struct {
	Oauths []*Oauth `json:"list"`
	Pagination
}
