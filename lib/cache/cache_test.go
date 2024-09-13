package cache

import (
	"fmt"
	"github.com/go-redis/redis/v8"
	"reflect"
	"testing"
)

func TestSimpleCache(t *testing.T) {

	type st struct {
		A string
		B string
	}

	items := map[string]interface{}{}
	items["a"] = "b"
	items["b"] = "c"

	ab := &st{
		A: "a",
		B: "b",
	}
	items["ab"] = *ab

	a := items["a"]
	fmt.Println(a)

	b := items["b"]
	fmt.Println(b)

	ab.A = "aa"
	ab2 := st{}
	ab2 = (items["ab"]).(st)
	fmt.Println(ab2, reflect.TypeOf(ab2))

}

func TestFileCacheSet(t *testing.T) {
	fc := New("file")
	err := fc.Set("123", "ddd", 0)
	if err != nil {
		fmt.Println(err.Error())
		t.Fatalf("写入失败")
	}
}

func TestFileCacheGet(t *testing.T) {
	fc := New("file")
	err := fc.Set("123", "45156", 300)
	if err != nil {
		t.Fatalf("写入失败")
	}
	res := ""
	err = fc.Get("123", &res)
	if err != nil {
		t.Fatalf("读取失败")
	}
	fmt.Println("res", res)
}

func TestRedisCacheSet(t *testing.T) {
	rc := NewRedis(&redis.Options{
		Addr:     "192.168.1.168:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	err := rc.Set("123", "ddd", 0)
	if err != nil {
		fmt.Println(err.Error())
		t.Fatalf("写入失败")
	}
}

func TestRedisCacheGet(t *testing.T) {
	rc := NewRedis(&redis.Options{
		Addr:     "192.168.1.168:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	err := rc.Set("123", "451156", 300)
	if err != nil {
		t.Fatalf("写入失败")
	}
	res := ""
	err = rc.Get("123", &res)
	if err != nil {
		t.Fatalf("读取失败")
	}
	fmt.Println("res", res)
}
