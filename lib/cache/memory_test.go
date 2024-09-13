package cache

import (
	"fmt"
	"testing"
	"time"
)

func TestMemorySet(t *testing.T) {
	mc := NewMemoryCache(0)
	err := mc.Set("123", "44567", 0)
	if err != nil {
		fmt.Println(err.Error())
		t.Fatalf("写入失败")
	}
}

func TestMemoryGet(t *testing.T) {
	mc := NewMemoryCache(0)
	mc.Set("123", "44567", 0)
	res := ""
	err := mc.Get("123", &res)
	fmt.Println("res", res)
	if err != nil {
		t.Fatalf("读取失败 " + err.Error())
	}
	if res != "44567" {
		t.Fatalf("读取错误")
	}

}

func TestMemorySetExpGet(t *testing.T) {
	mc := NewMemoryCache(0)
	//mc.stopEviction()
	mc.Set("1", "10", 10)
	mc.Set("2", "5", 5)
	err := mc.Set("3", "3", 3)
	if err != nil {
		t.Fatalf("写入失败")
	}

	res := ""
	err = mc.Get("3", &res)
	if err != nil {
		t.Fatalf("读取失败" + err.Error())
	}
	fmt.Println("res 3", res)
	time.Sleep(4 * time.Second)
	//res = ""
	err = mc.Get("3", &res)
	if err != nil {
		t.Fatalf("读取失败" + err.Error())
	}
	fmt.Println("res 3", res)
	err = mc.Get("2", &res)
	if err != nil {
		t.Fatalf("读取失败" + err.Error())
	}
	fmt.Println("res 2", res)
	err = mc.Get("1", &res)
	if err != nil {
		t.Fatalf("读取失败" + err.Error())
	}
	fmt.Println("res 1", res)

}
func TestMemoryLru(t *testing.T) {
	mc := NewMemoryCache(18)
	mc.Set("1", "1111", 10)
	mc.Set("2", "2222", 5)
	//读取一次，2就会被放到最后
	mc.Get("1", nil)
	err := mc.Set("3", "三", 3)
	if err != nil {
		//t.Fatalf("写入失败")
	}

	res := ""
	err = mc.Get("3", &res)
	if err != nil {
		t.Fatalf("读取失败" + err.Error())
	}
	fmt.Println("res3", res)
	res = ""
	err = mc.Get("2", &res)
	if err != nil {
		t.Fatalf("读取失败" + err.Error())
	}
	fmt.Println("res2", res)
	res = ""
	err = mc.Get("1", &res)
	if err != nil {
		t.Fatalf("读取失败" + err.Error())
	}
	fmt.Println("res1", res)

}
func BenchmarkMemorySet(b *testing.B) {
	mc := NewMemoryCache(0)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		key := fmt.Sprintf("key%d", i)
		value := fmt.Sprintf("value%d", i)
		mc.Set(key, value, 1000)
	}
}
