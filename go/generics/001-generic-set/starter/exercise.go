package drill

type Set[T comparable] struct {
  values map[T]struct{}
}

func NewSet[T comparable]() *Set[T] {
  // TODO: initialize the set.
  return &Set[T]{}
}

func (s *Set[T]) Add(value T) {}
func (s *Set[T]) Delete(value T) {}
func (s *Set[T]) Has(value T) bool { return false }
func (s *Set[T]) Len() int { return 0 }
