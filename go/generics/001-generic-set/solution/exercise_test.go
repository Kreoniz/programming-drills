package drill

import "testing"

func TestSet(t *testing.T) {
  s := NewSet[string]()
  s.Add("go")
  s.Add("go")
  s.Add("react")
  if !s.Has("go") || s.Len() != 2 {
    t.Fatalf("set failed: %#v", s)
  }
  s.Delete("go")
  if s.Has("go") {
    t.Fatal("delete failed")
  }
}
