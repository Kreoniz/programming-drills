# Structured Log Line

## Learning Objectives
- Write deterministic logs
- Sort map keys before output
- Accept io.Writer for testability

## Task
Implement `WriteLogLine`. Write `LEVEL message key=value...\n`, sorting field keys alphabetically for deterministic output.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/cli/004-structured-log-line`
- Reference check: `node tools/drill-runner.mjs check go/cli/004-structured-log-line --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- cli
- logging
- io
