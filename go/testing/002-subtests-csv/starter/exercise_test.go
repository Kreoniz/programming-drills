package drill

import (
  "reflect"
  "testing"
)

func TestParseCSVLine(t *testing.T) {
  tests := []struct {
    name string
    input string
    want []string
  }{
    {"plain", "a,b,c", []string{"a", "b", "c"}},
    {"quoted comma", "a,\"b,c\",d", []string{"a", "b,c", "d"}},
  }
  for _, tc := range tests {
    t.Run(tc.name, func(t *testing.T) {
      if got := ParseCSVLine(tc.input); !reflect.DeepEqual(got, tc.want) {
        t.Fatalf("got %#v, want %#v", got, tc.want)
      }
    })
  }
}
