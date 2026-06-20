package drill

import (
  "errors"
  "testing"
)

func TestValidateUsername(t *testing.T) {
  var ve *ValidationError
  if err := ValidateUsername("ab"); !errors.As(err, &ve) || ve.Field != "username" {
    t.Fatalf("expected username validation error, got %v", err)
  }
  if err := ValidateUsername("ada_lovelace"); err != nil {
    t.Fatalf("valid username got error %v", err)
  }
}
