package drill

import (
  "errors"
  "testing"
)

func TestQueuePop(t *testing.T) {
  var q Queue
  if _, err := q.Pop(); !errors.Is(err, ErrEmpty) {
    t.Fatalf("empty pop error = %v", err)
  }
  q.Push("first")
  q.Push("second")
  got, err := q.Pop()
  if err != nil || got != "first" {
    t.Fatalf("got %q err %v", got, err)
  }
}
