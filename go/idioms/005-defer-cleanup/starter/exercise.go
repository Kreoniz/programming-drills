package drill

type Resource struct {
  Closed bool
}

func (r *Resource) Close() error {
  r.Closed = true
  return nil
}

func UseResource(open func() (*Resource, error), work func(*Resource) error) error {
  // TODO: open, defer close, then run work.
  res, err := open()
  if err != nil {
    return err
  }
  return work(res)
}
