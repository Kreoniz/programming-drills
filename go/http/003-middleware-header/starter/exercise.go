package drill

import "net/http"

func WithHeader(next http.Handler, key, value string) http.Handler {
  // TODO: set the header and delegate to next.
  return next
}
