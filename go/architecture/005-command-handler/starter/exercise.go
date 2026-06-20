package drill

type Project struct {
  Name string
}

type ProjectStore interface {
  Save(Project) error
}

type Publisher interface {
  Publish(topic string, payload string) error
}

type CreateProjectHandler struct {
  Store ProjectStore
  Publisher Publisher
}

func (h CreateProjectHandler) Handle(name string) error {
  // TODO: validate, save, then publish project.created.
  return nil
}
