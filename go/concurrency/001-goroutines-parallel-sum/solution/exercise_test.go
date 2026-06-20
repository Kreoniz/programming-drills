package drill

import "testing"

func TestParallelSum(t *testing.T) {
  got := ParallelSum([]int{1, 2, 3, 4, 5, 6}, 3)
  if got != 21 {
    t.Fatalf("sum = %d", got)
  }
  if got := ParallelSum([]int{1, 2}, 0); got != 3 {
    t.Fatalf("zero workers should still work, got %d", got)
  }
}
