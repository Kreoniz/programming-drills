package drill

import (
  "fmt"
  "strconv"
)

func ParsePort(raw string) (int, error) {
  port, err := strconv.Atoi(raw)
  if err != nil {
    return 0, fmt.Errorf("parse port %q: %w", raw, err)
  }
  if port < 1 || port > 65535 {
    return 0, fmt.Errorf("port %d out of range", port)
  }
  return port, nil
}
