package drill

import (
  "sort"
  "testing"
  "time"
)

func TestFanIn(t *testing.T) {
  a := make(chan int, 2)
  b := make(chan int, 2)
  a <- 1; a <- 3; close(a)
  b <- 2; b <- 4; close(b)
  out := FanIn(a, b)
  var got []int
  for v := range out {
    got = append(got, v)
  }
  sort.Ints(got)
  if len(got) != 4 || got[0] != 1 || got[3] != 4 {
    t.Fatalf("got %#v", got)
  }
  select {
  case _, ok := <-out:
    if ok { t.Fatal("output should be closed") }
  case <-time.After(time.Second):
    t.Fatal("fan-in did not close")
  }
}
