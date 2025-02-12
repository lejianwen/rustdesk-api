package service

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/lejianwen/rustdesk-api/v2/global"
	"github.com/lejianwen/rustdesk-api/v2/model"
	"github.com/lejianwen/rustdesk-api/v2/utils"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	// "golang.org/x/oauth2/google"
	"gorm.io/gorm"
	// "io"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"sync"
	"time"
)

type OauthService struct {
}

// Define a struct to parse the .well-known/openid-configuration response
type OidcEndpoint struct {
	Issuer   string `json:"issuer"`
	AuthURL  string `json:"authorization_endpoint"`
	TokenURL string `json:"token_endpoint"`
	UserInfo string `json:"userinfo_endpoint"`
}

type OauthCacheItem struct {
	UserId     uint   `json:"user_id"`
	Id         string `json:"id"` //rustdesk的设备ID
	Op         string `json:"op"`
	Action     string `json:"action"`
	Uuid       string `json:"uuid"`
	DeviceName string `json:"device_name"`
	DeviceOs   string `json:"device_os"`
	DeviceType string `json:"device_type"`
	OpenId     string `json:"open_id"`
	Username   string `json:"username"`
	Name       string `json:"name"`
	Email      string `json:"email"`
}

func (oci *OauthCacheItem) ToOauthUser() *model.OauthUser {
	return &model.OauthUser{
		OpenId:   oci.OpenId,
		Username: oci.Username,
		Name:     oci.Name,
		Email:    oci.Email,
	}
}

var OauthCache = &sync.Map{}

const (
	OauthActionTypeLogin = "login"
	OauthActionTypeBind  = "bind"
)

func (oci *OauthCacheItem) UpdateFromOauthUser(oauthUser *model.OauthUser) {
	oci.OpenId = oauthUser.OpenId
	oci.Username = oauthUser.Username
	oci.Name = oauthUser.Name
	oci.Email = oauthUser.Email
}

func (os *OauthService) GetOauthCache(key string) *OauthCacheItem {
	v, ok := OauthCache.Load(key)
	if !ok {
		return nil
	}
	return v.(*OauthCacheItem)
}

func (os *OauthService) SetOauthCache(key string, item *OauthCacheItem, expire uint) {
	OauthCache.Store(key, item)
	if expire > 0 {
		go func() {
			time.Sleep(time.Duration(expire) * time.Second)
			os.DeleteOauthCache(key)
		}()
	}
}

func (os *OauthService) DeleteOauthCache(key string) {
	OauthCache.Delete(key)
}

func (os *OauthService) BeginAuth(op string) (error error, code, url string) {
	code = utils.RandomString(10) + strconv.FormatInt(time.Now().Unix(), 10)
	if op == string(model.OauthTypeWebauth) {
		url = global.Config.Rustdesk.ApiServer + "/_admin/#/oauth/" + code
		//url = "http://localhost:8888/_admin/#/oauth/" + code
		return nil, code, url
	}
	err, _, oauthConfig := os.GetOauthConfig(op)
	if err == nil {
		return err, code, oauthConfig.AuthCodeURL(code)
	}

	return err, code, ""
}

// Method to fetch OIDC configuration dynamically
func (os *OauthService) FetchOidcEndpoint(issuer string) (error, OidcEndpoint) {
	configURL := strings.TrimSuffix(issuer, "/") + "/.well-known/openid-configuration"

	// Get the HTTP client (with or without proxy based on configuration)
	client := getHTTPClientWithProxy()

	resp, err := client.Get(configURL)
	if err != nil {
		return errors.New("failed to fetch OIDC configuration"), OidcEndpoint{}
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return errors.New("OIDC configuration not found, status code: %d"), OidcEndpoint{}
	}

	var endpoint OidcEndpoint
	if err := json.NewDecoder(resp.Body).Decode(&endpoint); err != nil {
		return errors.New("failed to parse OIDC configuration"), OidcEndpoint{}
	}

	return nil, endpoint
}

func (os *OauthService) FetchOidcEndpointByOp(op string) (error, OidcEndpoint) {
	oauthInfo := os.InfoByOp(op)
	if oauthInfo.Issuer == "" {
		return errors.New("issuer is empty"), OidcEndpoint{}
	}
	return os.FetchOidcEndpoint(oauthInfo.Issuer)
}

// GetOauthConfig retrieves the OAuth2 configuration based on the provider name
func (os *OauthService) GetOauthConfig(op string) (err error, oauthInfo *model.Oauth, oauthConfig *oauth2.Config) {
	err, oauthInfo, oauthConfig = os.getOauthConfigGeneral(op)
	if err != nil {
		return err, nil, nil
	}
	// Maybe should validate the oauthConfig here
	oauthType := oauthInfo.OauthType
	err = model.ValidateOauthType(oauthType)
	if err != nil {
		return err, nil, nil
	}
	switch oauthType {
	case model.OauthTypeGithub:
		oauthConfig.Endpoint = github.Endpoint
		oauthConfig.Scopes = []string{"read:user", "user:email"}
	case model.OauthTypeOidc, model.OauthTypeGoogle:
		var endpoint OidcEndpoint
		err, endpoint = os.FetchOidcEndpoint(oauthInfo.Issuer)
		if err != nil {
			return err, nil, nil
		}
		oauthConfig.Endpoint = oauth2.Endpoint{AuthURL: endpoint.AuthURL, TokenURL: endpoint.TokenURL}
		oauthConfig.Scopes = os.constructScopes(oauthInfo.Scopes)
	default:
		return errors.New("unsupported OAuth type"), nil, nil
	}
	return nil, oauthInfo, oauthConfig
}

// GetOauthConfig retrieves the OAuth2 configuration based on the provider name
func (os *OauthService) getOauthConfigGeneral(op string) (err error, oauthInfo *model.Oauth, oauthConfig *oauth2.Config) {
	oauthInfo = os.InfoByOp(op)
	if oauthInfo.Id == 0 || oauthInfo.ClientId == "" || oauthInfo.ClientSecret == "" {
		return errors.New("ConfigNotFound"), nil, nil
	}
	// If the redirect URL is empty, use the default redirect URL
	if oauthInfo.RedirectUrl == "" {
		oauthInfo.RedirectUrl = global.Config.Rustdesk.ApiServer + "/api/oidc/callback"
	}
	return nil, oauthInfo, &oauth2.Config{
		ClientID:     oauthInfo.ClientId,
		ClientSecret: oauthInfo.ClientSecret,
		RedirectURL:  oauthInfo.RedirectUrl,
	}
}

func getHTTPClientWithProxy() *http.Client {
	//todo add timeout
	if global.Config.Proxy.Enable {
		if global.Config.Proxy.Host == "" {
			global.Logger.Warn("Proxy is enabled but proxy host is empty.")
			return http.DefaultClient
		}
		proxyURL, err := url.Parse(global.Config.Proxy.Host)
		if err != nil {
			global.Logger.Warn("Invalid proxy URL: ", err)
			return http.DefaultClient
		}
		transport := &http.Transport{
			Proxy: http.ProxyURL(proxyURL),
		}
		return &http.Client{Transport: transport}
	}
	return http.DefaultClient
}

func (os *OauthService) callbackBase(oauthConfig *oauth2.Config, code string, userEndpoint string, userData interface{}) (err error, client *http.Client) {

	// 设置代理客户端
	httpClient := getHTTPClientWithProxy()
	ctx := context.WithValue(context.Background(), oauth2.HTTPClient, httpClient)

	// 使用 code 换取 token
	var token *oauth2.Token
	token, err = oauthConfig.Exchange(ctx, code)
	if err != nil {
		global.Logger.Warn("oauthConfig.Exchange() failed: ", err)
		return errors.New("GetOauthTokenError"), nil
	}

	// 获取用户信息
	client = oauthConfig.Client(ctx, token)
	resp, err := client.Get(userEndpoint)
	if err != nil {
		global.Logger.Warn("failed getting user info: ", err)
		return errors.New("GetOauthUserInfoError"), nil
	}
	defer func() {
		if closeErr := resp.Body.Close(); closeErr != nil {
			global.Logger.Warn("failed closing response body: ", closeErr)
		}
	}()

	// 解析用户信息
	if err = json.NewDecoder(resp.Body).Decode(userData); err != nil {
		global.Logger.Warn("failed decoding user info: ", err)
		return errors.New("DecodeOauthUserInfoError"), nil
	}

	return nil, client
}

// githubCallback github回调
func (os *OauthService) githubCallback(oauthConfig *oauth2.Config, code string) (error, *model.OauthUser) {
	var user = &model.GithubUser{}
	err, client := os.callbackBase(oauthConfig, code, model.UserEndpointGithub, user)
	if err != nil {
		return err, nil
	}
	err = os.getGithubPrimaryEmail(client, user)
	if err != nil {
		return err, nil
	}
	return nil, user.ToOauthUser()
}

// oidcCallback oidc回调, 通过code获取用户信息
func (os *OauthService) oidcCallback(oauthConfig *oauth2.Config, code string, userInfoEndpoint string) (error, *model.OauthUser) {
	var user = &model.OidcUser{}
	if err, _ := os.callbackBase(oauthConfig, code, userInfoEndpoint, user); err != nil {
		return err, nil
	}
	return nil, user.ToOauthUser()
}

// Callback: Get user information by code and op(Oauth provider)
func (os *OauthService) Callback(code string, op string) (err error, oauthUser *model.OauthUser) {
	var oauthInfo *model.Oauth
	var oauthConfig *oauth2.Config
	err, oauthInfo, oauthConfig = os.GetOauthConfig(op)
	// oauthType is already validated in GetOauthConfig
	if err != nil {
		return err, nil
	}
	oauthType := oauthInfo.OauthType
	switch oauthType {
	case model.OauthTypeGithub:
		err, oauthUser = os.githubCallback(oauthConfig, code)
	case model.OauthTypeOidc, model.OauthTypeGoogle:
		err, endpoint := os.FetchOidcEndpoint(oauthInfo.Issuer)
		if err != nil {
			return err, nil
		}
		err, oauthUser = os.oidcCallback(oauthConfig, code, endpoint.UserInfo)
	default:
		return errors.New("unsupported OAuth type"), nil
	}
	return err, oauthUser
}

func (os *OauthService) UserThirdInfo(op string, openId string) *model.UserThird {
	ut := &model.UserThird{}
	global.DB.Where("open_id = ? and op = ?", openId, op).First(ut)
	return ut
}

// BindOauthUser: Bind third party account
func (os *OauthService) BindOauthUser(userId uint, oauthUser *model.OauthUser, op string) error {
	utr := &model.UserThird{}
	err, oauthType := os.GetTypeByOp(op)
	if err != nil {
		return err
	}
	utr.FromOauthUser(userId, oauthUser, oauthType, op)
	return global.DB.Create(utr).Error
}

// UnBindOauthUser: Unbind third party account
func (os *OauthService) UnBindOauthUser(userId uint, op string) error {
	return os.UnBindThird(op, userId)
}

// UnBindThird: Unbind third party account
func (os *OauthService) UnBindThird(op string, userId uint) error {
	return global.DB.Where("user_id = ? and op = ?", userId, op).Delete(&model.UserThird{}).Error
}

// DeleteUserByUserId: When user is deleted, delete all third party bindings
func (os *OauthService) DeleteUserByUserId(userId uint) error {
	return global.DB.Where("user_id = ?", userId).Delete(&model.UserThird{}).Error
}

// InfoById 根据id获取Oauth信息
func (os *OauthService) InfoById(id uint) *model.Oauth {
	oauthInfo := &model.Oauth{}
	global.DB.Where("id = ?", id).First(oauthInfo)
	return oauthInfo
}

// InfoByOp 根据op获取Oauth信息
func (os *OauthService) InfoByOp(op string) *model.Oauth {
	oauthInfo := &model.Oauth{}
	global.DB.Where("op = ?", op).First(oauthInfo)
	return oauthInfo
}

// Helper function to get scopes by operation
func (os *OauthService) getScopesByOp(op string) []string {
	scopes := os.InfoByOp(op).Scopes
	return os.constructScopes(scopes)
}

// Helper function to construct scopes
func (os *OauthService) constructScopes(scopes string) []string {
	scopes = strings.TrimSpace(scopes)
	if scopes == "" {
		scopes = model.OIDC_DEFAULT_SCOPES
	}
	return strings.Split(scopes, ",")
}

func (os *OauthService) List(page, pageSize uint, where func(tx *gorm.DB)) (res *model.OauthList) {
	res = &model.OauthList{}
	res.Page = int64(page)
	res.PageSize = int64(pageSize)
	tx := global.DB.Model(&model.Oauth{})
	if where != nil {
		where(tx)
	}
	tx.Count(&res.Total)
	tx.Scopes(Paginate(page, pageSize))
	tx.Find(&res.Oauths)
	return
}

// GetTypeByOp 根据op获取OauthType
func (os *OauthService) GetTypeByOp(op string) (error, string) {
	oauthInfo := &model.Oauth{}
	if global.DB.Where("op = ?", op).First(oauthInfo).Error != nil {
		return fmt.Errorf("OAuth provider with op '%s' not found", op), ""
	}
	return nil, oauthInfo.OauthType
}

// ValidateOauthProvider 验证Oauth提供者是否正确
func (os *OauthService) ValidateOauthProvider(op string) error {
	if !os.IsOauthProviderExist(op) {
		return fmt.Errorf("OAuth provider with op '%s' not found", op)
	}
	return nil
}

// IsOauthProviderExist 验证Oauth提供者是否存在
func (os *OauthService) IsOauthProviderExist(op string) bool {
	oauthInfo := &model.Oauth{}
	// 使用 Gorm 的 Take 方法查找符合条件的记录
	if err := global.DB.Where("op = ?", op).Take(oauthInfo).Error; err != nil {
		return false
	}
	return true
}

// Create 创建
func (os *OauthService) Create(oauthInfo *model.Oauth) error {
	err := oauthInfo.FormatOauthInfo()
	if err != nil {
		return err
	}
	res := global.DB.Create(oauthInfo).Error
	return res
}
func (os *OauthService) Delete(oauthInfo *model.Oauth) error {
	return global.DB.Delete(oauthInfo).Error
}

// Update 更新
func (os *OauthService) Update(oauthInfo *model.Oauth) error {
	err := oauthInfo.FormatOauthInfo()
	if err != nil {
		return err
	}
	return global.DB.Model(oauthInfo).Updates(oauthInfo).Error
}

// GetOauthProviders 获取所有的provider
func (os *OauthService) GetOauthProviders() []string {
	var res []string
	global.DB.Model(&model.Oauth{}).Pluck("op", &res)
	return res
}

// getGithubPrimaryEmail: Get the primary email of the user from Github
func (os *OauthService) getGithubPrimaryEmail(client *http.Client, githubUser *model.GithubUser) error {
	// the client is already set with the token
	resp, err := client.Get("https://api.github.com/user/emails")
	if err != nil {
		return fmt.Errorf("failed to fetch emails: %w", err)
	}
	defer resp.Body.Close()

	// check the response status code
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to fetch emails: %s", resp.Status)
	}

	// decode the response
	var emails []struct {
		Email    string `json:"email"`
		Primary  bool   `json:"primary"`
		Verified bool   `json:"verified"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&emails); err != nil {
		return fmt.Errorf("failed to decode response: %w", err)
	}

	// find the primary verified email
	for _, e := range emails {
		if e.Primary && e.Verified {
			githubUser.Email = e.Email
			githubUser.VerifiedEmail = e.Verified
			return nil
		}
	}

	return fmt.Errorf("no primary verified email found")
}
