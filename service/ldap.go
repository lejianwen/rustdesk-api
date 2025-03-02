package service

import (
	"crypto/tls"
	"crypto/x509"
	"errors"
	"fmt"
	"net/url"
	"os"
	"strconv"
	"strings"

	"github.com/go-ldap/ldap/v3"

	"github.com/lejianwen/rustdesk-api/v2/config"
	"github.com/lejianwen/rustdesk-api/v2/model"
)

var (
	ErrUrlParseFailed        = errors.New("UrlParseFailed")
	ErrFileReadFailed        = errors.New("FileReadFailed")
	ErrLdapNotEnabled        = errors.New("LdapNotEnabled")
	ErrLdapUserDisabled      = errors.New("UserDisabledAtLdap")
	ErrLdapUserNotFound      = errors.New("UserNotFound")
	ErrLdapMailNotMatch      = errors.New("MailNotMatch")
	ErrLdapConnectFailed     = errors.New("LdapConnectFailed")
	ErrLdapSearchFailed      = errors.New("LdapSearchRequestFailed")
	ErrLdapTlsFailed         = errors.New("LdapStartTLSFailed")
	ErrLdapBindService       = errors.New("LdapBindServiceFailed")
	ErrLdapBindFailed        = errors.New("LdapBindFailed")
	ErrLdapToLocalUserFailed = errors.New("LdapToLocalUserFailed")
	ErrLdapCreateUserFailed  = errors.New("LdapCreateUserFailed")
)

// LdapService is responsible for LDAP authentication and user synchronization.
type LdapService struct {
}

// LdapUser represents the user attributes retrieved from LDAP.
type LdapUser struct {
	Dn              string
	Username        string
	Email           string
	FirstName       string
	LastName        string
	MemberOf        []string
	EnableAttrValue string
	Enabled         bool
}

// Name returns the full name of an LDAP user.
func (lu *LdapUser) Name() string {
	return fmt.Sprintf("%s %s", lu.FirstName, lu.LastName)
}

// ToUser merges the LdapUser data into a provided *model.User.
// If 'u' is nil, it creates and returns a new *model.User.
func (lu *LdapUser) ToUser(u *model.User) *model.User {
	if u == nil {
		u = &model.User{}
	}
	u.Username = lu.Username
	u.Email = lu.Email
	u.Nickname = lu.Name()
	if lu.Enabled {
		u.Status = model.COMMON_STATUS_ENABLE
	} else {
		u.Status = model.COMMON_STATUS_DISABLED
	}
	return u
}

// connectAndBind creates an LDAP connection, optionally starts TLS, and then binds using the provided credentials.
func (ls *LdapService) connectAndBind(cfg *config.Ldap, username, password string) (*ldap.Conn, error) {
	u, err := url.Parse(cfg.Url)
	if err != nil {
		return nil, errors.Join(ErrUrlParseFailed, err)
	}

	var conn *ldap.Conn
	if u.Scheme == "ldaps" {
		// WARNING: InsecureSkipVerify: true is not recommended for production
		tlsConfig := &tls.Config{InsecureSkipVerify: !cfg.TlsVerify}
		if cfg.TlsCaFile != "" {
			caCert, err := os.ReadFile(cfg.TlsCaFile)
			if err != nil {
				return nil, errors.Join(ErrFileReadFailed, err)
			}
			caCertPool := x509.NewCertPool()
			if !caCertPool.AppendCertsFromPEM(caCert) {
				return nil, errors.Join(ErrLdapTlsFailed, errors.New("failed to append CA certificate"))
			}
			tlsConfig.RootCAs = caCertPool
		}
		conn, err = ldap.DialURL(cfg.Url, ldap.DialWithTLSConfig(tlsConfig))
	} else {
		conn, err = ldap.DialURL(cfg.Url)
	}

	if err != nil {
		return nil, errors.Join(ErrLdapConnectFailed, err)
	}

	// Bind as the "service" user
	if err = conn.Bind(username, password); err != nil {
		fmt.Println("Bind failed")
		conn.Close()
		return nil, errors.Join(ErrLdapBindService, err)
	}
	return conn, nil
}

// connectAndBindAdmin creates an LDAP connection, optionally starts TLS, and then binds using the admin credentials.
func (ls *LdapService) connectAndBindAdmin(cfg *config.Ldap) (*ldap.Conn, error) {
	return ls.connectAndBind(cfg, cfg.BindDn, cfg.BindPassword)
}

// verifyCredentials checks the provided username and password against LDAP.
func (ls *LdapService) verifyCredentials(cfg *config.Ldap, username, password string) error {
	ldapConn, err := ls.connectAndBind(cfg, username, password)
	if err != nil {
		return err
	}
	defer ldapConn.Close()
	return nil
}

// Authenticate checks the provided username and password against LDAP.
// Returns the corresponding *model.User if successful, or an error if not.
func (ls *LdapService) Authenticate(username, password string) (*model.User, error) {
	ldapUser, err := ls.GetUserInfoByUsernameLdap(username)
	if err != nil {
		return nil, err
	}
	if !ldapUser.Enabled {
		return nil, ErrLdapUserDisabled
	}
	cfg := &Config.Ldap
	user, err := ls.mapToLocalUser(cfg, ldapUser)
	if err != nil {
		return nil, errors.Join(ErrLdapToLocalUserFailed, err)
	}
	return user, nil
}

// mapToLocalUser checks whether the user exists locally; if not, creates one.
// If the user exists and Ldap.Sync is enabled, it updates local info.
func (ls *LdapService) mapToLocalUser(cfg *config.Ldap, lu *LdapUser) (*model.User, error) {
	userService := &UserService{}
	localUser := userService.InfoByUsername(lu.Username)
	isAdmin := ls.isUserAdmin(cfg, lu)
	// If the user doesn't exist in local DB, create a new one
	if localUser.Id == 0 {
		newUser := lu.ToUser(nil)
		// Typically, you don’t store LDAP user passwords locally.
		// If needed, you can set a random password here.
		newUser.IsAdmin = &isAdmin
		newUser.GroupId = 1
		if err := DB.Create(newUser).Error; err != nil {
			return nil, errors.Join(ErrLdapCreateUserFailed, err)
		}
		return userService.InfoByUsername(lu.Username), nil
	}

	// If the user already exists and sync is enabled, update local info
	if cfg.User.Sync {
		originalEmail := localUser.Email
		originalNickname := localUser.Nickname
		originalIsAdmin := localUser.IsAdmin
		originalStatus := localUser.Status
		lu.ToUser(localUser) // merges LDAP data into the existing user
		localUser.IsAdmin = &isAdmin
		if err := userService.Update(localUser); err != nil {
			// If the update fails, revert to original data
			localUser.Email = originalEmail
			localUser.Nickname = originalNickname
			localUser.IsAdmin = originalIsAdmin
			localUser.Status = originalStatus
		}
	}

	return localUser, nil
}

// IsUsernameExists checks if a username exists in LDAP (can be useful for local registration checks).
func (ls *LdapService) IsUsernameExists(username string) bool {

	cfg := &Config.Ldap
	if !cfg.Enable {
		return false
	}
	sr, err := ls.usernameSearchResult(cfg, username)
	if err != nil {
		return false
	}
	return len(sr.Entries) > 0
}

// IsEmailExists checks if an email exists in LDAP (can be useful for local registration checks).
func (ls *LdapService) IsEmailExists(email string) bool {
	cfg := &Config.Ldap
	if !cfg.Enable {
		return false
	}
	sr, err := ls.emailSearchResult(cfg, email)
	if err != nil {
		return false
	}
	return len(sr.Entries) > 0
}

// GetUserInfoByUsernameLdap returns the user info from LDAP for the given username.
func (ls *LdapService) GetUserInfoByUsernameLdap(username string) (*LdapUser, error) {
	cfg := &Config.Ldap
	if !cfg.Enable {
		return nil, ErrLdapNotEnabled
	}
	sr, err := ls.usernameSearchResult(cfg, username)
	if err != nil {
		return nil, errors.Join(ErrLdapSearchFailed, err)
	}
	if len(sr.Entries) != 1 {
		return nil, ErrLdapUserNotFound
	}
	return ls.userResultToLdapUser(cfg, sr.Entries[0]), nil
}

// GetUserInfoByUsernameLocal returns the user info from LDAP for the given username. If the user exists, it will sync the user info to the local database.
func (ls *LdapService) GetUserInfoByUsernameLocal(username string) (*model.User, error) {
	ldapUser, err := ls.GetUserInfoByUsernameLdap(username)
	if err != nil {
		return &model.User{}, err
	}
	return ls.mapToLocalUser(&Config.Ldap, ldapUser)
}

// GetUserInfoByEmailLdap returns the user info from LDAP for the given email.
func (ls *LdapService) GetUserInfoByEmailLdap(email string) (*LdapUser, error) {
	cfg := &Config.Ldap
	if !cfg.Enable {
		return nil, ErrLdapNotEnabled
	}
	sr, err := ls.emailSearchResult(cfg, email)
	if err != nil {
		return nil, errors.Join(ErrLdapSearchFailed, err)
	}
	if len(sr.Entries) != 1 {
		return nil, ErrLdapUserNotFound
	}
	return ls.userResultToLdapUser(cfg, sr.Entries[0]), nil
}

// GetUserInfoByEmailLocal returns the user info from LDAP for the given email. if the user exists, it will synchronize the user information to local database.
func (ls *LdapService) GetUserInfoByEmailLocal(email string) (*model.User, error) {
	ldapUser, err := ls.GetUserInfoByEmailLdap(email)
	if err != nil {
		return &model.User{}, err
	}
	return ls.mapToLocalUser(&Config.Ldap, ldapUser)
}

// usernameSearchResult returns the search result for the given username.
func (ls *LdapService) usernameSearchResult(cfg *config.Ldap, username string) (*ldap.SearchResult, error) {
	// Build the combined filter for the username
	filter := ls.filterField(ls.fieldUsername(cfg), username)
	// Create the *ldap.SearchRequest
	searchRequest := ls.buildUserSearchRequest(cfg, filter)
	return ls.searchResult(cfg, searchRequest)
}

// emailSearchResult returns the search result for the given email.
func (ls *LdapService) emailSearchResult(cfg *config.Ldap, email string) (*ldap.SearchResult, error) {
	filter := ls.filterField(ls.fieldEmail(cfg), email)
	searchRequest := ls.buildUserSearchRequest(cfg, filter)
	return ls.searchResult(cfg, searchRequest)
}

func (ls *LdapService) searchResult(cfg *config.Ldap, searchRequest *ldap.SearchRequest) (*ldap.SearchResult, error) {
	ldapConn, err := ls.connectAndBindAdmin(cfg)
	if err != nil {
		return nil, err
	}
	defer ldapConn.Close()
	return ldapConn.Search(searchRequest)
}

// buildUserSearchRequest constructs an LDAP SearchRequest for users given a filter.
func (ls *LdapService) buildUserSearchRequest(cfg *config.Ldap, filter string) *ldap.SearchRequest {
	baseDn := ls.baseDnUser(cfg) // user-specific base DN, or fallback
	filterConfig := cfg.User.Filter
	if filterConfig == "" {
		filterConfig = "(cn=*)"
	}

	// Combine the default filter with our field filter, e.g. (&(cn=*)(uid=jdoe))
	combinedFilter := fmt.Sprintf("(&%s%s)", filterConfig, filter)

	attributes := ls.buildUserAttributes(cfg)

	return ldap.NewSearchRequest(
		baseDn,
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,     // unlimited search results
		0,     // no server-side time limit
		false, // typesOnly
		combinedFilter,
		attributes,
		nil,
	)
}

// buildUserAttributes returns the list of attributes we want from LDAP user searches.
func (ls *LdapService) buildUserAttributes(cfg *config.Ldap) []string {
	return []string{
		"dn",
		ls.fieldUsername(cfg),
		ls.fieldEmail(cfg),
		ls.fieldFirstName(cfg),
		ls.fieldLastName(cfg),
		ls.fieldMemberOf(),
		ls.fieldUserEnableAttr(cfg),
	}
}

// userResultToLdapUser maps an *ldap.Entry to our LdapUser struct.
func (ls *LdapService) userResultToLdapUser(cfg *config.Ldap, entry *ldap.Entry) *LdapUser {
	lu := &LdapUser{
		Dn:              entry.DN,
		Username:        entry.GetAttributeValue(ls.fieldUsername(cfg)),
		Email:           entry.GetAttributeValue(ls.fieldEmail(cfg)),
		FirstName:       entry.GetAttributeValue(ls.fieldFirstName(cfg)),
		LastName:        entry.GetAttributeValue(ls.fieldLastName(cfg)),
		MemberOf:        entry.GetAttributeValues(ls.fieldMemberOf()),
		EnableAttrValue: entry.GetAttributeValue(ls.fieldUserEnableAttr(cfg)),
	}
	// Check if the user is enabled based on the LDAP configuration
	ls.isUserEnabled(cfg, lu)
	return lu
}

// filterField helps build simple attribute filters, e.g. (uid=username).
func (ls *LdapService) filterField(field, value string) string {
	return fmt.Sprintf("(%s=%s)", field, value)
}

// fieldUsername returns the configured username attribute or "uid" if not set.
func (ls *LdapService) fieldUsername(cfg *config.Ldap) string {
	if cfg.User.Username == "" {
		return "uid"
	}
	return cfg.User.Username
}

// fieldEmail returns the configured email attribute or "mail" if not set.
func (ls *LdapService) fieldEmail(cfg *config.Ldap) string {
	if cfg.User.Email == "" {
		return "mail"
	}
	return cfg.User.Email
}

// fieldFirstName returns the configured first name attribute or "givenName" if not set.
func (ls *LdapService) fieldFirstName(cfg *config.Ldap) string {
	if cfg.User.FirstName == "" {
		return "givenName"
	}
	return cfg.User.FirstName
}

// fieldLastName returns the configured last name attribute or "sn" if not set.
func (ls *LdapService) fieldLastName(cfg *config.Ldap) string {
	if cfg.User.LastName == "" {
		return "sn"
	}
	return cfg.User.LastName
}

func (ls *LdapService) fieldMemberOf() string {
	return "memberOf"
}

func (ls *LdapService) fieldUserEnableAttr(cfg *config.Ldap) string {
	if cfg.User.EnableAttr == "" {
		return "userAccountControl"
	}
	return cfg.User.EnableAttr
}

// baseDnUser returns the user-specific base DN or the global base DN if none is set.
func (ls *LdapService) baseDnUser(cfg *config.Ldap) string {
	if cfg.User.BaseDn == "" {
		return cfg.BaseDn
	}
	return cfg.User.BaseDn
}

// isUserAdmin checks if the user is a member of the admin group.
func (ls *LdapService) isUserAdmin(cfg *config.Ldap, ldapUser *LdapUser) bool {
	// Check if the admin group is configured
	adminGroup := cfg.User.AdminGroup
	if adminGroup == "" {
		return false
	}

	// Check "memberOf" directly
	if len(ldapUser.MemberOf) > 0 {
		for _, group := range ldapUser.MemberOf {
			if group == adminGroup {
				return true
			}
		}
		return false
	}

	// For "member" attribute, perform a reverse search on the group
	member := "member"
	userDN := ldap.EscapeFilter(ldapUser.Dn)
	adminGroupDn := ldap.EscapeFilter(adminGroup)
	groupFilter := fmt.Sprintf("(%s=%s)", member, userDN)

	// Create the LDAP search request
	groupSearchRequest := ldap.NewSearchRequest(
		adminGroupDn,
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,     // Unlimited search results
		0,     // No time limit
		false, // Return both attributes and DN
		groupFilter,
		[]string{"dn"},
		nil,
	)

	// Perform the group search
	groupResult, err := ls.searchResult(cfg, groupSearchRequest)
	if err != nil {
		return false
	}

	// If any results are returned, the user is part of the admin group
	if len(groupResult.Entries) > 0 {
		return true
	}
	return false

}

// isUserEnabled checks if the user is enabled based on the LDAP configuration.
// If no enable attribute or value is set, all users are considered enabled by default.
func (ls *LdapService) isUserEnabled(cfg *config.Ldap, ldapUser *LdapUser) bool {
	// Retrieve the enable attribute and expected value from the configuration
	enableAttr := cfg.User.EnableAttr
	enableAttrValue := cfg.User.EnableAttrValue

	// If no enable attribute or value is configured, consider all users as enabled
	if enableAttr == "" || enableAttrValue == "" {
		ldapUser.Enabled = true
		return true
	}

	// Normalize the enable attribute for comparison
	enableAttr = strings.ToLower(enableAttr)

	// Handle Active Directory's userAccountControl attribute
	if enableAttr == "useraccountcontrol" {
		// Parse the userAccountControl value
		userAccountControl, err := strconv.Atoi(ldapUser.EnableAttrValue)
		if err != nil {
			fmt.Printf("[ERROR] Invalid userAccountControl value: %v\n", err)
			ldapUser.Enabled = false
			return false
		}

		// Account is disabled if the ACCOUNTDISABLE flag (0x2) is set
		const ACCOUNTDISABLE = 0x2
		ldapUser.Enabled = userAccountControl&ACCOUNTDISABLE == 0
		return ldapUser.Enabled
	}

	// For other attributes, perform a direct comparison with the expected value
	ldapUser.Enabled = ldapUser.EnableAttrValue == enableAttrValue
	return ldapUser.Enabled
}

// getAttrOfDn retrieves the value of an attribute for a given DN.
func (ls *LdapService) getAttrOfDn(cfg *config.Ldap, dn, attr string) string {
	searchRequest := ldap.NewSearchRequest(
		ldap.EscapeFilter(dn),
		ldap.ScopeBaseObject,
		ldap.NeverDerefAliases,
		0,     // unlimited search results
		0,     // no server-side time limit
		false, // typesOnly
		"(objectClass=*)",
		[]string{attr},
		nil,
	)
	sr, err := ls.searchResult(cfg, searchRequest)
	if err != nil {
		return ""
	}
	if len(sr.Entries) == 0 {
		return ""
	}
	return sr.Entries[0].GetAttributeValue(attr)
}
