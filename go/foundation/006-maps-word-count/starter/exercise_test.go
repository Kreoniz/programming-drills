package drill

import "testing"

func TestWordCount(t *testing.T) {
  got := WordCount("Go, go! React; go.")
  if got["go"] != 3 {
    t.Fatalf("go count = %d", got["go"])
  }
  if got["react"] != 1 {
    t.Fatalf("react count = %d", got["react"])
  }
}
