package model

type ServerCmd struct {
	IdModel
	Cmd     string `json:"cmd" gorm:"default:'';not null;"`
	Alias   string `json:"alias" gorm:"default:'';not null;"`
	Option  string `json:"option" gorm:"default:'';not null;"`
	Explain string `json:"explain" gorm:"default:'';not null;"`
	TimeModel
}

type ServerCmdList struct {
	ServerCmds []*ServerCmd `json:"list"`
	Pagination
}

var SysServerCmds = []*ServerCmd{
	{Cmd: "h", Option: "", Explain: "show help"},
	{Cmd: "relay-servers", Alias: "rs", Option: "<separated by ,>", Explain: "set or show relay servers"},
	{Cmd: "ip-blocker", Alias: "ib", Option: "[<ip>|<number>] [-]", Explain: "block or unblock ip or show blocked ip"},
	{Cmd: "ip-changes", Alias: "ic", Option: "[<id>|<number>] [-]", Explain: "ip-changes(ic) [<id>|<number>] [-]"},
	{Cmd: "always-use-relay(aur)", Alias: "aur", Option: "[y|n]", Explain: "always use relay"},
	{Cmd: "test-geo", Alias: "tg", Option: "<ip1> <ip2>", Explain: "test geo"},
}
