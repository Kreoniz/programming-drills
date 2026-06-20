package drill

import "testing"

func TestClamp(t *testing.T) {
  tests := []struct {
    name string
    value, min, max int
    want int
  }{
    {"inside", 5, 1, 10, 5},
    {"low", -1, 0, 10, 0},
    {"high", 99, 0, 10, 10},
    {"swapped", 5, 10, 0, 5},
  }
  for _, tc := range tests {
    t.Run(tc.name, func(t *testing.T) {
      if got := Clamp(tc.value, tc.min, tc.max); got != tc.want {
        t.Fatalf("got %d, want %d", got, tc.want)
      }
    })
  }
}
