package model

import (
	"strconv"
	"fmt"
)


const (
	OauthTypeGithub  string = "github"
	OauthTypeGoogle  string = "google"
	OauthTypeOidc    string = "oidc"
	OauthTypeWebauth string = "webauth"
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
}

func (ou *OauthUser) ToUser(user *User, overideUsername bool) {
	if overideUsername {
		user.Username = ou.Username
	}
	user.Email = ou.Email
	user.Nickname = ou.Name

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
}

func (ou *OidcUser) ToOauthUser() *OauthUser {
	return &OauthUser{
		OpenId: 		ou.Sub,
		Name:   		ou.Name,
		Username: 		ou.PreferredUsername,
		Email:  		ou.Email,
		VerifiedEmail: 	ou.VerifiedEmail,
	}
}

type GoogleUser struct {
	OauthUserBase
	FamilyName    string `json:"family_name"`
	GivenName     string `json:"given_name"`
	Id            string `json:"id"`
	Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verified_email"`
}

func (gu *GoogleUser) ToOauthUser() *OauthUser {
	return &OauthUser{
		OpenId: 		gu.Id,
		Name:   		fmt.Sprintf("%s %s", gu.GivenName, gu.FamilyName),
		Username: 		gu.GivenName,
		Email:  		gu.Email,
		VerifiedEmail: 	gu.VerifiedEmail,
	}	
}


type GithubUser struct {
	OauthUserBase
	Id                int         `json:"id"`
	Login             string      `json:"login"`
}

func (gu *GithubUser) ToOauthUser() *OauthUser {
	return &OauthUser{
		OpenId: 		strconv.Itoa(gu.Id),
		Name:   		gu.Name,
		Username: 		gu.Login,
		Email:  		gu.Email,
		VerifiedEmail: 	true,
	}
}



type OauthList struct {
	Oauths []*Oauth `json:"list"`
	Pagination
}
