package drill

import (
  "fmt"
  "strconv"
)

type Config struct {
  Port int
  Env  string
}

func LoadConfig(lookup func(string) (string, bool)) (Config, error) {
  cfg := Config{Port: 8080, Env: "dev"}
  if raw, ok := lookup("APP_ENV"); ok && raw != "" {
    cfg.Env = raw
  }
  if raw, ok := lookup("APP_PORT"); ok && raw != "" {
    port, err := strconv.Atoi(raw)
    if err != nil || port < 1 || port > 65535 {
      return Config{}, fmt.Errorf("invalid APP_PORT")
    }
    cfg.Port = port
  }
  return cfg, nil
}
