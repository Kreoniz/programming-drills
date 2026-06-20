package drill

import "strings"

func ParseModulePath(modulePath string) (host string, owner string, name string, ok bool) {
  parts := strings.Split(modulePath, "/")
  if len(parts) < 3 || parts[0] == "" || parts[1] == "" || parts[2] == "" {
    return "", "", "", false
  }
  return parts[0], parts[1], parts[2], true
}
