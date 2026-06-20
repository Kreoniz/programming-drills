package drill

import "errors"

var ErrUserNotFound = errors.New("user not found")

func LoadUser(users map[string]string, id string) (string, error) {
  // TODO: load the user or wrap ErrUserNotFound.
  return "", nil
}
