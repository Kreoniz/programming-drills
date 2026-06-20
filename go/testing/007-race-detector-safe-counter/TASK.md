# Race Detector Friendly Counter

## Learning Objectives
- Protect shared state with a mutex
- Understand what `go test -race` would inspect
- Expose a small concurrent API

## Task
Implement `SafeCounter` with `Inc` and `Value`. It must be safe for concurrent goroutines.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/testing/007-race-detector-safe-counter`
- Verify the reference solution: `pnpm drill:check go/testing/007-race-detector-safe-counter --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- testing
- race-detector
- mutex
