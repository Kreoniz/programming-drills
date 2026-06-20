# Generic Result Mapping

## Learning Objectives
- Model generic result values
- Transform generic success payloads
- Preserve error semantics

## Task
Implement `Result[T]`, `Ok`, `Err`, and `MapResult`. Mapping should transform only successful values and preserve errors unchanged.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/generics/003-result-map`
- Reference check: `node tools/drill-runner.mjs check go/generics/003-result-map --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- generics
- errors
