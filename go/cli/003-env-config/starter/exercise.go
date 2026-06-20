package drill

type Config struct {
  Port int
  Env  string
}

func LoadConfig(lookup func(string) (string, bool)) (Config, error) {
  // TODO: load APP_PORT and APP_ENV with defaults.
  return Config{}, nil
}
