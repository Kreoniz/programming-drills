package drill

import (
  "errors"
  "testing"
)

func TestUseResourceClosesOnError(t *testing.T) {
  res := &Resource{}
  workErr := errors.New("work failed")
  err := UseResource(func() (*Resource, error) {
    return res, nil
  }, func(*Resource) error {
    return workErr
  })
  if !errors.Is(err, workErr) {
    t.Fatalf("got error %v", err)
  }
  if !res.Closed {
    t.Fatal("resource was not closed")
  }
}
