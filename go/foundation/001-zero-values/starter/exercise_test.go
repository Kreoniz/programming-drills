package drill

import "testing"

func TestNormalizeSignup(t *testing.T) {
  got := NormalizeSignup("  NEW@Example.COM ", -4, true)
  if got.Email != "new@example.com" {
    t.Fatalf("email = %q", got.Email)
  }
  if got.Age != 0 {
    t.Fatalf("negative age should become zero, got %d", got.Age)
  }
  if !got.Newsletter {
    t.Fatal("newsletter choice was not preserved")
  }
  if got.Source != "organic" {
    t.Fatalf("source = %q, want organic", got.Source)
  }
}
