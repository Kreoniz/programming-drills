package drill

import (
  "context"
  "net/http"
)

type requestIDKey struct{}

func RequestID(ctx context.Context) string {
  value, _ := ctx.Value(requestIDKey{}).(string)
  return value
}

func RequestIDMiddleware(next http.Handler, nextID func() string) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    id := r.Header.Get("X-Request-ID")
    if id == "" {
      id = nextID()
    }
    w.Header().Set("X-Request-ID", id)
    ctx := context.WithValue(r.Context(), requestIDKey{}, id)
    next.ServeHTTP(w, r.WithContext(ctx))
  })
}
