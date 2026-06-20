package drill

import "errors"

var ErrMissingName = errors.New("missing name")
var ErrInvalidEmail = errors.New("invalid email")

type Profile struct {
  Name  string
  Email string
}

func ValidateProfile(profile Profile) error {
  // TODO: join all validation failures.
  return nil
}
