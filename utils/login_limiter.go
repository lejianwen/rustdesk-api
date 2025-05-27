package utils

import (
	"errors"
	"sync"
	"time"
)

// 安全策略配置
type SecurityPolicy struct {
	CaptchaThreshold int // 尝试失败次数达到验证码阈值，小于0表示不启用, 0表示强制启用
	BanThreshold     int // 尝试失败次数达到封禁阈值，为0表示不启用
	AttemptsWindow   time.Duration
	BanDuration      time.Duration
}

// 验证码提供者接口
type CaptchaProvider interface {
	Generate() (id string, content string, answer string, err error)
	//Validate(ip, code string) bool
	Expiration() time.Duration           // 验证码过期时间, 应该小于 AttemptsWindow
	Draw(content string) (string, error) // 绘制验证码
}

// 验证码元数据
type CaptchaMeta struct {
	Id        string
	Content   string
	Answer    string
	ExpiresAt time.Time
}

// IP封禁记录
type BanRecord struct {
	ExpiresAt time.Time
	Reason    string
}

// 登录限制器
type LoginLimiter struct {
	mu          sync.Mutex
	policy      SecurityPolicy
	attempts    map[string][]time.Time //
	captchas    map[string]CaptchaMeta
	bannedIPs   map[string]BanRecord
	provider    CaptchaProvider
	cleanupStop chan struct{}
}

var defaultSecurityPolicy = SecurityPolicy{
	CaptchaThreshold: 3,
	BanThreshold:     5,
	AttemptsWindow:   5 * time.Minute,
	BanDuration:      30 * time.Minute,
}

func NewLoginLimiter(policy SecurityPolicy) *LoginLimiter {
	// 设置默认值
	if policy.AttemptsWindow == 0 {
		policy.AttemptsWindow = 5 * time.Minute
	}
	if policy.BanDuration == 0 {
		policy.BanDuration = 30 * time.Minute
	}

	ll := &LoginLimiter{
		policy:      policy,
		attempts:    make(map[string][]time.Time),
		captchas:    make(map[string]CaptchaMeta),
		bannedIPs:   make(map[string]BanRecord),
		cleanupStop: make(chan struct{}),
	}
	go ll.cleanupRoutine()
	return ll
}

// 注册验证码提供者
func (ll *LoginLimiter) RegisterProvider(p CaptchaProvider) {
	ll.mu.Lock()
	defer ll.mu.Unlock()
	ll.provider = p
}

// isDisabled 检查是否禁用登录限制
func (ll *LoginLimiter) isDisabled() bool {
	return ll.policy.CaptchaThreshold < 0 && ll.policy.BanThreshold == 0
}

// 记录登录失败尝试
func (ll *LoginLimiter) RecordFailedAttempt(ip string) {
	if ll.isDisabled() {
		return
	}
	ll.mu.Lock()
	defer ll.mu.Unlock()

	if banned, _ := ll.isBanned(ip); banned {
		return
	}

	now := time.Now()
	windowStart := now.Add(-ll.policy.AttemptsWindow)

	// 清理过期尝试
	validAttempts := ll.pruneAttempts(ip, windowStart)

	// 记录新尝试
	validAttempts = append(validAttempts, now)
	ll.attempts[ip] = validAttempts

	// 检查封禁条件
	if ll.policy.BanThreshold > 0 && len(validAttempts) >= ll.policy.BanThreshold {
		ll.banIP(ip, "excessive failed attempts")
		return
	}

	return
}

// 生成验证码
func (ll *LoginLimiter) RequireCaptcha() (error, CaptchaMeta) {
	ll.mu.Lock()
	defer ll.mu.Unlock()

	if ll.provider == nil {
		return errors.New("no captcha provider available"), CaptchaMeta{}
	}

	id, content, answer, err := ll.provider.Generate()
	if err != nil {
		return err, CaptchaMeta{}
	}

	// 存储验证码
	ll.captchas[id] = CaptchaMeta{
		Id:        id,
		Content:   content,
		Answer:    answer,
		ExpiresAt: time.Now().Add(ll.provider.Expiration()),
	}

	return nil, ll.captchas[id]
}

// 验证验证码
func (ll *LoginLimiter) VerifyCaptcha(id, answer string) bool {
	ll.mu.Lock()
	defer ll.mu.Unlock()

	// 查找匹配验证码
	if ll.provider == nil {
		return false
	}

	// 获取并验证验证码
	captcha, exists := ll.captchas[id]
	if !exists {
		return false
	}

	// 清理过期验证码
	if time.Now().After(captcha.ExpiresAt) {
		delete(ll.captchas, id)
		return false
	}

	// 验证并清理状态
	if answer == captcha.Answer {
		delete(ll.captchas, id)
		return true
	}

	return false
}

func (ll *LoginLimiter) DrawCaptcha(content string) (err error, str string) {
	str, err = ll.provider.Draw(content)
	return
}

// 清除记录窗口
func (ll *LoginLimiter) RemoveAttempts(ip string) {
	ll.mu.Lock()
	defer ll.mu.Unlock()

	_, exists := ll.attempts[ip]
	if exists {
		delete(ll.attempts, ip)
	}
}

// CheckSecurityStatus 检查安全状态
func (ll *LoginLimiter) CheckSecurityStatus(ip string) (banned bool, captchaRequired bool) {
	if ll.isDisabled() {
		return
	}
	ll.mu.Lock()
	defer ll.mu.Unlock()

	// 检查封禁状态
	if banned, _ = ll.isBanned(ip); banned {
		return
	}

	// 清理过期数据
	ll.pruneAttempts(ip, time.Now().Add(-ll.policy.AttemptsWindow))

	// 检查验证码要求
	captchaRequired = len(ll.attempts[ip]) >= ll.policy.CaptchaThreshold

	return
}

// 后台清理任务
func (ll *LoginLimiter) cleanupRoutine() {
	ticker := time.NewTicker(1 * time.Minute)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			ll.cleanupExpired()
		case <-ll.cleanupStop:
			return
		}
	}
}

// 内部工具方法
func (ll *LoginLimiter) isBanned(ip string) (bool, BanRecord) {
	record, exists := ll.bannedIPs[ip]
	if !exists {
		return false, BanRecord{}
	}
	if time.Now().After(record.ExpiresAt) {
		delete(ll.bannedIPs, ip)
		return false, BanRecord{}
	}
	return true, record
}

func (ll *LoginLimiter) banIP(ip, reason string) {
	ll.bannedIPs[ip] = BanRecord{
		ExpiresAt: time.Now().Add(ll.policy.BanDuration),
		Reason:    reason,
	}
	delete(ll.attempts, ip)
	delete(ll.captchas, ip)
}

func (ll *LoginLimiter) pruneAttempts(ip string, cutoff time.Time) []time.Time {
	var valid []time.Time
	for _, t := range ll.attempts[ip] {
		if t.After(cutoff) {
			valid = append(valid, t)
		}
	}
	if len(valid) == 0 {
		delete(ll.attempts, ip)
	} else {
		ll.attempts[ip] = valid
	}
	return valid
}

func (ll *LoginLimiter) pruneCaptchas(id string) {
	if captcha, exists := ll.captchas[id]; exists {
		if time.Now().After(captcha.ExpiresAt) {
			delete(ll.captchas, id)
		}
	}
}

func (ll *LoginLimiter) cleanupExpired() {
	ll.mu.Lock()
	defer ll.mu.Unlock()

	now := time.Now()

	// 清理封禁记录
	for ip, record := range ll.bannedIPs {
		if now.After(record.ExpiresAt) {
			delete(ll.bannedIPs, ip)
		}
	}

	// 清理尝试记录
	for ip := range ll.attempts {
		ll.pruneAttempts(ip, now.Add(-ll.policy.AttemptsWindow))
	}

	// 清理验证码
	for id := range ll.captchas {
		ll.pruneCaptchas(id)
	}
}
