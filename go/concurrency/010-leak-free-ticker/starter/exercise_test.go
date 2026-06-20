package drill

import (
  "context"
  "testing"
  "time"
)

func TestStartTickerClosesOnCancel(t *testing.T) {
  ctx, cancel := context.WithCancel(context.Background())
  ticks := StartTicker(ctx, time.Millisecond)
  select {
  case _, ok := <-ticks:
    if !ok {
      t.Fatal("ticker closed before first tick")
    }
  case <-time.After(time.Second):
    t.Fatal("ticker did not produce first tick")
  }
  cancel()
  select {
  case _, ok := <-ticks:
    if ok {
      t.Fatal("ticker channel should close after cancellation")
    }
  case <-time.After(time.Second):
    t.Fatal("ticker did not stop")
  }
}
