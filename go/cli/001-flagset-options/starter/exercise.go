package drill

type Options struct {
  Port  int
  Env   string
  Debug bool
}

func ParseOptions(args []string) (Options, error) {
  // TODO: parse args using flag.NewFlagSet.
  return Options{}, nil
}
