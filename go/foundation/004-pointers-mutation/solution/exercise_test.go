package drill

import "testing"

func TestWithdraw(t *testing.T) {
  acct := &Account{BalanceCents: 500}
  if !Withdraw(acct, 125) {
    t.Fatal("expected withdraw to succeed")
  }
  if acct.BalanceCents != 375 {
    t.Fatalf("balance = %d", acct.BalanceCents)
  }
  if Withdraw(acct, 1000) {
    t.Fatal("overdraft should fail")
  }
  if Withdraw(nil, 10) {
    t.Fatal("nil account should fail")
  }
}
