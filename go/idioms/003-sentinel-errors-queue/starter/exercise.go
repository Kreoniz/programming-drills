package drill

import "errors"

var ErrEmpty = errors.New("queue is empty")

type Queue struct {
  items []string
}

func (q *Queue) Push(value string) {
  // TODO: append to the queue.
}

func (q *Queue) Pop() (string, error) {
  // TODO: pop FIFO or return ErrEmpty.
  return "", nil
}
