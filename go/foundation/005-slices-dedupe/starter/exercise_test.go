package drill

import (
  "reflect"
  "testing"
)

func TestDedupeStable(t *testing.T) {
  got := DedupeStable([]string{"go", "ts", "go", "react", "ts"})
  want := []string{"go", "ts", "react"}
  if !reflect.DeepEqual(got, want) {
    t.Fatalf("got %#v, want %#v", got, want)
  }
}
