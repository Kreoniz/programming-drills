package drill

import (
  "sync"
  "testing"
)

func TestSafeCounterConcurrent(t *testing.T) {
  var c SafeCounter
  var wg sync.WaitGroup
  for i := 0; i < 100; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      c.Inc()
    }()
  }
  wg.Wait()
  if got := c.Value(); got != 100 {
    t.Fatalf("value = %d", got)
  }
}
