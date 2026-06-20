package drill

import (
  "reflect"
  "testing"
)

func TestBuildIndex(t *testing.T) {
  got := BuildIndex([]string{"Go go react", "React testing"})
  if !reflect.DeepEqual(got["go"], []int{0}) {
    t.Fatalf("go index = %#v", got["go"])
  }
  if !reflect.DeepEqual(got["react"], []int{0, 1}) {
    t.Fatalf("react index = %#v", got["react"])
  }
}

func BenchmarkBuildIndex(b *testing.B) {
  docs := []string{"Go services use tests", "React apps use tests", "Go and React share APIs"}
  for i := 0; i < b.N; i++ {
    _ = BuildIndex(docs)
  }
}
