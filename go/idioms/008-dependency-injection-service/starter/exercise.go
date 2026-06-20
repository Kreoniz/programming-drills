package drill

type Sender interface {
  Send(to, body string) error
}

type WelcomeService struct {
  Sender Sender
}

func (s WelcomeService) Welcome(email string) error {
  // TODO: validate and send a welcome message.
  return nil
}
