package utils

import (
	"github.com/mojocn/base64Captcha"
	"time"
)

var capdString = base64Captcha.NewDriverString(50, 150, 5, 10, 4, "123456789abcdefghijklmnopqrstuvwxyz", nil, nil, nil)

var capdMath = base64Captcha.NewDriverMath(50, 150, 5, 10, nil, nil, nil)

type B64StringCaptchaProvider struct{}

func (p B64StringCaptchaProvider) Generate(ip string) (string, string, error) {
	_, content, answer := capdString.GenerateIdQuestionAnswer()
	return content, answer, nil
}

func (p B64StringCaptchaProvider) Expiration() time.Duration {
	return 5 * time.Minute
}
func (p B64StringCaptchaProvider) Draw(content string) (string, error) {
	item, err := capdString.DrawCaptcha(content)
	if err != nil {
		return "", err
	}
	b64str := item.EncodeB64string()
	return b64str, nil
}

type B64MathCaptchaProvider struct{}

func (p B64MathCaptchaProvider) Generate(ip string) (string, string, error) {
	_, content, answer := capdMath.GenerateIdQuestionAnswer()
	return content, answer, nil
}

func (p B64MathCaptchaProvider) Expiration() time.Duration {
	return 5 * time.Minute
}
func (p B64MathCaptchaProvider) Draw(content string) (string, error) {
	item, err := capdMath.DrawCaptcha(content)
	if err != nil {
		return "", err
	}
	b64str := item.EncodeB64string()
	return b64str, nil
}
