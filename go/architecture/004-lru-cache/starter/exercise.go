package drill

type LRU struct {
  capacity int
}

func NewLRU(capacity int) *LRU {
  // TODO: initialize cache.
  return &LRU{capacity: capacity}
}

func (c *LRU) Put(key string, value string) {}

func (c *LRU) Get(key string) (string, bool) {
  // TODO: return value and mark as recently used.
  return "", false
}
