package drill

import (
  "encoding/json"
  "fmt"
  "io"
)

type User struct {
  Name string `json:"name"`
  Age  int    `json:"age"`
}

func DecodeUser(r io.Reader) (User, error) {
  var user User
  dec := json.NewDecoder(r)
  dec.DisallowUnknownFields()
  if err := dec.Decode(&user); err != nil {
    return User{}, err
  }
  if user.Name == "" {
    return User{}, fmt.Errorf("name is required")
  }
  if user.Age < 0 {
    return User{}, fmt.Errorf("age must be non-negative")
  }
  return user, nil
}
