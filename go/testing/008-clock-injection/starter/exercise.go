package drill

import "time"

func IsExpired(now func() time.Time, expiresAt time.Time) bool {
  // TODO: compare the injected current time with expiresAt.
  return false
}
