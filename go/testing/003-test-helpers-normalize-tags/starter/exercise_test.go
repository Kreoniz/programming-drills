package drill

import (
  "reflect"
  "testing"
)

func TestNormalizeTags(t *testing.T) {
  got := NormalizeTags([]string{" Go ", "react", "GO", "", "React"})
  want := []string{"go", "react"}
  if !reflect.DeepEqual(got, want) {
    t.Fatalf("got %#v, want %#v", got, want)
  }
}
