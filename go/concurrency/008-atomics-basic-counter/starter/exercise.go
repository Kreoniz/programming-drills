package drill

type AtomicCounter struct {
  value int64
}

func (c *AtomicCounter) Inc() {
  // TODO: increment atomically.
}

func (c *AtomicCounter) Value() int64 {
  // TODO: load atomically.
  return c.value
}
