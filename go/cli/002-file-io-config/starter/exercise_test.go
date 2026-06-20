package drill

import (
  "os"
  "path/filepath"
  "testing"
)

func TestReadConfig(t *testing.T) {
  path := filepath.Join(t.TempDir(), "app.env")
  if err := os.WriteFile(path, []byte("PORT=8080\n# comment\nENV=dev\n"), 0644); err != nil {
    t.Fatal(err)
  }
  got, err := ReadConfig(path)
  if err != nil {
    t.Fatal(err)
  }
  if got["PORT"] != "8080" || got["ENV"] != "dev" {
    t.Fatalf("got %#v", got)
  }
}
