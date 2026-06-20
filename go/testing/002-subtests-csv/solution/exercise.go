package drill

import "strings"

func ParseCSVLine(line string) []string {
  var out []string
  var b strings.Builder
  inQuotes := false
  for _, r := range line {
    switch r {
    case '"':
      inQuotes = !inQuotes
    case ',':
      if inQuotes {
        b.WriteRune(r)
      } else {
        out = append(out, b.String())
        b.Reset()
      }
    default:
      b.WriteRune(r)
    }
  }
  out = append(out, b.String())
  return out
}
