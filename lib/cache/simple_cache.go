package cache

import (
	"errors"
	"reflect"
	"sync"
)

// 此处实现了一个简单的缓存，用于测试
// SimpleCache is a simple cache implementation
type SimpleCache struct {
	data      map[string]interface{}
	mu        sync.Mutex
	maxBytes  int64
	usedBytes int64
}

func (s *SimpleCache) Get(key string, value interface{}) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	// 使用反射将存储的值设置到传入的指针变量中
	val := reflect.ValueOf(value)
	if val.Kind() != reflect.Ptr {
		return errors.New("value must be a pointer")
	}
	v, ok := s.data[key]
	if !ok {
		//设为空值
		val.Elem().Set(reflect.Zero(val.Elem().Type()))
		return nil
	}

	vval := reflect.ValueOf(v)
	if val.Elem().Type() != vval.Type() {
		//设为空值
		val.Elem().Set(reflect.Zero(val.Elem().Type()))
		return nil
	}

	val.Elem().Set(reflect.ValueOf(v))
	return nil
}

func (s *SimpleCache) Set(key string, value interface{}, exp int) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	// 检查传入的值是否是指针，如果是则取其值
	val := reflect.ValueOf(value)
	if val.Kind() == reflect.Ptr {
		val = val.Elem()
	}

	s.data[key] = val.Interface()
	return nil
}
func (s *SimpleCache) Gc() error {
	return nil
}

func NewSimpleCache() *SimpleCache {
	return &SimpleCache{
		data: make(map[string]interface{}),
	}
}
