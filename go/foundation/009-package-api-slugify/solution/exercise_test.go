package drill

import "testing"

func TestSlugify(t *testing.T) {
  tests := map[string]string{
    "Go Modules: A Practical Start!": "go-modules-a-practical-start",
    "  React   Performance  ": "react-performance",
  }
  for input, want := range tests {
    if got := Slugify(input); got != want {
      t.Fatalf("Slugify(%q) = %q, want %q", input, got, want)
    }
  }
}
