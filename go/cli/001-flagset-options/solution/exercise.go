package drill

import "flag"

type Options struct {
  Port  int
  Env   string
  Debug bool
}

func ParseOptions(args []string) (Options, error) {
  fs := flag.NewFlagSet("drill", flag.ContinueOnError)
  opts := Options{}
  fs.IntVar(&opts.Port, "port", 8080, "port")
  fs.StringVar(&opts.Env, "env", "dev", "environment")
  fs.BoolVar(&opts.Debug, "debug", false, "debug mode")
  if err := fs.Parse(args); err != nil {
    return Options{}, err
  }
  return opts, nil
}
