package admin

type Login struct {
	Username string `json:"username" validate:"required" label:"用户名"`
	Password string `json:"password,omitempty" validate:"required" label:"密码"`
}
