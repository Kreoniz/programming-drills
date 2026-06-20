package drill

import (
  "fmt"
  "strings"
)

type User struct {
  Email string
}

type UserRepository interface {
  FindByEmail(email string) (User, bool)
  Save(user User) error
}

type RegistrationService struct {
  Repo UserRepository
}

func (s RegistrationService) Register(email string) (User, error) {
  normalized := strings.ToLower(strings.TrimSpace(email))
  if normalized == "" {
    return User{}, fmt.Errorf("email is required")
  }
  if _, exists := s.Repo.FindByEmail(normalized); exists {
    return User{}, fmt.Errorf("email already registered")
  }
  user := User{Email: normalized}
  if err := s.Repo.Save(user); err != nil {
    return User{}, err
  }
  return user, nil
}
