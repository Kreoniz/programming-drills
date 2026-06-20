package drill

import "testing"

func TestCacheGet(t *testing.T) {
  c := NewCache()
  calls := 0
  got := c.Get("a", func() string { calls++; return "one" })
  got = c.Get("a", func() string { calls++; return "two" })
  if got != "one" || calls != 1 {
    t.Fatalf("got %q calls=%d", got, calls)
  }
}
