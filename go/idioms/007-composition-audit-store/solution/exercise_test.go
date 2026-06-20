package drill

import "testing"

type fakeStore struct{ saved []string }
func (f *fakeStore) Save(value string) error { f.saved = append(f.saved, value); return nil }

type fakeLogger struct{ lines []string }
func (f *fakeLogger) Log(line string) { f.lines = append(f.lines, line) }

func TestAuditStore(t *testing.T) {
  store := &fakeStore{}
  logger := &fakeLogger{}
  audit := AuditStore{Store: store, Logger: logger}
  if err := audit.Save("order-1"); err != nil {
    t.Fatalf("save failed: %v", err)
  }
  if len(store.saved) != 1 || store.saved[0] != "order-1" {
    t.Fatalf("store not called: %#v", store.saved)
  }
  if len(logger.lines) != 1 || logger.lines[0] != "saved: order-1" {
    t.Fatalf("logger not called: %#v", logger.lines)
  }
}
