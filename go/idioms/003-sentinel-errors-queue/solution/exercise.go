package drill

import "errors"

var ErrEmpty = errors.New("queue is empty")

type Queue struct {
  items []string
}

func (q *Queue) Push(value string) {
  q.items = append(q.items, value)
}

func (q *Queue) Pop() (string, error) {
  if len(q.items) == 0 {
    return "", ErrEmpty
  }
  value := q.items[0]
  q.items = q.items[1:]
  return value, nil
}
