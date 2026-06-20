package drill

import "testing"

func TestLoadConfig(t *testing.T) {
  env := map[string]string{"APP_PORT": "9090", "APP_ENV": "prod"}
  got, err := LoadConfig(func(key string) (string, bool) { v, ok := env[key]; return v, ok })
  if err != nil {
    t.Fatal(err)
  }
  if got.Port != 9090 || got.Env != "prod" {
    t.Fatalf("config = %#v", got)
  }
  if _, err := LoadConfig(func(string) (string, bool) { return "bad", true }); err == nil {
    t.Fatal("invalid port should fail")
  }
}
