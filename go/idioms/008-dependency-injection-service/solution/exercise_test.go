package drill

import "testing"

type senderSpy struct{ to []string }
func (s *senderSpy) Send(to, body string) error { s.to = append(s.to, to); return nil }

func TestWelcomeService(t *testing.T) {
  spy := &senderSpy{}
  svc := WelcomeService{Sender: spy}
  if err := svc.Welcome("ada@example.com"); err != nil {
    t.Fatalf("welcome failed: %v", err)
  }
  if len(spy.to) != 1 || spy.to[0] != "ada@example.com" {
    t.Fatalf("send calls = %#v", spy.to)
  }
  if err := svc.Welcome("not-email"); err == nil {
    t.Fatal("invalid email should fail")
  }
}
