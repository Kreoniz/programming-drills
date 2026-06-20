package drill

import (
  "bytes"
  "sync"
  "testing"
)

func TestRenderWithPool(t *testing.T) {
  pool := &sync.Pool{New: func() any { return &bytes.Buffer{} }}
  if got := RenderWithPool(pool, []string{"go", "-", "test"}); got != "go-test" {
    t.Fatalf("got %q", got)
  }
  if got := RenderWithPool(pool, []string{"next"}); got != "next" {
    t.Fatalf("buffer was not reset, got %q", got)
  }
}

func BenchmarkRenderWithPool(b *testing.B) {
  pool := &sync.Pool{New: func() any { return &bytes.Buffer{} }}
  for i := 0; i < b.N; i++ {
    _ = RenderWithPool(pool, []string{"a", "b", "c"})
  }
}
