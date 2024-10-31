package model

type LoginLog struct {
	IdModel
	UserId      uint   `json:"user_id" gorm:"default:0;not null;"`
	Client      string `json:"client"` //webadmin,webclient,app,
	Uuid        string `json:"uuid"`
	Ip          string `json:"ip"`
	Type        string `json:"type"`     //account,oauth
	Platform    string `json:"platform"` //windows,linux,mac,android,ios
	UserTokenId uint   `json:"user_token_id" gorm:"default:0;not null;"`
	TimeModel
}

const (
	LoginLogClientWebAdmin = "webadmin"
	LoginLogClientWeb      = "webclient"
	LoginLogClientApp      = "app"
)

const (
	LoginLogTypeAccount = "account"
	LoginLogTypeOauth   = "oauth"
)

type LoginLogList struct {
	LoginLogs []*LoginLog `json:"list"`
	Pagination
}
