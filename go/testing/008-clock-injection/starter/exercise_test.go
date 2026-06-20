package drill

import (
  "testing"
  "time"
)

func TestIsExpired(t *testing.T) {
  now := time.Date(2026, 1, 1, 12, 0, 0, 0, time.UTC)
  if !IsExpired(func() time.Time { return now }, now.Add(-time.Second)) {
    t.Fatal("past deadline should be expired")
  }
  if IsExpired(func() time.Time { return now }, now.Add(time.Second)) {
    t.Fatal("future deadline should not be expired")
  }
}
