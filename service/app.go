package service

import (
	"os"
	"sync"
	"time"
)

type AppService struct {
}

var version = ""
var startTime = ""
var once = &sync.Once{}

func (a *AppService) GetAppVersion() string {
	if version != "" {
		return version
	}
	once.Do(func() {
		v, err := os.ReadFile("resources/version")
		if err != nil {
			return
		}
		version = string(v)

	})
	return version
}

func init() {
	// Initialize the AppService if needed
	startTime = time.Now().Format("2006-01-02 15:04:05")
}

// GetStartTime
func (a *AppService) GetStartTime() string {
	return startTime
}
