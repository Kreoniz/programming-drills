package drill

import "time"

func IsExpired(now func() time.Time, expiresAt time.Time) bool {
  return !now().Before(expiresAt)
}
