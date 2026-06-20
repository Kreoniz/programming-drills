package drill

import "sync/atomic"

type AtomicCounter struct {
  value atomic.Int64
}

func (c *AtomicCounter) Inc() {
  c.value.Add(1)
}

func (c *AtomicCounter) Value() int64 {
  return c.value.Load()
}
