package drill

import (
  "bytes"
  "testing"
)

func TestWriteLogLine(t *testing.T) {
  var b bytes.Buffer
  err := WriteLogLine(&b, "INFO", "started", map[string]string{"service": "api", "trace": "abc"})
  if err != nil {
    t.Fatal(err)
  }
  if got := b.String(); got != "INFO started service=api trace=abc\n" {
    t.Fatalf("log = %q", got)
  }
}
