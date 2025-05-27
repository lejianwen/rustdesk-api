package utils

import (
	"github.com/mojocn/base64Captcha"
	"time"
)

var capdString = base64Captcha.NewDriverString(50, 150, 0, 5, 4, "123456789abcdefghijklmnopqrstuvwxyz", nil, nil, nil)

var capdMath = base64Captcha.NewDriverMath(50, 150, 3, 10, nil, nil, nil)

type B64StringCaptchaProvider struct{}

func (p B64StringCaptchaProvider) Generate() (string, string, string, error) {
	id, content, answer := capdString.GenerateIdQuestionAnswer()
	return id, content, answer, nil
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

func (p B64MathCaptchaProvider) Generate() (string, string, string, error) {
	id, content, answer := capdMath.GenerateIdQuestionAnswer()
	return id, content, answer, nil
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
