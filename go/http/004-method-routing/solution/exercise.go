package drill

import (
  "fmt"
  "net/http"
)

func StatusHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != http.MethodGet {
    w.Header().Set("Allow", http.MethodGet)
    http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
    return
  }
  fmt.Fprintln(w, "ok")
}
