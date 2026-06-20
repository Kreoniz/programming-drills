package drill

import (
  "context"
  "time"
)

func StartTicker(ctx context.Context, interval time.Duration) <-chan time.Time {
  // TODO: tick until ctx cancellation and close output.
  out := make(chan time.Time)
  close(out)
  return out
}
