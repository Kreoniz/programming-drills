package drill

import "testing"

func TestSplitName(t *testing.T) {
  first, last, ok := SplitName("  Ada Lovelace  ")
  if !ok || first != "Ada" || last != "Lovelace" {
    t.Fatalf("got %q %q ok=%v", first, last, ok)
  }
  first, last, ok = SplitName("Grace Brewster Hopper")
  if !ok || first != "Grace Brewster" || last != "Hopper" {
    t.Fatalf("multi-part name got %q %q ok=%v", first, last, ok)
  }
  _, _, ok = SplitName("Prince")
  if ok {
    t.Fatal("single-token name should not parse")
  }
}
