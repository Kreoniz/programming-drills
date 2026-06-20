package drill

import (
  "sync"
  "time"
)

type TokenBucket struct {
  mu sync.Mutex
  capacity int
  ratePerSecond int
  tokens int
  last time.Time
}

func NewTokenBucket(capacity, ratePerSecond int, now time.Time) *TokenBucket {
  if capacity < 1 {
    capacity = 1
  }
  if ratePerSecond < 1 {
    ratePerSecond = 1
  }
  return &TokenBucket{capacity: capacity, ratePerSecond: ratePerSecond, tokens: capacity, last: now}
}

func (b *TokenBucket) Allow(now time.Time) bool {
  b.mu.Lock()
  defer b.mu.Unlock()
  elapsed := now.Sub(b.last)
  if elapsed > 0 {
    refill := int(elapsed.Seconds()) * b.ratePerSecond
    if refill > 0 {
      b.tokens += refill
      if b.tokens > b.capacity {
        b.tokens = b.capacity
      }
      b.last = now
    }
  }
  if b.tokens == 0 {
    return false
  }
  b.tokens--
  return true
}
