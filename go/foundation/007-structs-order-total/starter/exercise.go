package drill

type LineItem struct {
  Name       string
  Qty        int
  PriceCents int
}

type Order struct {
  Items []LineItem
}

func (o *Order) AddItem(name string, qty int, priceCents int) {
  // TODO: append valid items.
}

func (o Order) TotalCents() int {
  // TODO: calculate the total.
  return 0
}
