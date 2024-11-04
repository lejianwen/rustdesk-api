package model

import (
	"strconv"
	"strings"
	"errors"
)

const OIDC_DEFAULT_SCOPES = "openid,profile,email"

const (
	// make sure the value shouldbe lowercase
	OauthTypeGithub  string = "github"
	OauthTypeGoogle  string = "google"
	OauthTypeOidc    string = "oidc"
	OauthTypeWebauth string = "webauth"
)

// Validate the oauth type
func ValidateOauthType(oauthType string) error {
	switch oauthType {
	case OauthTypeGithub, OauthTypeGoogle, OauthTypeOidc, OauthTypeWebauth:
		return nil
	default:
		return errors.New("invalid Oauth type")
	}
}

const (
	OauthNameGithub  string = "GitHub"
	OauthNameGoogle  string = "Google"
	OauthNameOidc    string = "OIDC"
	OauthNameWebauth string = "WebAuth"
)

const (
	UserEndpointGithub  string = "https://api.github.com/user"
	IssuerGoogle 		string = "https://accounts.google.com"
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



// Helper function to format oauth info, it's used in the update and create method
func (oa *Oauth) FormatOauthInfo() error {
	oauthType := strings.TrimSpace(oa.OauthType)
	err := ValidateOauthType(oa.OauthType)
	if err != nil {
		return err
	}
	// check if the op is empty, set the default value
	op := strings.TrimSpace(oa.Op)
	if op == "" {
		switch oauthType {
		case OauthTypeGithub:
			oa.Op = OauthNameGithub
		case OauthTypeGoogle:
			oa.Op = OauthNameGoogle
		case OauthTypeOidc:
			oa.Op = OauthNameOidc
		case OauthTypeWebauth:
			oa.Op = OauthNameWebauth
		default:
			oa.Op = oauthType
		}
	}
	// check the issuer, if the oauth type is google and the issuer is empty, set the issuer to the default value
	issuer := strings.TrimSpace(oa.Issuer)
	// If the oauth type is google and the issuer is empty, set the issuer to the default value 
	if oauthType == OauthTypeGoogle && issuer == "" {
		oa.Issuer = IssuerGoogle
	}
	return nil
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
