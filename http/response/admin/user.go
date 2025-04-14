package admin

import "github.com/lejianwen/rustdesk-api/v2/model"

type LoginPayload struct {
	Username   string   `json:"username"`
	Email      string   `json:"email"`
	Avatar     string   `json:"avatar"`
	Token      string   `json:"token"`
	RouteNames []string `json:"route_names"`
	Nickname   string   `json:"nickname"`
}

func (lp *LoginPayload) FromUser(user *model.User) {
	lp.Username = user.Username
	lp.Email = user.Email
	lp.Avatar = user.Avatar
	lp.Nickname = user.Nickname
}

type UserOauthItem struct {
	Op     string `json:"op"`
	Status int    `json:"status"`
}
