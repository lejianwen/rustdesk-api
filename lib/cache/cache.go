package cache

import (
	"encoding/json"
)

type Handler interface {
	Get(key string, value interface{}) error
	Set(key string, value interface{}, exp int) error
	Gc() error
}

// MaxTimeOut 最大超时时间

const (
	TypeMem    = "memory"
	TypeRedis  = "redis"
	TypeFile   = "file"
	MaxTimeOut = 365 * 24 * 3600
)

func New(typ string) Handler {
	var cache Handler
	switch typ {
	case TypeFile:
		cache = NewFileCache()
	case TypeRedis:
		cache = new(RedisCache)
	case TypeMem: // memory
		cache = NewMemoryCache(0)
	default:
		cache = NewMemoryCache(0)
	}
	return cache
}

func EncodeValue(value interface{}) (string, error) {
	/*if v, ok := value.(string); ok {
		return v, nil
	}
	if v, ok := value.([]byte); ok {
		return string(v), nil
	}*/
	b, err := json.Marshal(value)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

func DecodeValue(value string, rtv interface{}) error {
	//判断rtv的类型是否是string，如果是string，直接赋值并返回
	/*switch rtv.(type) {
	case *string:
		*(rtv.(*string)) = value
		return nil
	case *[]byte:
		*(rtv.(*[]byte)) = []byte(value)
		return nil
	//struct
	case *interface{}:
		err := json.Unmarshal(([]byte)(value), rtv)
		return err
	default:
		err := json.Unmarshal(([]byte)(value), rtv)
		return err
	}
	*/
	err := json.Unmarshal(([]byte)(value), rtv)
	return err
}
