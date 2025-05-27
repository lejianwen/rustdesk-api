package utils

import (
	"fmt"
	"github.com/google/uuid"
	"testing"
	"time"
)

type MockCaptchaProvider struct{}

func (p *MockCaptchaProvider) Generate() (string, string, string, error) {
	id := uuid.New().String()
	content := uuid.New().String()
	answer := uuid.New().String()
	return id, content, answer, nil
}

func (p *MockCaptchaProvider) Expiration() time.Duration {
	return 2 * time.Second
}
func (p *MockCaptchaProvider) Draw(content string) (string, error) {
	return "MOCK", nil
}

func TestSecurityWorkflow(t *testing.T) {
	policy := SecurityPolicy{
		CaptchaThreshold: 3,
		BanThreshold:     5,
		AttemptsWindow:   5 * time.Minute,
		BanDuration:      5 * time.Minute,
	}
	limiter := NewLoginLimiter(policy)
	ip := "192.168.1.100"

	// 测试正常失败记录
	for i := 0; i < 3; i++ {
		limiter.RecordFailedAttempt(ip)
	}
	isBanned, capRequired := limiter.CheckSecurityStatus(ip)
	fmt.Printf("IP: %s, Banned: %v, Captcha Required: %v\n", ip, isBanned, capRequired)
	if isBanned {
		t.Error("IP should not be banned yet")
	}
	if !capRequired {
		t.Error("Captcha should be required")
	}
	// 测试触发封禁
	for i := 0; i < 3; i++ {
		limiter.RecordFailedAttempt(ip)
		isBanned, capRequired = limiter.CheckSecurityStatus(ip)
		fmt.Printf("IP: %s, Banned: %v, Captcha Required: %v\n", ip, isBanned, capRequired)
	}

	// 测试封禁状态
	if isBanned, _ = limiter.CheckSecurityStatus(ip); !isBanned {
		t.Error("IP should be banned")
	}
}

func TestCaptchaFlow(t *testing.T) {
	policy := SecurityPolicy{CaptchaThreshold: 2}
	limiter := NewLoginLimiter(policy)
	limiter.RegisterProvider(&MockCaptchaProvider{})
	ip := "10.0.0.1"

	// 触发验证码要求
	limiter.RecordFailedAttempt(ip)
	limiter.RecordFailedAttempt(ip)

	// 检查状态
	if _, need := limiter.CheckSecurityStatus(ip); !need {
		t.Error("应该需要验证码")
	}

	// 生成验证码
	err, capc := limiter.RequireCaptcha()
	if err != nil {
		t.Fatalf("生成验证码失败: %v", err)
	}
	fmt.Printf("验证码内容: %#v\n", capc)

	// 验证成功
	if !limiter.VerifyCaptcha(capc.Id, capc.Answer) {
		t.Error("验证码应该验证成功")
	}

	// 验证已删除
	if limiter.VerifyCaptcha(capc.Id, capc.Answer) {
		t.Error("验证码应该已删除")
	}

	limiter.RemoveAttempts(ip)
	// 验证后状态
	if banned, need := limiter.CheckSecurityStatus(ip); banned || need {
		t.Error("验证成功后应该重置状态")
	}
}

func TestCaptchaMustFlow(t *testing.T) {
	policy := SecurityPolicy{CaptchaThreshold: 0}
	limiter := NewLoginLimiter(policy)
	limiter.RegisterProvider(&MockCaptchaProvider{})
	ip := "10.0.0.1"

	// 检查状态
	if _, need := limiter.CheckSecurityStatus(ip); !need {
		t.Error("应该需要验证码")
	}

	// 生成验证码
	err, capc := limiter.RequireCaptcha()
	if err != nil {
		t.Fatalf("生成验证码失败: %v", err)
	}
	fmt.Printf("验证码内容: %#v\n", capc)

	// 验证成功
	if !limiter.VerifyCaptcha(capc.Id, capc.Answer) {
		t.Error("验证码应该验证成功")
	}

	// 验证后状态
	if _, need := limiter.CheckSecurityStatus(ip); !need {
		t.Error("应该需要验证码")
	}
}
func TestAttemptTimeout(t *testing.T) {
	policy := SecurityPolicy{CaptchaThreshold: 2, AttemptsWindow: 1 * time.Second}
	limiter := NewLoginLimiter(policy)
	limiter.RegisterProvider(&MockCaptchaProvider{})
	ip := "10.0.0.1"

	// 触发验证码要求
	limiter.RecordFailedAttempt(ip)
	limiter.RecordFailedAttempt(ip)

	// 检查状态
	if _, need := limiter.CheckSecurityStatus(ip); !need {
		t.Error("应该需要验证码")
	}

	// 生成验证码
	err, _ := limiter.RequireCaptcha()
	if err != nil {
		t.Fatalf("生成验证码失败: %v", err)
	}
	// 等待超过 AttemptsWindow
	time.Sleep(2 * time.Second)
	// 触发验证码要求
	limiter.RecordFailedAttempt(ip)

	// 检查状态
	if _, need := limiter.CheckSecurityStatus(ip); need {
		t.Error("不应该需要验证码")
	}
}

func TestCaptchaTimeout(t *testing.T) {
	policy := SecurityPolicy{CaptchaThreshold: 2}
	limiter := NewLoginLimiter(policy)
	limiter.RegisterProvider(&MockCaptchaProvider{})
	ip := "10.0.0.1"

	// 触发验证码要求
	limiter.RecordFailedAttempt(ip)
	limiter.RecordFailedAttempt(ip)

	// 检查状态
	if _, need := limiter.CheckSecurityStatus(ip); !need {
		t.Error("应该需要验证码")
	}

	// 生成验证码
	err, capc := limiter.RequireCaptcha()
	if err != nil {
		t.Fatalf("生成验证码失败: %v", err)
	}

	// 等待超过 CaptchaValidPeriod
	time.Sleep(3 * time.Second)

	// 验证成功
	if limiter.VerifyCaptcha(capc.Id, capc.Answer) {
		t.Error("验证码应该已过期")
	}

}

func TestBanFlow(t *testing.T) {
	policy := SecurityPolicy{BanThreshold: 5}
	limiter := NewLoginLimiter(policy)
	ip := "10.0.0.1"
	// 触发ban
	for i := 0; i < 5; i++ {
		limiter.RecordFailedAttempt(ip)
	}

	// 检查状态
	if banned, _ := limiter.CheckSecurityStatus(ip); !banned {
		t.Error("should be banned")
	}
}
func TestBanDisableFlow(t *testing.T) {
	policy := SecurityPolicy{BanThreshold: 0}
	limiter := NewLoginLimiter(policy)
	ip := "10.0.0.1"
	// 触发ban
	for i := 0; i < 5; i++ {
		limiter.RecordFailedAttempt(ip)
	}

	// 检查状态
	if banned, _ := limiter.CheckSecurityStatus(ip); banned {
		t.Error("should not be banned")
	}
}
func TestBanTimeout(t *testing.T) {
	policy := SecurityPolicy{BanThreshold: 5, BanDuration: 1 * time.Second}
	limiter := NewLoginLimiter(policy)
	ip := "10.0.0.1"
	// 触发ban
	// 触发ban
	for i := 0; i < 5; i++ {
		limiter.RecordFailedAttempt(ip)
	}

	time.Sleep(2 * time.Second)

	// 检查状态
	if banned, _ := limiter.CheckSecurityStatus(ip); banned {
		t.Error("should not be banned")
	}
}

func TestLimiterDisabled(t *testing.T) {
	policy := SecurityPolicy{BanThreshold: 0, CaptchaThreshold: -1}
	limiter := NewLoginLimiter(policy)
	ip := "10.0.0.1"
	// 触发ban
	for i := 0; i < 5; i++ {
		limiter.RecordFailedAttempt(ip)
	}

	// 检查状态
	if banned, capNeed := limiter.CheckSecurityStatus(ip); banned || capNeed {
		fmt.Printf("IP: %s, Banned: %v, Captcha Required: %v\n", ip, banned, capNeed)
		t.Error("should not be banned or need captcha")
	}
}

func TestB64CaptchaFlow(t *testing.T) {
	limiter := NewLoginLimiter(defaultSecurityPolicy)
	limiter.RegisterProvider(B64StringCaptchaProvider{})
	ip := "10.0.0.1"

	// 触发验证码要求
	limiter.RecordFailedAttempt(ip)
	limiter.RecordFailedAttempt(ip)
	limiter.RecordFailedAttempt(ip)

	// 检查状态
	if _, need := limiter.CheckSecurityStatus(ip); !need {
		t.Error("应该需要验证码")
	}

	// 生成验证码
	err, capc := limiter.RequireCaptcha()
	if err != nil {
		t.Fatalf("生成验证码失败: %v", err)
	}
	fmt.Printf("验证码内容: %#v\n", capc)

	//draw
	err, b64 := limiter.DrawCaptcha(capc.Content)
	if err != nil {
		t.Fatalf("绘制验证码失败: %v", err)
	}
	fmt.Printf("验证码内容: %#v\n", b64)

	// 验证成功
	if !limiter.VerifyCaptcha(capc.Id, capc.Answer) {
		t.Error("验证码应该验证成功")
	}
	limiter.RemoveAttempts(ip)
	// 验证后状态
	if banned, need := limiter.CheckSecurityStatus(ip); banned || need {
		t.Error("验证成功后应该重置状态")
	}
}
