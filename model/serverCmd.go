package model

type ServerCmd struct {
	IdModel
	Cmd     string `json:"cmd" gorm:"default:'';not null;"`
	Alias   string `json:"alias" gorm:"default:'';not null;"`
	Option  string `json:"option" gorm:"default:'';not null;"`
	Explain string `json:"explain" gorm:"default:'';not null;"`
	Target  string `json:"target" gorm:"default:'';not null;"`
	TimeModel
}

type ServerCmdList struct {
	ServerCmds []*ServerCmd `json:"list"`
	Pagination
}

const (
	ServerCmdTargetIdServer    = "21115"
	ServerCmdTargetRelayServer = "21117"
)

var SysIdServerCmds = []*ServerCmd{
	{Cmd: "h", Option: "", Explain: "show help", Target: ServerCmdTargetIdServer},
	{Cmd: "relay-servers", Alias: "rs", Option: "<separated by ,>", Explain: "set or show relay servers", Target: ServerCmdTargetIdServer},
	{Cmd: "ip-blocker", Alias: "ib", Option: "[<ip>|<number>] [-]", Explain: "block or unblock ip or show blocked ip", Target: ServerCmdTargetIdServer},
	{Cmd: "ip-changes", Alias: "ic", Option: "[<id>|<number>] [-]", Explain: "ip-changes(ic) [<id>|<number>] [-]", Target: ServerCmdTargetIdServer},
	{Cmd: "always-use-relay", Alias: "aur", Option: "[y|n]", Explain: "always use relay", Target: ServerCmdTargetIdServer},
	{Cmd: "test-geo", Alias: "tg", Option: "<ip1> <ip2>", Explain: "test geo", Target: ServerCmdTargetIdServer},
}

/*
"blacklist-add(ba) <ip>",
"blacklist-remove(br) <ip>",
"blacklist(b) <ip>",
"blocklist-add(Ba) <ip>",
"blocklist-remove(Br) <ip>",
"blocklist(B) <ip>",
"downgrade-threshold(dt) [value]",
"downgrade-start-check(t) [value(second)]",
"limit-speed(ls) [value(Mb/s)]",
"total-bandwidth(tb) [value(Mb/s)]",
"single-bandwidth(sb) [value(Mb/s)]",
"usage(u)"
*/

var SysRelayServerCmds = []*ServerCmd{
	{Cmd: "h", Option: "", Explain: "show help", Target: ServerCmdTargetRelayServer},
	{Cmd: "blacklist-add", Alias: "ba", Option: "<ip>", Explain: "blacklist-add(ba) <ip>", Target: ServerCmdTargetRelayServer},
	{Cmd: "blacklist-remove", Alias: "br", Option: "<ip>", Explain: "blacklist-remove(br) <ip>", Target: ServerCmdTargetRelayServer},
	{Cmd: "blacklist", Alias: "b", Option: "<ip>", Explain: "blacklist(b) <ip>", Target: ServerCmdTargetRelayServer},
	{Cmd: "blocklist-add", Alias: "Ba", Option: "<ip>", Explain: "blocklist-add(Ba) <ip>", Target: ServerCmdTargetRelayServer},
	{Cmd: "blocklist-remove", Alias: "Br", Option: "<ip>", Explain: "blocklist-remove(Br) <ip>", Target: ServerCmdTargetRelayServer},
	{Cmd: "blocklist", Alias: "B", Option: "<ip>", Explain: "blocklist(B) <ip>", Target: ServerCmdTargetRelayServer},
	{Cmd: "downgrade-threshold", Alias: "dt", Option: "[value]", Explain: "downgrade-threshold(dt) [value]", Target: ServerCmdTargetRelayServer},
	{Cmd: "downgrade-start-check", Alias: "t", Option: "[value(second)]", Explain: "downgrade-start-check(t) [value(second)]", Target: ServerCmdTargetRelayServer},
	{Cmd: "limit-speed", Alias: "ls", Option: "[value(Mb/s)]", Explain: "limit-speed(ls) [value(Mb/s)]", Target: ServerCmdTargetRelayServer},
	{Cmd: "total-bandwidth", Alias: "tb", Option: "[value(Mb/s)]", Explain: "total-bandwidth(tb) [value(Mb/s)]", Target: ServerCmdTargetRelayServer},
	{Cmd: "single-bandwidth", Alias: "sb", Option: "[value(Mb/s)]", Explain: "single-bandwidth(sb) [value(Mb/s)]", Target: ServerCmdTargetRelayServer},
	{Cmd: "usage", Alias: "u", Option: "", Explain: "usage(u)", Target: ServerCmdTargetRelayServer},
}
