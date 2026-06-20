package drill

type Account struct {
  BalanceCents int
}

func Withdraw(account *Account, amountCents int) bool {
  if account == nil || amountCents <= 0 || account.BalanceCents < amountCents {
    return false
  }
  account.BalanceCents -= amountCents
  return true
}
