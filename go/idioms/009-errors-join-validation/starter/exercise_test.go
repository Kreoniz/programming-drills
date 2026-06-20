package drill

import (
  "errors"
  "testing"
)

func TestValidateProfileJoinsErrors(t *testing.T) {
  err := ValidateProfile(Profile{Name: " ", Email: "bad"})
  if !errors.Is(err, ErrMissingName) || !errors.Is(err, ErrInvalidEmail) {
    t.Fatalf("joined error = %v", err)
  }
  if err := ValidateProfile(Profile{Name: "Ada", Email: "ada@example.com"}); err != nil {
    t.Fatalf("valid profile got %v", err)
  }
}
