package drill

import "time"

func WaitForString(ch <-chan string, timeout time.Duration) (string, bool) {
  // TODO: receive from ch or time out.
  return "", false
}
