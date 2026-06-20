# Small Interfaces with io.Reader

## Learning Objectives
- Depend on behavior, not concrete types
- Use io.Reader effectively
- Protect memory with explicit limits

## Task
Implement `ReadAllLimited`. Read from any `io.Reader`, return the content as a string, and return an error if more than limit bytes are available.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/idioms/006-small-interfaces-reader`
- Verify the reference solution: `pnpm drill:check go/idioms/006-small-interfaces-reader --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- idioms
- interfaces
- io
