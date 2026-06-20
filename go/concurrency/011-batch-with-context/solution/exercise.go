package drill

import "context"

func ProcessBatch[T any, U any](ctx context.Context, items []T, fn func(T) U) ([]U, error) {
  out := make([]U, 0, len(items))
  for _, item := range items {
    select {
    case <-ctx.Done():
      return out, ctx.Err()
    default:
    }
    out = append(out, fn(item))
  }
  return out, nil
}
