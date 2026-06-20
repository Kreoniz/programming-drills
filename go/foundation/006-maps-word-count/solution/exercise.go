package drill

import "strings"

func WordCount(text string) map[string]int {
  counts := map[string]int{}
  for _, raw := range strings.Fields(text) {
    word := strings.Trim(strings.ToLower(raw), ".,!?;:\"'()[]{}")
    if word == "" {
      continue
    }
    counts[word]++
  }
  return counts
}
