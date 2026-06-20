# Worker Pool with Ordered Results

## Learning Objectives
- Build a small worker pool
- Preserve result order
- Close job channels correctly

## Task
Implement `ProcessJobs`. Run `fn` across worker goroutines but return results in the same order as the input jobs.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/concurrency/004-worker-pool-ordering`
- Verify the reference solution: `pnpm drill:check go/concurrency/004-worker-pool-ordering --solution`

## Difficulty
intermediate+

## Estimated Time
25 minutes

## Tags
- go
- concurrency
- worker-pool
