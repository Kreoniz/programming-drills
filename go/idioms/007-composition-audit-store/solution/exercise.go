package drill

type Store interface {
  Save(value string) error
}

type Logger interface {
  Log(line string)
}

type AuditStore struct {
  Store  Store
  Logger Logger
}

func (a AuditStore) Save(value string) error {
  if err := a.Store.Save(value); err != nil {
    return err
  }
  if a.Logger != nil {
    a.Logger.Log("saved: " + value)
  }
  return nil
}
