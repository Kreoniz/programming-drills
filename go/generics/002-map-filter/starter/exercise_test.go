package drill

import (
  "reflect"
  "testing"
)

func TestMapFilter(t *testing.T) {
  evens := FilterSlice([]int{1, 2, 3, 4}, func(v int) bool { return v%2 == 0 })
  labels := MapSlice(evens, func(v int) string { return "n" + string(rune('0'+v)) })
  if !reflect.DeepEqual(labels, []string{"n2", "n4"}) {
    t.Fatalf("got %#v", labels)
  }
}
