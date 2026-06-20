package drill

import (
  "net/http"
  "net/http/httptest"
  "testing"
)

func TestWithHeader(t *testing.T) {
  next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusNoContent)
  })
  rec := httptest.NewRecorder()
  WithHeader(next, "X-Trace", "abc").ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/", nil))
  if rec.Header().Get("X-Trace") != "abc" {
    t.Fatalf("missing header: %#v", rec.Header())
  }
  if rec.Code != http.StatusNoContent {
    t.Fatalf("status = %d", rec.Code)
  }
}
