package drill

import "io"

type User struct {
  Name string `json:"name"`
  Age  int    `json:"age"`
}

func DecodeUser(r io.Reader) (User, error) {
  // TODO: decode JSON, reject unknown fields, and validate.
  return User{}, nil
}
