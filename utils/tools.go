package utils

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"math/rand"
	"reflect"
	"runtime/debug"
)

func Md5(str string) string {
	t := md5.Sum(([]byte)(str))
	return fmt.Sprintf("%x", t)
}

func CopyStructByJson(src, dst interface{}) {
	str, _ := json.Marshal(src)
	err := json.Unmarshal(str, dst)
	if err != nil {
		return
	}
}

// CopyStructToMap 结构体转map
func CopyStructToMap(src interface{}) map[string]interface{} {
	var res = map[string]interface{}{}
	str, _ := json.Marshal(src)
	err := json.Unmarshal(str, &res)
	if err != nil {
		return nil
	}
	return res
}

// SafeGo is a common function to recover panic for goroutines
func SafeGo(f interface{}, params ...interface{}) {
	go func() {
		defer func() {
			if r := recover(); r != nil {
				fmt.Printf("Recovered in SafeGo: %v\n", r)
				debug.PrintStack()
			}
		}()

		// Convert f to a reflect.Value
		funcValue := reflect.ValueOf(f)

		// Check if the f is a function
		if funcValue.Kind() != reflect.Func {
			fmt.Println("SafeGo: value is not a function")
			return
		}

		// Convert params to reflect.Value
		paramsValue := make([]reflect.Value, len(params))
		for i, param := range params {
			paramsValue[i] = reflect.ValueOf(param)
		}

		// Call the function f with params
		funcValue.Call(paramsValue)
	}()
}

// RandomString 生成随机字符串
func RandomString(n int) string {
	const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	length := len(letterBytes)
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(length)]
	}
	return string(b)
}

// Keys 泛型函数，K 是键类型，V 是值类型
func Keys[K comparable, V any](m map[K]V) []K {
	keys := make([]K, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	return keys
}

// Values 泛型函数，K 是键类型，V 是值类型
func Values[K comparable, V any](m map[K]V) []V {
	values := make([]V, 0, len(m))
	for _, v := range m {
		values = append(values, v)
	}
	return values
}
