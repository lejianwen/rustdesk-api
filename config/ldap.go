package config

type LdapUser struct {
	BaseDn 	   		string `mapstructure:"base-dn"` 				// The base DN of the user for searching
	EnableAttr 		string `mapstructure:"enable-attr"` 			// The attribute name of the user for enabling, in AD it is "userAccountControl", empty means no enable attribute, all users are enabled
	EnableAttrValue string `mapstructure:"enable-attr-value"` 		// The value of the enable attribute when the user is enabled. If you are using AD, just leave it random str, it will be ignored.
	Filter     		string `mapstructure:"filter"`
	Username   		string `mapstructure:"username"`
	Email      		string `mapstructure:"email"`
	FirstName  		string `mapstructure:"first-name"`
	LastName   		string `mapstructure:"last-name"`
	Sync       		bool   `mapstructure:"sync"` 				// Will sync the user's information to the internal database
	AdminGroup      string `mapstructure:"admin-group"` 	    // Which group is the admin group
}

// type LdapGroup struct {
// 	BaseDn 		string            `mapstructure:"base-dn"` // The base DN of the group for searching
// 	Name        string            `mapstructure:"name"`    // The attribute name of the group
// 	Filter      string            `mapstructure:"filter"`
// 	Admin       string            `mapstructure:"admin"`   // Which group is the admin group
// 	Member      string            `mapstructure:"member"`  // How to get the member of the group: member, uniqueMember, or memberOf (default: member)
// 	Mode        string            `mapstructure:"mode"`
// 	Map         map[string]string `mapstructure:"map"`     // If mode is "map", map the LDAP group to the internal group
// }

type Ldap struct {
	Enable       bool      `mapstructure:"enable"`
	Url          string    `mapstructure:"url"`
	TLS          bool      `mapstructure:"tls"`
	TlsVerify 	 bool      `mapstructure:"tls-verify"`
	BaseDn       string    `mapstructure:"base-dn"`
	BindDn       string    `mapstructure:"bind-dn"`
	BindPassword string    `mapstructure:"bind-password"`
	User         LdapUser  `mapstructure:"user"`
	// Group        LdapGroup `mapstructure:"group"`
}