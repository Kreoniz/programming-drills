package drill

import "testing"

func TestParseModulePath(t *testing.T) {
  host, owner, name, ok := ParseModulePath("github.com/acme/widget")
  if !ok || host != "github.com" || owner != "acme" || name != "widget" {
    t.Fatalf("got host=%q owner=%q name=%q ok=%v", host, owner, name, ok)
  }
  if _, _, _, ok := ParseModulePath("github.com/acme"); ok {
    t.Fatal("short module path should fail")
  }
}
