# Fuzz-Friendly Parser

## Learning Objectives
- Write parser invariants
- Keep fuzz targets safe
- Return ok booleans for tiny parsers

## Task
Implement `ParseKeyValue`. Split on the first `=`, require a non-empty key, and return ok=false when the input is malformed.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/testing/006-fuzzable-key-value-parser`
- Verify the reference solution: `pnpm drill:check go/testing/006-fuzzable-key-value-parser --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- testing
- fuzz
- parsing
