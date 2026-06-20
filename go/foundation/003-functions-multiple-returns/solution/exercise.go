package drill

import "strings"

func SplitName(full string) (first string, last string, ok bool) {
  parts := strings.Fields(full)
  if len(parts) < 2 {
    return "", "", false
  }
  return strings.Join(parts[:len(parts)-1], " "), parts[len(parts)-1], true
}
