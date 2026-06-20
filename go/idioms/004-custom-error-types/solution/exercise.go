package drill

import (
  "fmt"
  "unicode"
)

type ValidationError struct {
  Field  string
  Reason string
}

func (e *ValidationError) Error() string {
  return fmt.Sprintf("%s: %s", e.Field, e.Reason)
}

func ValidateUsername(username string) error {
  if len(username) < 3 {
    return &ValidationError{Field: "username", Reason: "must be at least 3 characters"}
  }
  for _, r := range username {
    if !(unicode.IsLetter(r) || unicode.IsDigit(r) || r == '_') {
      return &ValidationError{Field: "username", Reason: "contains invalid character"}
    }
  }
  return nil
}
