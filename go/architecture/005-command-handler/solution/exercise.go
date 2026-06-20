package drill

import (
  "fmt"
  "strings"
)

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
  name = strings.TrimSpace(name)
  if name == "" {
    return fmt.Errorf("project name is required")
  }
  project := Project{Name: name}
  if err := h.Store.Save(project); err != nil {
    return err
  }
  return h.Publisher.Publish("project.created", name)
}
