package drill

type Signup struct {
  Email      string
  Age        int
  Newsletter bool
  Source     string
}

func NormalizeSignup(email string, age int, wantsNewsletter bool) Signup {
  // TODO: normalize the input and return a populated Signup.
  return Signup{}
}
