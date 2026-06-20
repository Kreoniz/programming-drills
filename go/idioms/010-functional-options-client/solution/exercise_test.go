package drill

import "testing"

func TestNewClientFunctionalOptions(t *testing.T) {
  def := NewClient()
  if def.BaseURL != "http://localhost" || def.Retries != 2 {
    t.Fatalf("defaults = %#v", def)
  }
  got := NewClient(WithBaseURL("https://api.example.com"), WithRetries(5))
  if got.BaseURL != "https://api.example.com" || got.Retries != 5 {
    t.Fatalf("configured = %#v", got)
  }
  got = NewClient(WithRetries(-1))
  if got.Retries != 2 {
    t.Fatalf("negative retries should be ignored: %#v", got)
  }
}
