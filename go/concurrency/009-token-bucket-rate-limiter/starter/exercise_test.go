package drill

import (
  "testing"
  "time"
)

func TestTokenBucketAllow(t *testing.T) {
  now := time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC)
  bucket := NewTokenBucket(2, 1, now)
  if !bucket.Allow(now) || !bucket.Allow(now) {
    t.Fatal("bucket should start full")
  }
  if bucket.Allow(now) {
    t.Fatal("third immediate request should be denied")
  }
  if !bucket.Allow(now.Add(2 * time.Second)) {
    t.Fatal("bucket should refill after elapsed seconds")
  }
}
