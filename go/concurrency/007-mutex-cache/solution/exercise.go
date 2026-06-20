package drill

import "sync"

type Cache struct {
  mu     sync.Mutex
  values map[string]string
}

func NewCache() *Cache {
  return &Cache{values: map[string]string{}}
}

func (c *Cache) Get(key string, load func() string) string {
  c.mu.Lock()
  defer c.mu.Unlock()
  if value, ok := c.values[key]; ok {
    return value
  }
  value := load()
  c.values[key] = value
  return value
}
