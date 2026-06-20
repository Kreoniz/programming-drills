package drill

type Command struct {
  Name string
  Port int
  DryRun bool
}

func ParseCommand(args []string) (Command, error) {
  // TODO: parse serve and migrate subcommands.
  return Command{}, nil
}
