package drill

import (
  "errors"
  "strings"
)

var ErrMissingName = errors.New("missing name")
var ErrInvalidEmail = errors.New("invalid email")

type Profile struct {
  Name  string
  Email string
}

func ValidateProfile(profile Profile) error {
  var failures []error
  if strings.TrimSpace(profile.Name) == "" {
    failures = append(failures, ErrMissingName)
  }
  if !strings.Contains(profile.Email, "@") {
    failures = append(failures, ErrInvalidEmail)
  }
  return errors.Join(failures...)
}
