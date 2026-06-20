package drill

import "strings"

func NormalizeTags(tags []string) []string {
  seen := map[string]bool{}
  out := []string{}
  for _, tag := range tags {
    tag = strings.ToLower(strings.TrimSpace(tag))
    if tag == "" || seen[tag] {
      continue
    }
    seen[tag] = true
    out = append(out, tag)
  }
  return out
}
