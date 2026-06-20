package drill

import "time"

type TokenBucket struct {
  capacity int
  ratePerSecond int
  tokens int
  last time.Time
}

func NewTokenBucket(capacity, ratePerSecond int, now time.Time) *TokenBucket {
  // TODO: initialize a full bucket.
  return &TokenBucket{}
}

func (b *TokenBucket) Allow(now time.Time) bool {
  // TODO: refill and consume one token if available.
  return false
}
