package admin

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lejianwen/rustdesk-api/v2/global"
	"github.com/lejianwen/rustdesk-api/v2/http/controller/api"
	"github.com/lejianwen/rustdesk-api/v2/http/request/admin"
	apiReq "github.com/lejianwen/rustdesk-api/v2/http/request/api"
	"github.com/lejianwen/rustdesk-api/v2/http/response"
	adResp "github.com/lejianwen/rustdesk-api/v2/http/response/admin"
	"github.com/lejianwen/rustdesk-api/v2/model"
	"github.com/lejianwen/rustdesk-api/v2/service"
	"github.com/mojocn/base64Captcha"
	"sync"
	"time"
)

type Login struct {
}

// Captcha 验证码结构
type Captcha struct {
	Id        string    `json:"id"`  // 验证码 ID
	B64       string    `json:"b64"` // base64 验证码
	Code      string    `json:"-"`   // 验证码内容
	ExpiresAt time.Time `json:"-"`   // 过期时间
}
type LoginLimiter struct {
	mu        sync.RWMutex
	failCount map[string]int       // 记录每个 IP 的失败次数
	timestamp map[string]time.Time // 记录每个 IP 的最后失败时间
	captchas  map[string]Captcha   // 每个 IP 的验证码
	threshold int                  // 失败阈值
	expiry    time.Duration        // 失败记录过期时间
}

func NewLoginLimiter(threshold int, expiry time.Duration) *LoginLimiter {
	return &LoginLimiter{
		failCount: make(map[string]int),
		timestamp: make(map[string]time.Time),
		captchas:  make(map[string]Captcha),
		threshold: threshold,
		expiry:    expiry,
	}
}

// RecordFailure 记录登录失败
func (l *LoginLimiter) RecordFailure(ip string) {
	l.mu.Lock()
	defer l.mu.Unlock()

	// 如果该 IP 的记录已经过期，重置计数
	if lastTime, exists := l.timestamp[ip]; exists && time.Since(lastTime) > l.expiry {
		l.failCount[ip] = 0
	}

	// 更新失败次数和时间戳
	l.failCount[ip]++
	l.timestamp[ip] = time.Now()
}

// NeedsCaptcha 检查是否需要验证码
func (l *LoginLimiter) NeedsCaptcha(ip string) bool {
	l.mu.RLock()
	defer l.mu.RUnlock()

	// 检查记录是否存在且未过期
	if lastTime, exists := l.timestamp[ip]; exists && time.Since(lastTime) <= l.expiry {
		return l.failCount[ip] >= l.threshold
	}
	return false
}

// GenerateCaptcha 为指定 IP 生成验证码
func (l *LoginLimiter) GenerateCaptcha(ip string) Captcha {
	l.mu.Lock()
	defer l.mu.Unlock()

	capd := base64Captcha.NewDriverString(50, 150, 5, 10, 4, "1234567890abcdefghijklmnopqrstuvwxyz", nil, nil, nil)
	b64cap := base64Captcha.NewCaptcha(capd, base64Captcha.DefaultMemStore)
	id, b64s, answer, err := b64cap.Generate()
	if err != nil {
		global.Logger.Error("Generate captcha failed: " + err.Error())
		return Captcha{}
	}
	// 保存验证码到对应 IP
	l.captchas[ip] = Captcha{
		Id:        id,
		B64:       b64s,
		Code:      answer,
		ExpiresAt: time.Now().Add(5 * time.Minute),
	}
	return l.captchas[ip]
}

// VerifyCaptcha 验证指定 IP 的验证码
func (l *LoginLimiter) VerifyCaptcha(ip, code string) bool {
	l.mu.RLock()
	defer l.mu.RUnlock()

	// 检查验证码是否存在且未过期
	if captcha, exists := l.captchas[ip]; exists && time.Now().Before(captcha.ExpiresAt) {
		return captcha.Code == code
	}
	return false
}

// RemoveCaptcha 移除指定 IP 的验证码
func (l *LoginLimiter) RemoveCaptcha(ip string) {
	l.mu.Lock()
	defer l.mu.Unlock()

	delete(l.captchas, ip)
}

// CleanupExpired 清理过期的记录
func (l *LoginLimiter) CleanupExpired() {
	l.mu.Lock()
	defer l.mu.Unlock()

	now := time.Now()
	for ip, lastTime := range l.timestamp {
		if now.Sub(lastTime) > l.expiry {
			delete(l.failCount, ip)
			delete(l.timestamp, ip)
			delete(l.captchas, ip)
		}
	}
}

func (l *LoginLimiter) RemoveRecord(ip string) {
	l.mu.Lock()
	defer l.mu.Unlock()

	delete(l.failCount, ip)
	delete(l.timestamp, ip)
	delete(l.captchas, ip)
}

var loginLimiter = NewLoginLimiter(3, 5*time.Minute)

// Login 登录
// @Tags 登录
// @Summary 登录
// @Description 登录
// @Accept  json
// @Produce  json
// @Param body body admin.Login true "登录信息"
// @Success 200 {object} response.Response{data=adResp.LoginPayload}
// @Failure 500 {object} response.Response
// @Router /admin/login [post]
// @Security token
func (ct *Login) Login(c *gin.Context) {
	if global.Config.App.DisablePwdLogin {
		response.Fail(c, 101, response.TranslateMsg(c, "PwdLoginDisabled"))
		return
	}
	f := &admin.Login{}
	err := c.ShouldBindJSON(f)
	clientIp := c.ClientIP()
	if err != nil {
		global.Logger.Warn(fmt.Sprintf("Login Fail: %s %s %s", "ParamsError", c.RemoteIP(), clientIp))
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}

	errList := global.Validator.ValidStruct(c, f)
	if len(errList) > 0 {
		global.Logger.Warn(fmt.Sprintf("Login Fail: %s %s %s", "ParamsError", c.RemoteIP(), clientIp))
		response.Fail(c, 101, errList[0])
		return
	}

	// 检查是否需要验证码
	if loginLimiter.NeedsCaptcha(clientIp) {
		if f.Captcha == "" || !loginLimiter.VerifyCaptcha(clientIp, f.Captcha) {
			response.Fail(c, 101, response.TranslateMsg(c, "CaptchaError"))
			return
		}
	}

	u := service.AllService.UserService.InfoByUsernamePassword(f.Username, f.Password)

	if u.Id == 0 {
		global.Logger.Warn(fmt.Sprintf("Login Fail: %s %s %s", "UsernameOrPasswordError", c.RemoteIP(), clientIp))
		loginLimiter.RecordFailure(clientIp)
		if loginLimiter.NeedsCaptcha(clientIp) {
			loginLimiter.RemoveCaptcha(clientIp)
		}
		response.Fail(c, 101, response.TranslateMsg(c, "UsernameOrPasswordError"))
		return
	}

	if !service.AllService.UserService.CheckUserEnable(u) {
		if loginLimiter.NeedsCaptcha(clientIp) {
			loginLimiter.RemoveCaptcha(clientIp)
		}
		response.Fail(c, 101, response.TranslateMsg(c, "UserDisabled"))
		return
	}

	ut := service.AllService.UserService.Login(u, &model.LoginLog{
		UserId:   u.Id,
		Client:   model.LoginLogClientWebAdmin,
		Uuid:     "", //must be empty
		Ip:       clientIp,
		Type:     model.LoginLogTypeAccount,
		Platform: f.Platform,
	})

	// 成功后清除记录
	loginLimiter.RemoveRecord(clientIp)

	// 清理过期记录
	go loginLimiter.CleanupExpired()

	responseLoginSuccess(c, u, ut.Token)
}
func (ct *Login) Captcha(c *gin.Context) {
	clientIp := c.ClientIP()
	if !loginLimiter.NeedsCaptcha(clientIp) {
		response.Fail(c, 101, response.TranslateMsg(c, "NoCaptchaRequired"))
		return
	}
	captcha := loginLimiter.GenerateCaptcha(clientIp)
	response.Success(c, gin.H{
		"captcha": captcha,
	})
}

// Logout 登出
// @Tags 登录
// @Summary 登出
// @Description 登出
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response
// @Failure 500 {object} response.Response
// @Router /admin/logout [post]
func (ct *Login) Logout(c *gin.Context) {
	u := service.AllService.UserService.CurUser(c)
	token, ok := c.Get("token")
	if ok {
		service.AllService.UserService.Logout(u, token.(string))
	}
	response.Success(c, nil)
}

// LoginOptions
// @Tags 登录
// @Summary 登录选项
// @Description 登录选项
// @Accept  json
// @Produce  json
// @Success 200 {object} []string
// @Failure 500 {object} response.ErrorResponse
// @Router /admin/login-options [post]
func (ct *Login) LoginOptions(c *gin.Context) {
	ip := c.ClientIP()
	ops := service.AllService.OauthService.GetOauthProviders()
	response.Success(c, gin.H{
		"ops":          ops,
		"register":     global.Config.App.Register,
		"need_captcha": loginLimiter.NeedsCaptcha(ip),
	})
}

// OidcAuth
// @Tags Oauth
// @Summary OidcAuth
// @Description OidcAuth
// @Accept  json
// @Produce  json
// @Router /admin/oidc/auth [post]
func (ct *Login) OidcAuth(c *gin.Context) {
	// o := &api.Oauth{}
	// o.OidcAuth(c)
	f := &apiReq.OidcAuthRequest{}
	err := c.ShouldBindJSON(f)
	if err != nil {
		response.Fail(c, 101, response.TranslateMsg(c, "ParamsError")+err.Error())
		return
	}

	err, state, verifier, nonce, url := service.AllService.OauthService.BeginAuth(f.Op)
	if err != nil {
		response.Error(c, response.TranslateMsg(c, err.Error()))
		return
	}

	service.AllService.OauthService.SetOauthCache(state, &service.OauthCacheItem{
		Action:     service.OauthActionTypeLogin,
		Op:         f.Op,
		Id:         f.Id,
		DeviceType: "webadmin",
		// DeviceOs: ct.Platform(c),
		DeviceOs: f.DeviceInfo.Os,
		Uuid:     f.Uuid,
		Verifier: verifier,
		Nonce:    nonce,
	}, 5*60)

	response.Success(c, gin.H{
		"code": state,
		"url":  url,
	})
}

// OidcAuthQuery
// @Tags Oauth
// @Summary OidcAuthQuery
// @Description OidcAuthQuery
// @Accept  json
// @Produce  json
// @Success 200 {object} response.Response{data=adResp.LoginPayload}
// @Failure 500 {object} response.Response
// @Router /admin/oidc/auth-query [get]
func (ct *Login) OidcAuthQuery(c *gin.Context) {
	o := &api.Oauth{}
	u, ut := o.OidcAuthQueryPre(c)
	if ut == nil {
		return
	}
	responseLoginSuccess(c, u, ut.Token)
}

func responseLoginSuccess(c *gin.Context, u *model.User, token string) {
	lp := &adResp.LoginPayload{}
	lp.FromUser(u)
	lp.Token = token
	lp.RouteNames = service.AllService.UserService.RouteNames(u)
	response.Success(c, lp)
}
