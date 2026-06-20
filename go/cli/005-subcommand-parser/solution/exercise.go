package drill

import (
  "flag"
  "fmt"
)

type Command struct {
  Name string
  Port int
  DryRun bool
}

func ParseCommand(args []string) (Command, error) {
  if len(args) == 0 {
    return Command{}, fmt.Errorf("missing subcommand")
  }
  switch args[0] {
  case "serve":
    fs := flag.NewFlagSet("serve", flag.ContinueOnError)
    port := fs.Int("port", 8080, "port")
    if err := fs.Parse(args[1:]); err != nil {
      return Command{}, err
    }
    return Command{Name: "serve", Port: *port}, nil
  case "migrate":
    fs := flag.NewFlagSet("migrate", flag.ContinueOnError)
    dryRun := fs.Bool("dry-run", false, "dry run")
    if err := fs.Parse(args[1:]); err != nil {
      return Command{}, err
    }
    return Command{Name: "migrate", DryRun: *dryRun}, nil
  default:
    return Command{}, fmt.Errorf("unknown subcommand %q", args[0])
  }
}
