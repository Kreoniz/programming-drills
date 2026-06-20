# Goroutines for Parallel Sum

## Learning Objectives
- Start goroutines deliberately
- Partition slices safely
- Collect results without shared mutation

## Task
Implement `ParallelSum`. Split the input across workers, sum chunks in goroutines, and combine the partial sums. Treat workers less than one as one.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/concurrency/001-goroutines-parallel-sum`
- Verify the reference solution: `pnpm drill:check go/concurrency/001-goroutines-parallel-sum --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- concurrency
- goroutines
