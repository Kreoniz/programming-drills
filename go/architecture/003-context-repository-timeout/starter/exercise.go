package drill

import "context"

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
  // TODO: fetch through repo and format the display name.
  return "", nil
}
