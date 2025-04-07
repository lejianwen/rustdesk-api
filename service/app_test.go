package service

import (
	"sync"
	"testing"
)

// TestGetAppVersion
func TestGetAppVersion(t *testing.T) {
	s := &AppService{}
	v := s.GetAppVersion()
	// 打印结果
	t.Logf("App Version: %s", v)
}

func TestMultipleGetAppVersion(t *testing.T) {
	s := &AppService{}
	//并发测试
	// 使用 WaitGroup 等待所有 goroutine 完成
	wg := sync.WaitGroup{}
	wg.Add(10) // 启动 10 个 goroutine
	// 启动 10 个 goroutine
	for i := 0; i < 10; i++ {
		go func() {
			defer wg.Done() // 完成后减少计数
			v := s.GetAppVersion()
			// 打印结果
			t.Logf("App Version: %s", v)
		}()
	}
	// 等待所有 goroutine 完成
	wg.Wait()
}
