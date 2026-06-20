package drill

import "testing"

func TestParseOptions(t *testing.T) {
  got, err := ParseOptions([]string{"-port", "9090", "-env", "prod", "-debug"})
  if err != nil {
    t.Fatal(err)
  }
  if got.Port != 9090 || got.Env != "prod" || !got.Debug {
    t.Fatalf("got %#v", got)
  }
}
