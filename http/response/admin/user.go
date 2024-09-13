package admin

type LoginPayload struct {
	Username   string   `json:"username"`
	Token      string   `json:"token"`
	RouteNames []string `json:"route_names"`
	Nickname   string   `json:"nickname"`
}

var UserRouteNames = []string{
	"MyTagList", "MyAddressBookList",
}
var AdminRouteNames = []string{"*"}
