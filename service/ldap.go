package service

import (
    "crypto/tls"
    "errors"
    "fmt"

    "github.com/go-ldap/ldap/v3"

    "Gwen/config"
    "Gwen/global"
    "Gwen/model"
)

// LdapService is responsible for LDAP authentication and user synchronization.
type LdapService struct {
}

// LdapUser represents the user attributes retrieved from LDAP.
type LdapUser struct {
    Dn        string
    Username  string
    Email     string
    FirstName string
    LastName  string
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
    return u
}

// connectAndBind creates an LDAP connection, optionally starts TLS, and then binds using the provided credentials.
func (ls *LdapService) connectAndBind(cfg *config.Ldap, username,password string) (*ldap.Conn, error) {
    conn, err := ldap.DialURL(cfg.Url)
    if err != nil {
        return nil, fmt.Errorf("failed to dial LDAP: %w", err)
    }

    if cfg.TLS {
        // WARNING: InsecureSkipVerify: true is not recommended for production
        if err = conn.StartTLS(&tls.Config{InsecureSkipVerify: true}); err != nil {
            conn.Close()
            return nil, fmt.Errorf("failed to start TLS: %w", err)
        }
    }

    // Bind as the "service" user
    if err = conn.Bind(username, password); err != nil {
        conn.Close()
        return nil, fmt.Errorf("failed to bind with service account: %w", err)
    }
    return conn, nil
}

// connectAndBindAdmin creates an LDAP connection, optionally starts TLS, and then binds using the admin credentials.
func (ls *LdapService) connectAndBindAdmin(cfg *config.Ldap) (*ldap.Conn, error) {
    return ls.connectAndBind(cfg,cfg.BindDn,cfg.BindPassword)
}

// verifyCredentials checks the provided username and password against LDAP.
func (ls *LdapService) verifyCredentials(cfg *config.Ldap,username, password string) error {
    ldapConn, err := ls.connectAndBind(cfg,username,password)
    if err != nil {
        return err
    }
    defer ldapConn.Close()
    return nil
}

// Authenticate checks the provided username and password against LDAP.
// Returns the corresponding *model.User if successful, or an error if not.
func (ls *LdapService) Authenticate(username, password string) (*model.User, error) {
    cfg := &global.Config.Ldap

    // 1. Use a service bind to search for the user DN
    sr, err := ls.usernameSearchResult(cfg,username)
    if err != nil {
        return nil, fmt.Errorf("LDAP search request failed: %w", err)
    }
    if len(sr.Entries) != 1 {
        return nil, errors.New("user does not exist or too many entries returned")
    }
    entry := sr.Entries[0]
    userDN := entry.DN

    err = ls.verifyCredentials(cfg,userDN,password)
    if err != nil {
        return nil, fmt.Errorf("LDAP authentication failed: %w", err)
    }
    ldapUser := ls.userResultToLdapUser(cfg,entry)
    user, err := ls.mapToLocalUser(cfg,ldapUser)
    if err != nil {
        return nil, fmt.Errorf("failed to map LDAP user to local user: %w", err)
    }
    return user, nil
}

// mapToLocalUser checks whether the user exists locally; if not, creates one.
// If the user exists and Ldap.Sync is enabled, it updates local info.
func (ls *LdapService) mapToLocalUser(cfg *config.Ldap,lu *LdapUser) (*model.User, error) {
    userService := &UserService{}
    localUser := userService.InfoByUsername(lu.Username)

    // If the user doesn't exist in local DB, create a new one
    if localUser.Id == 0 {
        fmt.Printf("[DEBUG] User not found in local DB. Creating a new user...\n")
        newUser := lu.ToUser(nil)
        // Typically, you don’t store LDAP user passwords locally.
        // If needed, you can set a random password here.

        if err := global.DB.Create(newUser).Error; err != nil {
            return nil, fmt.Errorf("failed to create new user: %w", err)
        }
        return userService.InfoByUsername(lu.Username), nil
    }

    // If the user already exists and sync is enabled, update local info
    if cfg.User.Sync {
        originalEmail := localUser.Email
        originalNickname := localUser.Nickname

        lu.ToUser(localUser) // merges LDAP data into the existing user
        fmt.Printf("[DEBUG] Updating local user from LDAP: %v\n", localUser)

        if err := userService.Update(localUser); err != nil {
            // If the update fails, revert to original data
            localUser.Email = originalEmail
            localUser.Nickname = originalNickname
            fmt.Printf("Failed to update user from LDAP: %v. Keeping local information.\n", err)
        }
    }

    return localUser, nil
}

// IsUsernameExists checks if a username exists in LDAP (can be useful for local registration checks).
func (ls *LdapService) IsUsernameExists(username string) bool {
    
    cfg := &global.Config.Ldap
    if ! cfg.Enable{
        return false
    }
    sr, err := ls.usernameSearchResult(cfg,username)
    if err != nil {
        return false
    }
    return len(sr.Entries) > 0
}

// IsEmailExists checks if an email exists in LDAP (can be useful for local registration checks).
func (ls *LdapService) IsEmailExists(email string) bool {
    cfg := &global.Config.Ldap
    if ! cfg.Enable{
        return false
    }
    sr, err := ls.emailSearchResult(cfg,email)
    if err != nil {
        return false
    }
    return len(sr.Entries) > 0
}

// SyncUser synchronizes users from LDAP to the local database (to be implemented as needed).
func (ls *LdapService) SyncUser() error {
    return nil
}

// SyncGroup synchronizes groups from LDAP to the local database (to be implemented as needed).
func (ls *LdapService) SyncGroup() error {
    return nil
}

// usernameSearchResult returns the search result for the given username.
func (ls *LdapService) usernameSearchResult(cfg *config.Ldap,username string) (*ldap.SearchResult, error) {
    // Build the combined filter for the username
    filter := ls.filterField(ls.fieldUsername(cfg), username)
    // Create the *ldap.SearchRequest
    searchRequest := ls.buildUserSearchRequest(cfg,filter)

    // Connect & bind as the service account
    ldapConn, err := ls.connectAndBindAdmin(cfg)
    if err != nil {
        return nil, err
    }
    defer ldapConn.Close()

    // Perform the search
    return ldapConn.Search(searchRequest)
}

// emailSearchResult returns the search result for the given email.
func (ls *LdapService) emailSearchResult(cfg *config.Ldap,email string) (*ldap.SearchResult, error) {
    filter := ls.filterField(ls.fieldEmail(cfg), email)
    searchRequest := ls.buildUserSearchRequest(cfg,filter)

    ldapConn, err := ls.connectAndBindAdmin(cfg)
    if err != nil {
        return nil, err
    }
    defer ldapConn.Close()

    return ldapConn.Search(searchRequest)
}

// buildUserSearchRequest constructs an LDAP SearchRequest for users given a filter.
func (ls *LdapService) buildUserSearchRequest(cfg *config.Ldap,filter string) *ldap.SearchRequest {
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
    }
}

// userResultToLdapUser maps an *ldap.Entry to our LdapUser struct.
func (ls *LdapService) userResultToLdapUser(cfg *config.Ldap,entry *ldap.Entry) *LdapUser {
    return &LdapUser{
        Dn:        entry.DN,
        Username:  entry.GetAttributeValue(ls.fieldUsername(cfg)),
        Email:     entry.GetAttributeValue(ls.fieldEmail(cfg)),
        FirstName: entry.GetAttributeValue(ls.fieldFirstName(cfg)),
        LastName:  entry.GetAttributeValue(ls.fieldLastName(cfg)),
    }
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

// baseDnUser returns the user-specific base DN or the global base DN if none is set.
func (ls *LdapService) baseDnUser(cfg *config.Ldap) string {
    if cfg.User.UserBaseDn == "" {
        return cfg.BaseDn
    }
    return cfg.User.UserBaseDn
}

// baseDnGroup returns the group-specific base DN or the global base DN if none is set.
func (ls *LdapService) baseDnGroup(cfg *config.Ldap) string {
    if cfg.Group.GroupBaseDn == "" {
        return cfg.BaseDn
    }
    return cfg.Group.GroupBaseDn
}