package drill

type Window struct {
  Width  int
  Height int
}

func (w Window) Area() int {
  return w.Width * w.Height
}

func (w *Window) Scale(factor int) {
  if factor <= 0 {
    return
  }
  w.Width *= factor
  w.Height *= factor
}
