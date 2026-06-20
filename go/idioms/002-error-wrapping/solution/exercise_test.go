package drill

import (
  "errors"
  "testing"
)

func TestLoadUserWrapsNotFound(t *testing.T) {
  _, err := LoadUser(map[string]string{"1": "Ada"}, "2")
  if !errors.Is(err, ErrUserNotFound) {
    t.Fatalf("error %v should wrap ErrUserNotFound", err)
  }
  got, err := LoadUser(map[string]string{"1": "Ada"}, "1")
  if err != nil || got != "Ada" {
    t.Fatalf("got %q err %v", got, err)
  }
}
