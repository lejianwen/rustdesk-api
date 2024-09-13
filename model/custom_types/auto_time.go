package custom_types

import (
	"database/sql/driver"
	"time"
)

// AutoTime 自定义时间格式
type AutoTime time.Time

func (mt AutoTime) Value() (driver.Value, error) {
	var zeroTime time.Time
	t := time.Time(mt)
	if t.UnixNano() == zeroTime.UnixNano() {
		return nil, nil
	}
	return t, nil
}

func (mt AutoTime) MarshalJSON() ([]byte, error) {
	//b := make([]byte, 0, len("2006-01-02 15:04:05")+2)
	b := time.Time(mt).AppendFormat([]byte{}, "\"2006-01-02 15:04:05\"")
	return b, nil
}
