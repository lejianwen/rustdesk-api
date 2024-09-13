package lock

import "sync"

type Locker interface {
	GetLock(key string) *sync.Mutex
	Lock(key string)
	UnLock(key string)
}
