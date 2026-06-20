package drill

import "testing"

type memoryRepo struct{ users map[string]User }
func (m *memoryRepo) FindByEmail(email string) (User, bool) { u, ok := m.users[email]; return u, ok }
func (m *memoryRepo) Save(user User) error { m.users[user.Email] = user; return nil }

func TestRegistrationService(t *testing.T) {
  repo := &memoryRepo{users: map[string]User{}}
  svc := RegistrationService{Repo: repo}
  user, err := svc.Register("  ADA@EXAMPLE.COM ")
  if err != nil {
    t.Fatal(err)
  }
  if user.Email != "ada@example.com" {
    t.Fatalf("email = %q", user.Email)
  }
  if _, err := svc.Register("ada@example.com"); err == nil {
    t.Fatal("duplicate registration should fail")
  }
}
