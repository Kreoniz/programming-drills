package drill

import (
  "strings"
  "testing"
)

func TestDecodeUser(t *testing.T) {
  got, err := DecodeUser(strings.NewReader(
`{"name":"Ada","age":36}`))
      if err != nil || got.Name != "Ada" || got.Age != 36 {
        t.Fatalf("got %#v err %v", got, err)
      }
      if _, err := DecodeUser(strings.NewReader(`{"name":"Ada","age":36,"extra":true}`)); err == nil {
        t.Fatal("unknown fields should fail")
      }
    }
  