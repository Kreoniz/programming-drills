package drill

import "strings"

type Signup struct {
  Email      string
  Age        int
  Newsletter bool
  Source     string
}

func NormalizeSignup(email string, age int, wantsNewsletter bool) Signup {
  if age < 0 {
    age = 0
  }
  return Signup{
    Email: strings.ToLower(strings.TrimSpace(email)),
    Age: age,
    Newsletter: wantsNewsletter,
    Source: "organic",
  }
}
