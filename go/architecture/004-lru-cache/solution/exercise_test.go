package drill

import "testing"

func TestLRUEvictsLeastRecentlyUsed(t *testing.T) {
  cache := NewLRU(2)
  cache.Put("a", "one")
  cache.Put("b", "two")
  if _, ok := cache.Get("a"); !ok {
    t.Fatal("expected a")
  }
  cache.Put("c", "three")
  if _, ok := cache.Get("b"); ok {
    t.Fatal("b should have been evicted")
  }
  if got, ok := cache.Get("a"); !ok || got != "one" {
    t.Fatalf("a = %q ok=%v", got, ok)
  }
}
