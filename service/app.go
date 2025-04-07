package service

import (
	"os"
	"sync"
)

type AppService struct {
}

var version = ""

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
