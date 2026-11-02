package config

import (
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/spf13/viper"
)

func initFromFile(t *testing.T, body string) *Config {
	t.Helper()
	path := filepath.Join(t.TempDir(), "config.yaml")
	if err := os.WriteFile(path, []byte(body), 0o600); err != nil {
		t.Fatal(err)
	}
	viper.Reset()
	t.Cleanup(viper.Reset)
	c := &Config{}
	Init(c, path)
	return c
}

func TestInitMissingKeysGetDefaults(t *testing.T) {
	for name, body := range map[string]string{
		"app section without the keys": "app:\n  register: true\n",
		"no app section":               "gin:\n  mode: release\n",
	} {
		t.Run(name, func(t *testing.T) {
			c := initFromFile(t, body)
			if c.App.CaptchaThreshold != 3 {
				t.Errorf("app.captcha-threshold = %d, want 3", c.App.CaptchaThreshold)
			}
			if c.App.TokenExpire != 168*time.Hour {
				t.Errorf("app.token-expire = %v, want 168h", c.App.TokenExpire)
			}
		})
	}
}

func TestInitFileBeatsDefaults(t *testing.T) {
	c := initFromFile(t, "app:\n  captcha-threshold: 0\n  token-expire: 24h\n")
	if c.App.CaptchaThreshold != 0 {
		t.Errorf("app.captcha-threshold = %d, want 0 from the file", c.App.CaptchaThreshold)
	}
	if c.App.TokenExpire != 24*time.Hour {
		t.Errorf("app.token-expire = %v, want 24h from the file", c.App.TokenExpire)
	}
}

func TestInitEnvBeatsFileAndDefault(t *testing.T) {
	t.Setenv("RUSTDESK_API_APP_CAPTCHA_THRESHOLD", "7")
	t.Setenv("RUSTDESK_API_APP_TOKEN_EXPIRE", "2h")
	c := initFromFile(t, "app:\n  captcha-threshold: 1\n")
	if c.App.CaptchaThreshold != 7 {
		t.Errorf("app.captcha-threshold = %d, want 7 from the environment", c.App.CaptchaThreshold)
	}
	if c.App.TokenExpire != 2*time.Hour {
		t.Errorf("app.token-expire = %v, want 2h from the environment", c.App.TokenExpire)
	}
}

func TestInitLeavesSampleValuesOut(t *testing.T) {
	c := initFromFile(t, "app:\n  register: true\n")
	if c.Ldap.User.BaseDn != "" || c.Ldap.User.AllowGroup != "" || c.Ldap.BindPassword != "" {
		t.Errorf("ldap got sample values: %+v", c.Ldap)
	}
	if c.Logger.Path != "" {
		t.Errorf("logger.path = %q, want empty", c.Logger.Path)
	}
	if c.Proxy.Host != "" {
		t.Errorf("proxy.host = %q, want empty", c.Proxy.Host)
	}
	if c.Rustdesk.IdServer != "" || c.Rustdesk.ApiServer != "" {
		t.Errorf("rustdesk got sample values: %+v", c.Rustdesk)
	}
}
