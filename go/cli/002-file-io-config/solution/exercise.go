package drill

import (
  "bufio"
  "os"
  "strings"
)

func ReadConfig(path string) (map[string]string, error) {
  f, err := os.Open(path)
  if err != nil {
    return nil, err
  }
  defer f.Close()
  cfg := map[string]string{}
  scanner := bufio.NewScanner(f)
  for scanner.Scan() {
    line := strings.TrimSpace(scanner.Text())
    if line == "" || strings.HasPrefix(line, "#") {
      continue
    }
    key, value, ok := strings.Cut(line, "=")
    if ok {
      cfg[strings.TrimSpace(key)] = strings.TrimSpace(value)
    }
  }
  if err := scanner.Err(); err != nil {
    return nil, err
  }
  return cfg, nil
}
