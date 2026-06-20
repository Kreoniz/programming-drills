package drill

type Client struct {
  BaseURL string
  Retries int
}

type Option func(*Client)

func WithBaseURL(url string) Option {
  return func(c *Client) {
    if url != "" {
      c.BaseURL = url
    }
  }
}

func WithRetries(retries int) Option {
  return func(c *Client) {
    if retries >= 0 {
      c.Retries = retries
    }
  }
}

func NewClient(options ...Option) Client {
  c := Client{BaseURL: "http://localhost", Retries: 2}
  for _, option := range options {
    option(&c)
  }
  return c
}
