package drill

import "sync"

func FanIn(a, b <-chan int) <-chan int {
  out := make(chan int)
  var wg sync.WaitGroup
  forward := func(ch <-chan int) {
    defer wg.Done()
    for v := range ch {
      out <- v
    }
  }
  wg.Add(2)
  go forward(a)
  go forward(b)
  go func() {
    wg.Wait()
    close(out)
  }()
  return out
}
