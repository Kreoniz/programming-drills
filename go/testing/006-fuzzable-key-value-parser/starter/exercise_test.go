package drill

import "testing"

func TestParseKeyValue(t *testing.T) {
  key, value, ok := ParseKeyValue("mode=debug")
  if !ok || key != "mode" || value != "debug" {
    t.Fatalf("got %q %q ok=%v", key, value, ok)
  }
  if _, _, ok := ParseKeyValue("missing"); ok {
    t.Fatal("missing equals should fail")
  }
}

func FuzzParseKeyValue(f *testing.F) {
  f.Add("a=b")
  f.Fuzz(func(t *testing.T, input string) {
    key, _, ok := ParseKeyValue(input)
    if ok && key == "" {
      t.Fatalf("empty key accepted for %q", input)
    }
  })
}
