package drill

type ValidationError struct {
  Field  string
  Reason string
}

func (e *ValidationError) Error() string {
  // TODO: include field and reason.
  return ""
}

func ValidateUsername(username string) error {
  // TODO: validate username and return *ValidationError on failure.
  return nil
}
