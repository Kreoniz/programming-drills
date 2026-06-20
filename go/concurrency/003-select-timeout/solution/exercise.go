package drill

import "time"

func WaitForString(ch <-chan string, timeout time.Duration) (string, bool) {
  select {
  case value := <-ch:
    return value, true
  case <-time.After(timeout):
    return "", false
  }
}
