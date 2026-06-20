package drill

import "context"

func StreamNumbers(ctx context.Context, max int) <-chan int {
  // TODO: stream numbers until max or cancellation.
  out := make(chan int)
  close(out)
  return out
}
