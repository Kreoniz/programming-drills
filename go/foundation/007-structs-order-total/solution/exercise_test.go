package drill

import "testing"

func TestOrderTotal(t *testing.T) {
  var order Order
  order.AddItem("book", 2, 1200)
  order.AddItem("pen", 3, 150)
  if got := order.TotalCents(); got != 2850 {
    t.Fatalf("total = %d", got)
  }
  order.AddItem("ignored", 0, 999)
  if got := len(order.Items); got != 2 {
    t.Fatalf("invalid item should not be added, len=%d", got)
  }
}
