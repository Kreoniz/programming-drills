package drill

import "testing"

func TestInitials(t *testing.T) {
  tests := map[string]string{
    "Ada Lovelace": "AL",
    "  grace   hopper ": "GH",
    "søren kierkegaard": "SK",
  }
  for input, want := range tests {
    if got := Initials(input); got != want {
      t.Fatalf("Initials(%q) = %q, want %q", input, got, want)
    }
  }
}
