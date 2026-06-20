# Channel Fan-In

## Learning Objectives
- Forward channel values
- Close only the channel you own
- Coordinate goroutines with sync.WaitGroup

## Task
Implement `FanIn`. Forward all values from both input channels to one output channel and close the output after both inputs close.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/concurrency/002-channels-fan-in`
- Verify the reference solution: `pnpm drill:check go/concurrency/002-channels-fan-in --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- concurrency
- channels
