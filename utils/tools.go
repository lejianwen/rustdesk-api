package utils

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
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
