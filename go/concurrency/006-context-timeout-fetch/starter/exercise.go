package drill

import "context"

func FetchWithContext(ctx context.Context, fetch func() (string, error)) (string, error) {
  // TODO: race fetch against ctx.Done().
  return fetch()
}
