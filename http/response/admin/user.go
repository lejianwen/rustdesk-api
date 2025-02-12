package admin

import "github.com/lejianwen/rustdesk-api/model"

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

type GroupUsersPayload struct {
	Id       uint   `json:"id"`
	Username string `json:"username"`
	Status   int    `json:"status"`
}

func (g *GroupUsersPayload) FromUser(user *model.User) {
	g.Id = user.Id
	g.Username = user.Username
	g.Status = 1
}
