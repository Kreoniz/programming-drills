package drill

func FanIn(a, b <-chan int) <-chan int {
  // TODO: merge both channels and close output when done.
  out := make(chan int)
  close(out)
  return out
}
