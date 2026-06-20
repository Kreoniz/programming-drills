package drill

type Cache struct {
  values map[string]string
}

func NewCache() *Cache {
  // TODO: initialize the cache.
  return &Cache{}
}

func (c *Cache) Get(key string, load func() string) string {
  // TODO: return cached value or load and store it.
  return load()
}
