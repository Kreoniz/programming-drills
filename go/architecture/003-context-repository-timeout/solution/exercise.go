package drill

import (
  "context"
  "fmt"
)

type User struct {
  Name  string
  Email string
}

type UserRepo interface {
  Find(ctx context.Context, id string) (User, error)
}

type UserService struct {
  Repo UserRepo
}

func (s UserService) DisplayName(ctx context.Context, id string) (string, error) {
  user, err := s.Repo.Find(ctx, id)
  if err != nil {
    return "", err
  }
  return fmt.Sprintf("%s <%s>", user.Name, user.Email), nil
}
