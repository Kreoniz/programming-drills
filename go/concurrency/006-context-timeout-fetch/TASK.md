# Context Timeout Wrapper

## Learning Objectives
- Select on context cancellation
- Propagate context errors
- Wrap blocking work safely enough for tests

## Task
Implement `FetchWithContext`. Run the provided function and return its result, unless the context is done first.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/concurrency/006-context-timeout-fetch`
- Verify the reference solution: `pnpm drill:check go/concurrency/006-context-timeout-fetch --solution`

## Difficulty
intermediate+

## Estimated Time
25 minutes

## Tags
- go
- concurrency
- context
- timeouts
