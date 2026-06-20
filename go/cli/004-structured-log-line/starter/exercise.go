package drill

import "io"

func WriteLogLine(w io.Writer, level string, message string, fields map[string]string) error {
  // TODO: write a deterministic structured log line.
  return nil
}
