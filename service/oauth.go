package service

import (
	"Gwen/global"
	"Gwen/model"
	"Gwen/utils"
	"context"
	"encoding/json"
	"errors"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
	"gorm.io/gorm"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"sync"
	"time"
)

type OauthService struct {
}

type GithubUserdata struct {
	AvatarUrl         string      `json:"avatar_url"`
	Bio               string      `json:"bio"`
	Blog              string      `json:"blog"`
	Collaborators     int         `json:"collaborators"`
	Company           interface{} `json:"company"`
	CreatedAt         time.Time   `json:"created_at"`
	DiskUsage         int         `json:"disk_usage"`
	Email             interface{} `json:"email"`
	EventsUrl         string      `json:"events_url"`
	Followers         int         `json:"followers"`
	FollowersUrl      string      `json:"followers_url"`
	Following         int         `json:"following"`
	FollowingUrl      string      `json:"following_url"`
	GistsUrl          string      `json:"gists_url"`
	GravatarId        string      `json:"gravatar_id"`
	Hireable          interface{} `json:"hireable"`
	HtmlUrl           string      `json:"html_url"`
	Id                int         `json:"id"`
	Location          interface{} `json:"location"`
	Login             string      `json:"login"`
	Name              string      `json:"name"`
	NodeId            string      `json:"node_id"`
	NotificationEmail interface{} `json:"notification_email"`
	OrganizationsUrl  string      `json:"organizations_url"`
	OwnedPrivateRepos int         `json:"owned_private_repos"`
	Plan              struct {
		Collaborators int    `json:"collaborators"`
		Name          string `json:"name"`
		PrivateRepos  int    `json:"private_repos"`
		Space         int    `json:"space"`
	} `json:"plan"`
	PrivateGists      int    `json:"private_gists"`
	PublicGists       int    `json:"public_gists"`
	PublicRepos       int    `json:"public_repos"`
	ReceivedEventsUrl string `json:"received_events_url"`
	ReposUrl          string `json:"repos_url"`
	SiteAdmin         bool   `json:"site_admin"`
	StarredUrl        string `json:"starred_url"`
	SubscriptionsUrl  string `json:"subscriptions_url"`
	TotalPrivateRepos int    `json:"total_private_repos"`
	//TwitterUsername         interface{} `json:"twitter_username"`
	TwoFactorAuthentication bool      `json:"two_factor_authentication"`
	Type                    string    `json:"type"`
	UpdatedAt               time.Time `json:"updated_at"`
	Url                     string    `json:"url"`
}
type GoogleUserdata struct {
	Email         string `json:"email"`
	FamilyName    string `json:"family_name"`
	GivenName     string `json:"given_name"`
	Id            string `json:"id"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
	VerifiedEmail bool   `json:"verified_email"`
}
type OauthCacheItem struct {
	UserId      uint   `json:"user_id"`
	Id          string `json:"id"` //rustdesk的设备ID
	Op          string `json:"op"`
	Action      string `json:"action"`
	Uuid        string `json:"uuid"`
	DeviceName  string `json:"device_name"`
	DeviceOs    string `json:"device_os"`
	DeviceType  string `json:"device_type"`
	ThirdOpenId string `json:"third_open_id"`
	ThirdName   string `json:"third_name"`
	ThirdEmail  string `json:"third_email"`
}

var OauthCache = &sync.Map{}

const (
	OauthActionTypeLogin = "login"
	OauthActionTypeBind  = "bind"
)

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

	if op == model.OauthTypeWebauth {
		url = global.Config.Rustdesk.ApiServer + "/_admin/#/oauth/" + code
		//url = "http://localhost:8888/_admin/#/oauth/" + code
		return nil, code, url
	}
	err, conf := os.GetOauthConfig(op)
	if err == nil {
		return err, code, conf.AuthCodeURL(code)
	}

	return err, code, ""
}

// GetOauthConfig 获取配置
func (os *OauthService) GetOauthConfig(op string) (error, *oauth2.Config) {
	if op == model.OauthTypeGithub {
		g := os.InfoByOp(model.OauthTypeGithub)
		if g.Id == 0 || g.ClientId == "" || g.ClientSecret == "" || g.RedirectUrl == "" {
			return errors.New("ConfigNotFound"), nil
		}
		return nil, &oauth2.Config{
			ClientID:     g.ClientId,
			ClientSecret: g.ClientSecret,
			RedirectURL:  g.RedirectUrl,
			Endpoint:     github.Endpoint,
			Scopes:       []string{"read:user", "user:email"},
		}
	}
	if op == model.OauthTypeGoogle {
		g := os.InfoByOp(model.OauthTypeGoogle)
		if g.Id == 0 || g.ClientId == "" || g.ClientSecret == "" || g.RedirectUrl == "" {
			return errors.New("ConfigNotFound"), nil
		}
		return nil, &oauth2.Config{
			ClientID:     g.ClientId,
			ClientSecret: g.ClientSecret,
			RedirectURL:  g.RedirectUrl,
			Endpoint:     google.Endpoint,
			Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"},
		}
	}
	return errors.New("ConfigNotFound"), nil
}

func getHTTPClientWithProxy() *http.Client {
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

func (os *OauthService) GithubCallback(code string) (error error, userData *GithubUserdata) {
	err, oauthConfig := os.GetOauthConfig(model.OauthTypeGithub)
	if err != nil {
		return err, nil
	}

	// 使用代理配置创建 HTTP 客户端
	httpClient := getHTTPClientWithProxy()
	ctx := context.WithValue(context.Background(), oauth2.HTTPClient, httpClient)

	token, err := oauthConfig.Exchange(ctx, code)
	if err != nil {
		global.Logger.Warn("oauthConfig.Exchange() failed: ", err)
		error = errors.New("GetOauthTokenError")
		return
	}

	// 使用带有代理的 HTTP 客户端获取用户信息
	client := oauthConfig.Client(ctx, token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		global.Logger.Warn("failed getting user info: ", err)
		error = errors.New("GetOauthUserInfoError")
		return
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			global.Logger.Warn("failed closing response body: ", err)
		}
	}(resp.Body)

	// 解析用户信息
	if err = json.NewDecoder(resp.Body).Decode(&userData); err != nil {
		global.Logger.Warn("failed decoding user info: ", err)
		error = errors.New("DecodeOauthUserInfoError")
		return
	}
	return
}

func (os *OauthService) GoogleCallback(code string) (error error, userData *GoogleUserdata) {
	err, oauthConfig := os.GetOauthConfig(model.OauthTypeGoogle)
	if err != nil {
		return err, nil
	}

	// 使用代理配置创建 HTTP 客户端
	httpClient := getHTTPClientWithProxy()
	ctx := context.WithValue(context.Background(), oauth2.HTTPClient, httpClient)

	token, err := oauthConfig.Exchange(ctx, code)
	if err != nil {
		global.Logger.Warn("oauthConfig.Exchange() failed: ", err)
		error = errors.New("GetOauthTokenError")
		return
	}

	// 使用带有代理的 HTTP 客户端获取用户信息
	client := oauthConfig.Client(ctx, token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		global.Logger.Warn("failed getting user info: ", err)
		error = errors.New("GetOauthUserInfoError")
		return
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			global.Logger.Warn("failed closing response body: ", err)
		}
	}(resp.Body)

	// 解析用户信息
	if err = json.NewDecoder(resp.Body).Decode(&userData); err != nil {
		global.Logger.Warn("failed decoding user info: ", err)
		error = errors.New("DecodeOauthUserInfoError")
		return
	}
	return
}

func (os *OauthService) UserThirdInfo(op, openid string) *model.UserThird {
	ut := &model.UserThird{}
	global.DB.Where("open_id = ? and third_type = ?", openid, op).First(ut)
	return ut
}

func (os *OauthService) BindGithubUser(openid, username string, userId uint) error {
	return os.BindOauthUser(model.OauthTypeGithub, openid, username, userId)
}

func (os *OauthService) BindGoogleUser(email, username string, userId uint) error {
	return os.BindOauthUser(model.OauthTypeGoogle, email, username, userId)
}
func (os *OauthService) BindOauthUser(thirdType, openid, username string, userId uint) error {
	utr := &model.UserThird{
		OpenId:    openid,
		ThirdType: thirdType,
		ThirdName: username,
		UserId:    userId,
	}
	return global.DB.Create(utr).Error
}

func (os *OauthService) UnBindGithubUser(userid uint) error {
	return os.UnBindThird(model.OauthTypeGithub, userid)
}
func (os *OauthService) UnBindGoogleUser(userid uint) error {
	return os.UnBindThird(model.OauthTypeGoogle, userid)
}
func (os *OauthService) UnBindThird(thirdType string, userid uint) error {
	return global.DB.Where("user_id = ? and third_type = ?", userid, thirdType).Delete(&model.UserThird{}).Error
}

// InfoById 根据id取用户信息
func (os *OauthService) InfoById(id uint) *model.Oauth {
	u := &model.Oauth{}
	global.DB.Where("id = ?", id).First(u)
	return u
}

// InfoByOp 根据op取用户信息
func (os *OauthService) InfoByOp(op string) *model.Oauth {
	u := &model.Oauth{}
	global.DB.Where("op = ?", op).First(u)
	return u
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

// Create 创建
func (os *OauthService) Create(u *model.Oauth) error {
	res := global.DB.Create(u).Error
	return res
}
func (os *OauthService) Delete(u *model.Oauth) error {
	return global.DB.Delete(u).Error
}

// Update 更新
func (os *OauthService) Update(u *model.Oauth) error {
	return global.DB.Model(u).Updates(u).Error
}
