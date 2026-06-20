package drill

import "testing"

func TestConcatLabels(t *testing.T) {
  if got := ConcatLabels([]string{"api", "web", "db"}); got != "api,web,db" {
    t.Fatalf("got %q", got)
  }
}

func BenchmarkConcatLabels(b *testing.B) {
  labels := []string{"api", "web", "db", "worker", "cache"}
  for i := 0; i < b.N; i++ {
    _ = ConcatLabels(labels)
  }
}
