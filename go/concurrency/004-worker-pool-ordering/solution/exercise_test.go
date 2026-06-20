package drill

import (
  "reflect"
  "testing"
)

func TestProcessJobs(t *testing.T) {
  got := ProcessJobs([]int{1, 2, 3, 4}, 2, func(v int) int { return v * v })
  want := []int{1, 4, 9, 16}
  if !reflect.DeepEqual(got, want) {
    t.Fatalf("got %#v, want %#v", got, want)
  }
}
