# Clock Injection for Time Tests

## Learning Objectives
- Inject clocks for deterministic tests
- Compare time values correctly
- Avoid sleeping in unit tests

## Task
Implement `IsExpired`. Use the injected `now` function instead of calling `time.Now` directly.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/testing/008-clock-injection`
- Verify the reference solution: `pnpm drill:check go/testing/008-clock-injection --solution`

## Difficulty
beginner+

## Estimated Time
25 minutes

## Tags
- go
- testing
- time
- dependency-injection
