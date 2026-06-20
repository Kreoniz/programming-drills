package drill

type LineItem struct {
  Name       string
  Qty        int
  PriceCents int
}

func RenderReceipt(items []LineItem) string {
  // TODO: render the receipt exactly as testdata/receipt.golden.
  return ""
}
