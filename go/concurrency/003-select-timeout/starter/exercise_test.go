package drill

import (
  "testing"
  "time"
)

func TestWaitForString(t *testing.T) {
  ch := make(chan string, 1)
  ch <- "ready"
  got, ok := WaitForString(ch, time.Second)
  if !ok || got != "ready" {
    t.Fatalf("got %q ok=%v", got, ok)
  }
  _, ok = WaitForString(make(chan string), 10*time.Millisecond)
  if ok {
    t.Fatal("timeout should return ok=false")
  }
}
