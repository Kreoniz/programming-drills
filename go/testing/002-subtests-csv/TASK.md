# Subtests for Parser Cases

## Learning Objectives
- Use subtests to isolate parser cases
- Track parser state explicitly
- Return deterministic slices

## Task
Implement `ParseCSVLine` for comma-separated values with a minimal quoted-field rule: commas inside double quotes are part of the field.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/testing/002-subtests-csv`
- Verify the reference solution: `pnpm drill:check go/testing/002-subtests-csv --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- testing
- subtests
- parsing
