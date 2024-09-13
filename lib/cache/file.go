package cache

import (
	"crypto/md5"
	"fmt"
	"os"
	"sync"
	"time"
)

type FileCache struct {
	mu    sync.Mutex
	locks map[string]*sync.Mutex
	Dir   string
}

func (fc *FileCache) getLock(key string) *sync.Mutex {
	fc.mu.Lock()
	defer fc.mu.Unlock()
	if fc.locks == nil {
		fc.locks = make(map[string]*sync.Mutex)
	}
	if _, ok := fc.locks[key]; !ok {
		fc.locks[key] = new(sync.Mutex)
	}
	return fc.locks[key]
}

func (c *FileCache) Get(key string, value interface{}) error {
	data, _ := c.getValue(key)
	err := DecodeValue(data, value)
	return err
}

// 获取值,如果文件不存在或者过期，返回空，过滤掉错误
func (c *FileCache) getValue(key string) (string, error) {
	f := c.fileName(key)
	fileInfo, err := os.Stat(f)
	if err != nil {
		//文件不存在
		return "", nil
	}
	difT := time.Now().Sub(fileInfo.ModTime())
	if difT >= 0 {
		os.Remove(f)
		return "", nil
	}
	data, err := os.ReadFile(f)
	if err != nil {
		return "", nil
	}
	return string(data), nil
}

// 保存值
func (c *FileCache) saveValue(key string, value string, exp int) error {
	f := c.fileName(key)
	lock := c.getLock(f)
	lock.Lock()
	defer lock.Unlock()

	err := os.WriteFile(f, ([]byte)(value), 0644)
	if err != nil {
		return err
	}
	if exp <= 0 {
		exp = MaxTimeOut
	}
	expFromNow := time.Now().Add(time.Duration(exp) * time.Second)
	err = os.Chtimes(f, expFromNow, expFromNow)
	return err
}

func (c *FileCache) Set(key string, value interface{}, exp int) error {
	str, err := EncodeValue(value)
	if err != nil {
		return err
	}

	err = c.saveValue(key, str, exp)
	return err
}

func (c *FileCache) SetDir(path string) {
	c.Dir = path
}

func (c *FileCache) fileName(key string) string {
	f := c.Dir + string(os.PathSeparator) + fmt.Sprintf("%x", md5.Sum([]byte(key)))
	return f
}

func (c *FileCache) Gc() error {
	//检查文件过期时间，并删除
	return nil
}

func NewFileCache() *FileCache {
	return &FileCache{
		locks: make(map[string]*sync.Mutex),
		Dir:   os.TempDir(),
	}
}
