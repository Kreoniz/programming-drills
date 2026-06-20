package drill

import (
  "context"
  "testing"
  "time"
)

func TestStreamNumbersStopsOnCancel(t *testing.T) {
  ctx, cancel := context.WithCancel(context.Background())
  out := StreamNumbers(ctx, 100)
  if <-out != 0 || <-out != 1 {
    t.Fatal("stream did not start at zero")
  }
  cancel()
  select {
  case _, ok := <-out:
    if ok {
      t.Fatal("stream should close after cancellation")
    }
  case <-time.After(time.Second):
    t.Fatal("stream did not close")
  }
}
