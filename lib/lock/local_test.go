package lock

import (
	"fmt"
	"sync"
	"testing"
)

func TestLocal_GetLock(t *testing.T) {
	l := NewLocal()
	wg := sync.WaitGroup{}
	wg.Add(3)
	var l1 *sync.Mutex
	var l2 *sync.Mutex
	var l3 *sync.Mutex
	i := 0
	go func() {
		l1 = l.GetLock("key")
		fmt.Println("l1", l1, i)
		l1.Lock()
		fmt.Println("l1", i)
		i++
		l1.Unlock()
		wg.Done()
	}()
	go func() {
		l2 = l.GetLock("key")
		fmt.Println("l2", l2, i)
		l2.Lock()
		fmt.Println("l2", i)
		i++
		l2.Unlock()
		wg.Done()
	}()
	go func() {
		l3 = l.GetLock("key")
		fmt.Println("l3", l3, i)
		l3.Lock()
		fmt.Println("l3", i)
		i++
		l3.Unlock()
		wg.Done()
	}()
	wg.Wait()

	fmt.Println(l1, l2, l3)
	fmt.Println(l1 == l2, l2 == l3)
	fmt.Println(&sync.Mutex{} == &sync.Mutex{})
}

func TestLocal_Lock(t *testing.T) {
	l := NewLocal()
	wg := sync.WaitGroup{}
	wg.Add(3)
	i := 0
	go func() {
		l.Lock("key")
		fmt.Println("l1", i)
		i++
		l.UnLock("key")
		wg.Done()
	}()
	go func() {
		l.Lock("key")
		fmt.Println("l2", i)
		i++
		l.UnLock("key")
		wg.Done()
	}()
	go func() {
		l.Lock("key")
		fmt.Println("l3", i)
		i++
		l.UnLock("key")
		wg.Done()
	}()
	wg.Wait()

}
func TestSyncMap(t *testing.T) {
	m := sync.Map{}
	wg := sync.WaitGroup{}
	wg.Add(3)
	go func() {
		v, ok := m.LoadOrStore("key", 1)
		fmt.Println(1, v, ok)
		wg.Done()
	}()
	go func() {
		v, ok := m.LoadOrStore("key", 2)
		fmt.Println(2, v, ok)
		wg.Done()
	}()
	go func() {
		v, ok := m.LoadOrStore("key", 3)
		fmt.Println(3, v, ok)
		wg.Done()
	}()
	wg.Wait()
}
