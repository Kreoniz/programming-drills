package drill

import "testing"

type projectStoreSpy struct { saved []Project }
func (s *projectStoreSpy) Save(project Project) error { s.saved = append(s.saved, project); return nil }
type publisherSpy struct { topic string; payload string }
func (p *publisherSpy) Publish(topic string, payload string) error { p.topic = topic; p.payload = payload; return nil }

func TestCreateProjectHandler(t *testing.T) {
  store := &projectStoreSpy{}
  pub := &publisherSpy{}
  err := (CreateProjectHandler{Store: store, Publisher: pub}).Handle("  Apollo ")
  if err != nil {
    t.Fatal(err)
  }
  if store.saved[0].Name != "Apollo" || pub.topic != "project.created" || pub.payload != "Apollo" {
    t.Fatalf("store=%#v publisher=%#v", store.saved, pub)
  }
  if err := (CreateProjectHandler{Store: store, Publisher: pub}).Handle(" "); err == nil {
    t.Fatal("blank name should fail")
  }
}
