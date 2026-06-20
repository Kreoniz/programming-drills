# CLI Flags with flag.FlagSet

## Learning Objectives
- Use flag.FlagSet for testable parsers
- Avoid global flag state
- Return structured options

## Task
Implement `ParseOptions`. Use a new `flag.FlagSet`, support `-port`, `-env`, and `-debug`, and return parse errors.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/cli/001-flagset-options`
- Verify the reference solution: `pnpm drill:check go/cli/001-flagset-options --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- cli
- flags
