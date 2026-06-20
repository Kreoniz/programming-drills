package drill

type SafeCounter struct {
  value int
}

func (c *SafeCounter) Inc() {
  // TODO: make increments safe under concurrency.
}

func (c *SafeCounter) Value() int {
  // TODO: return the current value safely.
  return c.value
}
