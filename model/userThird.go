package model

type UserThird struct {
	IdModel
	UserId     		uint   `	json:"user_id" gorm:"not null;index"`
	OauthUser
	// UnionId    		string `json:"union_id" gorm:"not null;"`
	// OauthType  	   	string 		`json:"oauth_type" gorm:"not null;"`
	OauthType  	   	string 		`json:"oauth_type"`
	Op  			string 		`json:"op" gorm:"not null;"`
	TimeModel
}

func (u *UserThird) FromOauthUser(userId uint, oauthUser *OauthUser, oauthType string, op string) {
	u.UserId 			= userId
	u.OauthUser 		= *oauthUser
	u.OauthType 		= oauthType
	u.Op 				= op
}