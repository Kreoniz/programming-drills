# Context Cancellation in Streams

## Learning Objectives
- Respect context cancellation
- Avoid goroutine leaks
- Close producer-owned channels

## Task
Implement `StreamNumbers`. Emit integers from zero up to max-1, stop early when the context is canceled, and close the output channel.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/concurrency/005-context-cancellation-stream`
- Verify the reference solution: `pnpm drill:check go/concurrency/005-context-cancellation-stream --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- concurrency
- context
- cancellation
