package service

import (
	"testing"
	"time"

	"github.com/lejianwen/rustdesk-api/v2/config"
)

func TestUserTokenExpireTimestampFallsBackToSevenDays(t *testing.T) {
	saved := Config
	Config = &config.Config{}
	t.Cleanup(func() { Config = saved })

	got := (&UserService{}).UserTokenExpireTimestamp()
	want := time.Now().Add(7 * 24 * time.Hour).Unix()
	if got < want-5 || got > want+5 {
		t.Errorf("expiry = %d, want about %d", got, want)
	}
}
