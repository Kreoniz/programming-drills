package drill

import (
  "context"
  "errors"
  "testing"
)

func TestProcessBatchContext(t *testing.T) {
  ctx, cancel := context.WithCancel(context.Background())
  calls := 0
  got, err := ProcessBatch(ctx, []int{1, 2, 3}, func(v int) int {
    calls++
    if calls == 2 {
      cancel()
    }
    return v * 2
  })
  if !errors.Is(err, context.Canceled) {
    t.Fatalf("expected cancel error, got %v", err)
  }
  if len(got) != 2 || got[0] != 2 || got[1] != 4 {
    t.Fatalf("partial results = %#v", got)
  }
}
