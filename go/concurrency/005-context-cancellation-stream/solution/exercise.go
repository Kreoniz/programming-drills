package drill

import "context"

func StreamNumbers(ctx context.Context, max int) <-chan int {
  out := make(chan int)
  go func() {
    defer close(out)
    for i := 0; i < max; i++ {
      select {
      case <-ctx.Done():
        return
      default:
      }
      select {
      case <-ctx.Done():
        return
      case out <- i:
      }
    }
  }()
  return out
}
