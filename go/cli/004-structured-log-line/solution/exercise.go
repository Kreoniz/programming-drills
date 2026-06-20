package drill

import (
  "fmt"
  "io"
  "sort"
)

func WriteLogLine(w io.Writer, level string, message string, fields map[string]string) error {
  if _, err := fmt.Fprintf(w, "%s %s", level, message); err != nil {
    return err
  }
  keys := make([]string, 0, len(fields))
  for key := range fields {
    keys = append(keys, key)
  }
  sort.Strings(keys)
  for _, key := range keys {
    if _, err := fmt.Fprintf(w, " %s=%s", key, fields[key]); err != nil {
      return err
    }
  }
  _, err := fmt.Fprintln(w)
  return err
}
