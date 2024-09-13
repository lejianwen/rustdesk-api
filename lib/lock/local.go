package lock

import (
	"sync"
)

type Local struct {
	Locks *sync.Map
}

func (l *Local) Lock(key string) {
	lock := l.GetLock(key)
	lock.Lock()
}

func (l *Local) UnLock(key string) {
	lock, ok := l.Locks.Load(key)
	if ok {
		lock.(*sync.Mutex).Unlock()
	}
}

func (l *Local) GetLock(key string) *sync.Mutex {
	lock, _ := l.Locks.LoadOrStore(key, &sync.Mutex{})
	return lock.(*sync.Mutex)
}

func NewLocal() *Local {
	return &Local{
		Locks: &sync.Map{},
	}
}
