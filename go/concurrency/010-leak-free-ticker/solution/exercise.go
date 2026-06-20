package drill

import (
  "context"
  "time"
)

func StartTicker(ctx context.Context, interval time.Duration) <-chan time.Time {
  out := make(chan time.Time)
  ticker := time.NewTicker(interval)
  go func() {
    defer close(out)
    defer ticker.Stop()
    for {
      select {
      case <-ctx.Done():
        return
      case t := <-ticker.C:
        select {
        case <-ctx.Done():
          return
        case out <- t:
        }
      }
    }
  }()
  return out
}
