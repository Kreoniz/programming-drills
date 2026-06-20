package drill

import "context"

func ProcessBatch[T any, U any](ctx context.Context, items []T, fn func(T) U) ([]U, error) {
  // TODO: process in order until context cancellation.
  return nil, nil
}
