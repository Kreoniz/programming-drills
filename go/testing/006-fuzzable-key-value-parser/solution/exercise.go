package drill

import "strings"

func ParseKeyValue(input string) (key string, value string, ok bool) {
  before, after, found := strings.Cut(input, "=")
  if !found || before == "" {
    return "", "", false
  }
  return before, after, true
}
