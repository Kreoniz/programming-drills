package drill

func DedupeStable(values []string) []string {
  seen := map[string]bool{}
  out := make([]string, 0, len(values))
  for _, value := range values {
    if seen[value] {
      continue
    }
    seen[value] = true
    out = append(out, value)
  }
  return out
}
