package drill

import (
  "bytes"
  "sync"
)

func RenderWithPool(pool *sync.Pool, parts []string) string {
  buf, _ := pool.Get().(*bytes.Buffer)
  if buf == nil {
    buf = &bytes.Buffer{}
  }
  buf.Reset()
  for _, part := range parts {
    buf.WriteString(part)
  }
  out := buf.String()
  pool.Put(buf)
  return out
}
