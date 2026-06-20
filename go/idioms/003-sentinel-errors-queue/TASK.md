# Sentinel Errors in a Queue

## Learning Objectives
- Define sentinel errors
- Use slices as queues
- Preserve FIFO ordering

## Task
Implement `Push` and `Pop`. `Pop` should remove the oldest item or return `ErrEmpty` when the queue is empty.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/idioms/003-sentinel-errors-queue`
- Verify the reference solution: `pnpm drill:check go/idioms/003-sentinel-errors-queue --solution`

## Difficulty
beginner+

## Estimated Time
25 minutes

## Tags
- go
- idioms
- errors
- slices
