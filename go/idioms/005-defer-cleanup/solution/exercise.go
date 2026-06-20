package drill

type Resource struct {
  Closed bool
}

func (r *Resource) Close() error {
  r.Closed = true
  return nil
}

func UseResource(open func() (*Resource, error), work func(*Resource) error) error {
  res, err := open()
  if err != nil {
    return err
  }
  defer res.Close()
  return work(res)
}
