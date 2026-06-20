package drill

import (
  "context"
  "errors"
  "testing"
  "time"
)

func TestFetchWithContext(t *testing.T) {
  ctx, cancel := context.WithTimeout(context.Background(), 10*time.Millisecond)
  defer cancel()
  _, err := FetchWithContext(ctx, func() (string, error) {
    time.Sleep(50 * time.Millisecond)
    return "late", nil
  })
  if !errors.Is(err, context.DeadlineExceeded) {
    t.Fatalf("expected deadline, got %v", err)
  }
}
