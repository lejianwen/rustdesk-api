package admin

type LoginPayload struct {
	Username   string   `json:"username"`
	Token      string   `json:"token"`
	RouteNames []string `json:"route_names"`
	Nickname   string   `json:"nickname"`
}

var UserRouteNames = []string{
	"MyTagList", "MyAddressBookList", "MyInfo",
}
var AdminRouteNames = []string{"*"}

type UserOauthItem struct {
	ThirdType string `json:"third_type"`
	Status    int    `json:"status"`
}
