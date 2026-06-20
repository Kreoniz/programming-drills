package drill

import "container/list"

type entry struct {
  key string
  value string
}

type LRU struct {
  capacity int
  order *list.List
  items map[string]*list.Element
}

func NewLRU(capacity int) *LRU {
  if capacity < 1 {
    capacity = 1
  }
  return &LRU{capacity: capacity, order: list.New(), items: map[string]*list.Element{}}
}

func (c *LRU) Put(key string, value string) {
  if el, ok := c.items[key]; ok {
    el.Value.(*entry).value = value
    c.order.MoveToFront(el)
    return
  }
  el := c.order.PushFront(&entry{key: key, value: value})
  c.items[key] = el
  if c.order.Len() > c.capacity {
    last := c.order.Back()
    c.order.Remove(last)
    delete(c.items, last.Value.(*entry).key)
  }
}

func (c *LRU) Get(key string) (string, bool) {
  el, ok := c.items[key]
  if !ok {
    return "", false
  }
  c.order.MoveToFront(el)
  return el.Value.(*entry).value, true
}
