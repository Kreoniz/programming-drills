package drill

type Window struct {
  Width  int
  Height int
}

func (w Window) Area() int {
  // TODO: calculate area.
  return 0
}

func (w *Window) Scale(factor int) {
  // TODO: mutate width and height for positive factors.
}
