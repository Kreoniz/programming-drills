# JSON Decoder with Validation

## Learning Objectives
- Use json.Decoder
- Reject unknown fields
- Validate decoded structs

## Task
Implement `DecodeUser`. Decode JSON from the reader, disallow unknown fields, and require a non-empty name and non-negative age.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/http/001-json-decoder`
- Verify the reference solution: `pnpm drill:check go/http/001-json-decoder --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- http
- json
