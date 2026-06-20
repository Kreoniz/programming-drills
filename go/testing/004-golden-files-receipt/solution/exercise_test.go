package drill

import (
  "os"
  "testing"
)

func TestRenderReceiptGolden(t *testing.T) {
  got := RenderReceipt([]LineItem{{Name: "Book", Qty: 2, PriceCents: 1200}, {Name: "Pen", Qty: 1, PriceCents: 150}})
  wantBytes, err := os.ReadFile("testdata/receipt.golden")
  if err != nil {
    t.Fatal(err)
  }
  if got != string(wantBytes) {
    t.Fatalf("receipt mismatch\nGOT:\n%s\nWANT:\n%s", got, string(wantBytes))
  }
}
