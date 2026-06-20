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
  // TODO: attach request id to context and response header.
  return next
}
