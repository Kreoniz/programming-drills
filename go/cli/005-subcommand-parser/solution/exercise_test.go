package drill

import "testing"

func TestParseCommand(t *testing.T) {
  serve, err := ParseCommand([]string{"serve", "--port", "9090"})
  if err != nil || serve.Name != "serve" || serve.Port != 9090 {
    t.Fatalf("serve = %#v err=%v", serve, err)
  }
  migrate, err := ParseCommand([]string{"migrate", "--dry-run"})
  if err != nil || migrate.Name != "migrate" || !migrate.DryRun {
    t.Fatalf("migrate = %#v err=%v", migrate, err)
  }
  if _, err := ParseCommand([]string{"unknown"}); err == nil {
    t.Fatal("unknown subcommand should fail")
  }
}
