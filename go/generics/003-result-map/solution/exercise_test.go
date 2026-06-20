package drill

import (
  "errors"
  "testing"
)

func TestMapResult(t *testing.T) {
  got := MapResult(Ok(21), func(v int) string { return string(rune('A' + v - 21)) })
  if got.Err != nil || got.Value != "A" {
    t.Fatalf("mapped = %#v", got)
  }
  boom := errors.New("boom")
  failed := MapResult(Err[int](boom), func(v int) string { return "nope" })
  if !errors.Is(failed.Err, boom) {
    t.Fatalf("error not preserved: %#v", failed)
  }
}
