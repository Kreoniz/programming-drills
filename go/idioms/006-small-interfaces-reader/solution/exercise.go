package drill

import (
  "fmt"
  "io"
)

func ReadAllLimited(r io.Reader, limit int) (string, error) {
  if limit < 0 {
    return "", fmt.Errorf("limit must be non-negative")
  }
  data, err := io.ReadAll(io.LimitReader(r, int64(limit)+1))
  if err != nil {
    return "", err
  }
  if len(data) > limit {
    return "", fmt.Errorf("input exceeds %d bytes", limit)
  }
  return string(data), nil
}
