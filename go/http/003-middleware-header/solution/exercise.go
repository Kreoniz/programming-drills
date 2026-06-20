package drill

import "net/http"

func WithHeader(next http.Handler, key, value string) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set(key, value)
    next.ServeHTTP(w, r)
  })
}
