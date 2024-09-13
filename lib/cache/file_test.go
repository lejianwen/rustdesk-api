package cache

import (
	"fmt"
	"reflect"
	"testing"
)

func TestFileSet(t *testing.T) {
	fc := NewFileCache()
	err := fc.Set("123", "ddd", 0)
	if err != nil {
		fmt.Println(err.Error())
		t.Fatalf("写入失败")
	}
}

func TestFileGet(t *testing.T) {
	fc := NewFileCache()
	res := ""
	err := fc.Get("123", &res)
	if err != nil {
		fmt.Println(err.Error())
		t.Fatalf("读取失败")
	}
	fmt.Println("res", res)
}
func TestFileSetGet(t *testing.T) {
	fc := NewFileCache()
	err := fc.Set("key1", "ddd", 0)
	res := ""
	err = fc.Get("key1", &res)
	if err != nil {
		fmt.Println(err.Error())
		t.Fatalf("读取失败")
	}
	fmt.Println("res", res)
}
func TestFileGetJson(t *testing.T) {
	fc := NewFileCache()
	old := &r{
		A: "a", B: "b",
	}
	fc.Set("123", old, 0)
	res := &r{}
	err2 := fc.Get("123", res)
	fmt.Println("res", res)
	if err2 != nil {
		t.Fatalf("读取失败" + err2.Error())
	}
}
func TestFileSetGetJson(t *testing.T) {
	fc := NewFileCache()

	old_rr := &rr{AA: "aa", BB: "bb"}
	old := &r{
		A: "a", B: "b",
		R: old_rr,
	}
	err := fc.Set("123", old, 300)
	if err != nil {
		t.Fatalf("写入失败")
	}
	//old_rr.AA = "aaa"
	fmt.Println("old_rr", old)

	res := &r{}
	err2 := fc.Get("123", res)
	fmt.Println("res", res)
	if err2 != nil {
		t.Fatalf("读取失败" + err2.Error())
	}
	if !reflect.DeepEqual(res, old) {
		t.Fatalf("读取错误")
	}

}

func BenchmarkSet(b *testing.B) {
	fc := NewFileCache()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		fc.Set("123", "{dsv}", 1000)
	}
}

func BenchmarkGet(b *testing.B) {
	fc := NewFileCache()
	b.ResetTimer()
	v := ""
	for i := 0; i < b.N; i++ {
		fc.Get("123", &v)
	}
}
