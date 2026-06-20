package drill

import (
  "os"
  "path/filepath"
  "strings"
)

func WriteReport(path string, lines []string) error {
  if err := os.MkdirAll(filepath.Dir(path), 0755); err != nil {
    return err
  }
  body := strings.Join(lines, "\n")
  if body != "" {
    body += "\n"
  }
  return os.WriteFile(path, []byte(body), 0644)
}
