package config

import (
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/spf13/viper"
)

func initDurations(t *testing.T, body string) *Config {
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

func TestInitReadsBareDurationsAsSeconds(t *testing.T) {
	c := initDurations(t, "app:\n  token-expire: 360000\njwt:\n  expire-duration: 360000\n")
	if c.App.TokenExpire != 100*time.Hour {
		t.Errorf("app.token-expire = %v, want 100h", c.App.TokenExpire)
	}
	if c.Jwt.ExpireDuration != 100*time.Hour {
		t.Errorf("jwt.expire-duration = %v, want 100h", c.Jwt.ExpireDuration)
	}
}

func TestInitKeepsDurationStrings(t *testing.T) {
	c := initDurations(t, "app:\n  token-expire: 500ms\njwt:\n  expire-duration: 24h\n")
	if c.App.TokenExpire != 500*time.Millisecond {
		t.Errorf("app.token-expire = %v, want 500ms", c.App.TokenExpire)
	}
	if c.Jwt.ExpireDuration != 24*time.Hour {
		t.Errorf("jwt.expire-duration = %v, want 24h", c.Jwt.ExpireDuration)
	}
}

func TestInitKeepsZeroTokenExpire(t *testing.T) {
	c := initDurations(t, "app:\n  token-expire: 0\n")
	if c.App.TokenExpire != 0 {
		t.Errorf("app.token-expire = %v, want 0 for the service fallback", c.App.TokenExpire)
	}
}

func TestInitKeepsBareValuesOfASecondOrMore(t *testing.T) {
	c := initDurations(t, "app:\n  token-expire: 86400000000000\n")
	if c.App.TokenExpire != 24*time.Hour {
		t.Errorf("app.token-expire = %v, want 24h", c.App.TokenExpire)
	}
}

func TestInitEnvBeatsBareFileValue(t *testing.T) {
	t.Setenv("RUSTDESK_API_APP_TOKEN_EXPIRE", "2h")
	c := initDurations(t, "app:\n  token-expire: 360000\n")
	if c.App.TokenExpire != 2*time.Hour {
		t.Errorf("app.token-expire = %v, want 2h from the environment", c.App.TokenExpire)
	}
}
