package admin

type Login struct {
	Username  string `json:"username" validate:"required" label:"用户名"`
	Password  string `json:"password,omitempty" validate:"required" label:"密码"`
	Platform  string `json:"platform" label:"平台"`
	Captcha   string `json:"captcha,omitempty" label:"验证码"`
	CaptchaId string `json:"captcha_id,omitempty"`
}

type LoginLogQuery struct {
	UserId int `form:"user_id"`
	IsMy   int `form:"is_my"`
	PageQuery
}
type LoginTokenQuery struct {
	UserId int `form:"user_id"`
	PageQuery
}

type LoginLogIds struct {
	Ids []uint `json:"ids" validate:"required"`
}
