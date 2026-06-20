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
  if qty <= 0 || priceCents < 0 {
    return
  }
  o.Items = append(o.Items, LineItem{Name: name, Qty: qty, PriceCents: priceCents})
}

func (o Order) TotalCents() int {
  total := 0
  for _, item := range o.Items {
    total += item.Qty * item.PriceCents
  }
  return total
}
