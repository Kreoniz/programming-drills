package drill

import "testing"

func TestParsePort(t *testing.T) {
  got, err := ParsePort("8080")
  if err != nil || got != 8080 {
    t.Fatalf("got %d err %v", got, err)
  }
  for _, input := range []string{"abc", "0", "70000"} {
    if _, err := ParsePort(input); err == nil {
      t.Fatalf("ParsePort(%q) expected error", input)
    }
  }
}
