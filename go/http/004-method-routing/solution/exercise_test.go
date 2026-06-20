package drill

import (
  "net/http"
  "net/http/httptest"
  "testing"
)

func TestStatusHandler(t *testing.T) {
  rec := httptest.NewRecorder()
  StatusHandler(rec, httptest.NewRequest(http.MethodGet, "/status", nil))
  if rec.Code != http.StatusOK || rec.Body.String() != "ok\n" {
    t.Fatalf("GET status=%d body=%q", rec.Code, rec.Body.String())
  }
  rec = httptest.NewRecorder()
  StatusHandler(rec, httptest.NewRequest(http.MethodPost, "/status", nil))
  if rec.Code != http.StatusMethodNotAllowed || rec.Header().Get("Allow") != http.MethodGet {
    t.Fatalf("POST status=%d allow=%q", rec.Code, rec.Header().Get("Allow"))
  }
}
