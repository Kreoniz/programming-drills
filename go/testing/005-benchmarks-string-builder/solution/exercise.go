package drill

import "strings"

func ConcatLabels(labels []string) string {
  return strings.Join(labels, ",")
}
