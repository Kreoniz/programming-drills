package drill

import "testing"

func TestWindowMethods(t *testing.T) {
  w := Window{Width: 10, Height: 5}
  if got := w.Area(); got != 50 {
    t.Fatalf("area = %d", got)
  }
  w.Scale(3)
  if w.Width != 30 || w.Height != 15 {
    t.Fatalf("scaled window = %#v", w)
  }
  w.Scale(0)
  if w.Width != 30 || w.Height != 15 {
    t.Fatalf("non-positive scale should be ignored: %#v", w)
  }
}
