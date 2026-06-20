package drill

import (
  "fmt"
  "net/http"
)

func GreetHandler(w http.ResponseWriter, r *http.Request) {
  name := r.URL.Query().Get("name")
  if name == "" {
    name = "guest"
  }
  fmt.Fprintf(w, "hello %s\n", name)
}
