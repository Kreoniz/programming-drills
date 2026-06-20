package drill

import (
  "strings"
  "unicode"
)

func Slugify(title string) string {
  var b strings.Builder
  lastDash := false
  for _, r := range strings.ToLower(title) {
    if unicode.IsLetter(r) || unicode.IsDigit(r) {
      b.WriteRune(r)
      lastDash = false
      continue
    }
    if !lastDash && b.Len() > 0 {
      b.WriteByte('-')
      lastDash = true
    }
  }
  return strings.Trim(b.String(), "-")
}
