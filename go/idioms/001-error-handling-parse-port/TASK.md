# Explicit Error Handling

## Learning Objectives
- Return errors explicitly
- Validate after parsing
- Avoid panics for user input

## Task
Implement `ParsePort`. Convert a decimal string to an int and return an error when parsing fails or the port is outside 1..65535.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/idioms/001-error-handling-parse-port`
- Verify the reference solution: `pnpm drill:check go/idioms/001-error-handling-parse-port --solution`

## Difficulty
beginner+

## Estimated Time
25 minutes

## Tags
- go
- idioms
- errors
