package drill

import "strings"

func BuildIndex(docs []string) map[string][]int {
  index := map[string][]int{}
  for docID, doc := range docs {
    seenInDoc := map[string]bool{}
    for _, word := range strings.Fields(strings.ToLower(doc)) {
      if seenInDoc[word] {
        continue
      }
      seenInDoc[word] = true
      index[word] = append(index[word], docID)
    }
  }
  return index
}
