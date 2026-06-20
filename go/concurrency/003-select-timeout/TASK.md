# select with Timeout

## Learning Objectives
- Use select for competing events
- Use time.After for simple timeouts
- Return timeout state explicitly

## Task
Implement `WaitForString`. Return the received value and true, or an empty string and false if the timeout fires first.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/concurrency/003-select-timeout`
- Verify the reference solution: `pnpm drill:check go/concurrency/003-select-timeout --solution`

## Difficulty
beginner+

## Estimated Time
25 minutes

## Tags
- go
- concurrency
- select
- timeouts
