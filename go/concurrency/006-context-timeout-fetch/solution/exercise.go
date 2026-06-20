package drill

import "context"

type fetchResult struct {
  value string
  err   error
}

func FetchWithContext(ctx context.Context, fetch func() (string, error)) (string, error) {
  done := make(chan fetchResult, 1)
  go func() {
    value, err := fetch()
    done <- fetchResult{value: value, err: err}
  }()
  select {
  case result := <-done:
    return result.value, result.err
  case <-ctx.Done():
    return "", ctx.Err()
  }
}
