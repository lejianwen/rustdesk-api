package cache

import (
	"fmt"
	"testing"
)

func TestSimpleCache_Set(t *testing.T) {
	s := NewSimpleCache()
	err := s.Set("key", "value", 0)
	if err != nil {
		t.Fatalf("写入失败")
	}
	err = s.Set("key", 111, 0)
	if err != nil {
		t.Fatalf("写入失败")
	}
}

func TestSimpleCache_Get(t *testing.T) {
	s := NewSimpleCache()
	err := s.Set("key", "value", 0)
	value := ""
	err = s.Get("key", &value)
	fmt.Println("value", value)
	if err != nil {
		t.Fatalf("读取失败")
	}

	err = s.Set("key1", 11, 0)
	value1 := 0
	err = s.Get("key1", &value1)
	fmt.Println("value1", value1)
	if err != nil {
		t.Fatalf("读取失败")
	}

	err = s.Set("key2", []byte{'a', 'b'}, 0)
	value2 := []byte{}
	err = s.Get("key2", &value2)
	fmt.Println("value2", string(value2))
	if err != nil {
		t.Fatalf("读取失败")
	}

	err = s.Set("key3", 33.33, 0)
	var value3 int
	err = s.Get("key3", &value3)
	fmt.Println("value3", value3)
	if err != nil {
		t.Fatalf("读取失败")
	}

}

type r struct {
	A string `json:"a"`
	B string `json:"b"`
	R *rr    `json:"r"`
}
type r2 struct {
	A string `json:"a"`
	B string `json:"b"`
}
type rr struct {
	AA string `json:"aa"`
	BB string `json:"bb"`
}

func TestSimpleCache_GetStruct(t *testing.T) {
	s := NewSimpleCache()

	old_rr := &rr{
		AA: "aa", BB: "bb",
	}

	old := &r{
		A: "ab", B: "cdc",
		R: old_rr,
	}
	err := s.Set("key", old, 300)
	if err != nil {
		t.Fatalf("写入失败")
	}

	res := &r{}
	err2 := s.Get("key", res)
	fmt.Println("res", res)
	if err2 != nil {
		t.Fatalf("读取失败" + err2.Error())

	}

	//修改原始值，看后面是否会变化
	old.A = "aa"
	old_rr.AA = "aaa"
	fmt.Println("old", old)
	res2 := &r{}
	err3 := s.Get("key", res2)
	fmt.Println("res2", res2, res2.R.AA, res2.R.BB)
	if err3 != nil {
		t.Fatalf("读取失败" + err3.Error())

	}
	//if reflect.DeepEqual(res, old) {
	//	t.Fatalf("读取错误")
	//}
}
