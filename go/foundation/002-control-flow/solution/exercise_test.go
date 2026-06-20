package drill

import "testing"

func TestShippingBand(t *testing.T) {
  tests := []struct {
    name      string
    weight    int
    expedited bool
    want      string
  }{
    {"invalid", 0, false, "invalid"},
    {"letter", 50, false, "letter"},
    {"letter express", 100, true, "letter-express"},
    {"parcel", 750, false, "parcel"},
    {"freight express", 3000, true, "freight-express"},
  }
  for _, tc := range tests {
    t.Run(tc.name, func(t *testing.T) {
      if got := ShippingBand(tc.weight, tc.expedited); got != tc.want {
        t.Fatalf("got %q, want %q", got, tc.want)
      }
    })
  }
}
