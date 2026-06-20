package drill

import (
  "net/http"
  "net/http/httptest"
  "testing"
)

func TestGreetHandler(t *testing.T) {
  req := httptest.NewRequest(http.MethodGet, "/?name=Ada", nil)
  rec := httptest.NewRecorder()
  GreetHandler(rec, req)
  if rec.Code != http.StatusOK {
    t.Fatalf("status = %d", rec.Code)
  }
  if rec.Body.String() != "hello Ada\n" {
    t.Fatalf("body = %q", rec.Body.String())
  }
}
