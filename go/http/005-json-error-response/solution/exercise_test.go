package drill

import (
  "encoding/json"
  "net/http"
  "net/http/httptest"
  "testing"
)

func TestWriteJSONError(t *testing.T) {
  rec := httptest.NewRecorder()
  WriteJSONError(rec, http.StatusBadRequest, "bad input")
  if rec.Code != http.StatusBadRequest {
    t.Fatalf("status = %d", rec.Code)
  }
  if rec.Header().Get("Content-Type") != "application/json" {
    t.Fatalf("content-type = %q", rec.Header().Get("Content-Type"))
  }
  var body map[string]string
  if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
    t.Fatal(err)
  }
  if body["error"] != "bad input" {
    t.Fatalf("body = %#v", body)
  }
}
