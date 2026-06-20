package drill

import (
  "os"
  "path/filepath"
  "testing"
)

func TestWriteReport(t *testing.T) {
  target := filepath.Join(t.TempDir(), "reports", "daily.txt")
  if err := WriteReport(target, []string{"alpha", "beta"}); err != nil {
    t.Fatal(err)
  }
  got, err := os.ReadFile(target)
  if err != nil {
    t.Fatal(err)
  }
  if string(got) != "alpha\nbeta\n" {
    t.Fatalf("body = %q", string(got))
  }
}
