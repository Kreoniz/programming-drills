# Subcommand Parser

## Learning Objectives
- Parse subcommands with separate FlagSets
- Return structured command values
- Reject unknown commands

## Task
Implement `ParseCommand`. Support `serve --port <n>` and `migrate --dry-run`. Return an error for unknown subcommands or invalid flags.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/cli/005-subcommand-parser`
- Reference check: `node tools/drill-runner.mjs check go/cli/005-subcommand-parser --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- cli
- flags
- subcommands
