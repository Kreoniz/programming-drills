package drill

import (
  "strings"
  "unicode"
)

func Initials(name string) string {
  var b strings.Builder
  for _, field := range strings.Fields(name) {
    for _, r := range field {
      b.WriteRune(unicode.ToUpper(r))
      break
    }
  }
  return b.String()
}
