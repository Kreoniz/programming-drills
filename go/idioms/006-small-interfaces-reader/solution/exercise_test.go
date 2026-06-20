package drill

import (
  "strings"
  "testing"
)

func TestReadAllLimited(t *testing.T) {
  got, err := ReadAllLimited(strings.NewReader("hello"), 10)
  if err != nil || got != "hello" {
    t.Fatalf("got %q err %v", got, err)
  }
  if _, err := ReadAllLimited(strings.NewReader("toolong"), 3); err == nil {
    t.Fatal("expected limit error")
  }
}
