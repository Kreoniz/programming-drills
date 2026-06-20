package drill

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
  // TODO: normalize, reject duplicates, save, and return user.
  return User{}, nil
}
