package drill

import (
  "errors"
  "fmt"
)

var ErrUserNotFound = errors.New("user not found")

func LoadUser(users map[string]string, id string) (string, error) {
  name, ok := users[id]
  if !ok {
    return "", fmt.Errorf("load user %s: %w", id, ErrUserNotFound)
  }
  return name, nil
}
