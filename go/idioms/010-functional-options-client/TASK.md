# Functional Options for Client Config

## Learning Objectives
- Use functional options
- Provide safe defaults
- Reject invalid option values without panics

## Task
Implement `NewClient`, `WithBaseURL`, and `WithRetries`. Defaults are base URL `http://localhost` and 2 retries. Ignore negative retries.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/idioms/010-functional-options-client`
- Reference check: `node tools/drill-runner.mjs check go/idioms/010-functional-options-client --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- idioms
- functional-options
- api-design
