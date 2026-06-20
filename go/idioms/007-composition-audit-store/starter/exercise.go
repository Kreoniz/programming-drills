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
  // TODO: save and log after success.
  return a.Store.Save(value)
}
