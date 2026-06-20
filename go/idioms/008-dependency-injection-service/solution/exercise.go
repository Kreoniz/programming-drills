package drill

import (
  "fmt"
  "strings"
)

type Sender interface {
  Send(to, body string) error
}

type WelcomeService struct {
  Sender Sender
}

func (s WelcomeService) Welcome(email string) error {
  if !strings.Contains(email, "@") {
    return fmt.Errorf("invalid email")
  }
  return s.Sender.Send(email, "welcome")
}
