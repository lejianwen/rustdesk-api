package custom_types

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
)

// AutoJson 数据类型
type AutoJson json.RawMessage

func (j *AutoJson) Scan(value interface{}) error {

	var strValue string
	switch v := value.(type) {
	case []byte:
		strValue = string(v)
	case string:
		strValue = v
	default:
		return errors.New(fmt.Sprintf("Failed Scan AutoJson value: %v", value))
	}
	bytes := []byte(strValue)
	//bytes, ok := value.([]byte)
	//if !ok {
	//	return errors.New(fmt.Sprint("Failed Scan AutoJson value:", value))
	//}

	if bytes == nil || len(bytes) == 0 {
		*j = AutoJson(json.RawMessage{'[', ']'})
		return nil
	}
	result := &json.RawMessage{}
	err := json.Unmarshal(bytes, result)
	//解析json错误 返回空
	if err != nil {
		*j = AutoJson(json.RawMessage{'[', ']'})
		return nil
	}
	*j = AutoJson(*result)
	return err
}
func (j AutoJson) Value() (driver.Value, error) {
	bytes, err := json.RawMessage(j).MarshalJSON()
	return string(bytes), err
}
func (j AutoJson) MarshalJSON() ([]byte, error) {
	b, err := json.RawMessage(j).MarshalJSON()
	if err != nil {
		return nil, err
	}
	return b, err
}

func (j *AutoJson) UnmarshalJSON(b []byte) error {
	result := json.RawMessage{}
	err := result.UnmarshalJSON(b)
	*j = AutoJson(result)
	return err
}

func (j AutoJson) String() string {
	s, _ := j.MarshalJSON()
	return (string)(s)
}
