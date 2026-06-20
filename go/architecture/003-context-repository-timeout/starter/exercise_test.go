package drill

import (
  "context"
  "errors"
  "testing"
)

type repoSpy struct { ctx context.Context }

func (r *repoSpy) Find(ctx context.Context, id string) (User, error) {
  r.ctx = ctx
  if id == "missing" {
    return User{}, errors.New("missing")
  }
  return User{Name: "Ada", Email: "ada@example.com"}, nil
}

func TestUserServiceDisplayName(t *testing.T) {
  ctx := context.WithValue(context.Background(), "trace", "abc")
  repo := &repoSpy{}
  got, err := (UserService{Repo: repo}).DisplayName(ctx, "1")
  if err != nil || got != "Ada <ada@example.com>" {
    t.Fatalf("got %q err %v", got, err)
  }
  if repo.ctx != ctx {
    t.Fatal("context was not propagated")
  }
}
