package drill

import (
  "net/http"
  "net/http/httptest"
  "testing"
)

func TestRequestIDMiddleware(t *testing.T) {
  var seen string
  next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    seen = RequestID(r.Context())
  })
  rec := httptest.NewRecorder()
  RequestIDMiddleware(next, func() string { return "generated" }).ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/", nil))
  if seen != "generated" || rec.Header().Get("X-Request-ID") != "generated" {
    t.Fatalf("seen=%q header=%q", seen, rec.Header().Get("X-Request-ID"))
  }
}
