package config

type LdapUser struct {
	UserBaseDn string `mapstructure:"base-dn"`
	Filter     string `mapstructure:"filter"`
	Username   string `mapstructure:"username"`
	Email      string `mapstructure:"email"`
	FirstName  string `mapstructure:"first-name"`
	LastName   string `mapstructure:"last-name"`
	Sync       bool   `mapstructure:"sync"` // Will sync the user's information to the internal database
}

type LdapGroup struct {
	GroupBaseDn string            `mapstructure:"base-dn"`
	Name        string            `mapstructure:"name"`
	Filter      string            `mapstructure:"filter"`
	Admin       string            `mapstructure:"admin"`   // Which group is the admin group
	Member      string            `mapstructure:"member"`  // How to get the member of the group: member, uniqueMember, or memberOf (default: member)
	Mode        string            `mapstructure:"mode"`
	Map         map[string]string `mapstructure:"map"`     // If mode is "map", map the LDAP group to the internal group
}

type Ldap struct {
	Enable       bool      `mapstructure:"enable"`
	Url          string    `mapstructure:"url"`
	TLS          bool      `mapstructure:"tls"`
	TlsVerify 	 bool      `mapstructure:"tls-verify"`
	BaseDn       string    `mapstructure:"base-dn"`
	BindDn       string    `mapstructure:"bind-dn"`
	BindPassword string    `mapstructure:"bind-password"`
	User         LdapUser  `mapstructure:"user"`
	Group        LdapGroup `mapstructure:"group"`
}