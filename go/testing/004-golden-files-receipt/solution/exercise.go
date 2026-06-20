package drill

import (
  "fmt"
  "strings"
)

type LineItem struct {
  Name       string
  Qty        int
  PriceCents int
}

func RenderReceipt(items []LineItem) string {
  var b strings.Builder
  total := 0
  b.WriteString("RECEIPT\n")
  for _, item := range items {
    lineTotal := item.Qty * item.PriceCents
    total += lineTotal
    fmt.Fprintf(&b, "%s x%d $%.2f\n", item.Name, item.Qty, float64(lineTotal)/100)
  }
  fmt.Fprintf(&b, "TOTAL $%.2f\n", float64(total)/100)
  return b.String()
}
