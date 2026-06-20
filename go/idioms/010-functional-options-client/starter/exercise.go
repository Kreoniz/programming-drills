package drill

type Client struct {
  BaseURL string
  Retries int
}

type Option func(*Client)

func WithBaseURL(url string) Option {
  // TODO: return an option that updates BaseURL.
  return func(*Client) {}
}

func WithRetries(retries int) Option {
  // TODO: return an option that updates Retries when valid.
  return func(*Client) {}
}

func NewClient(options ...Option) Client {
  // TODO: apply defaults and options.
  return Client{}
}
