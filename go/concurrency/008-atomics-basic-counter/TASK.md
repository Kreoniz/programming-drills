# Atomic Counter Basics

## Learning Objectives
- Use typed atomics
- Avoid data races for counters
- Keep atomic APIs small

## Task
Implement `AtomicCounter` with `Inc` and `Value` using the `sync/atomic` package's typed integer.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/concurrency/008-atomics-basic-counter`
- Verify the reference solution: `pnpm drill:check go/concurrency/008-atomics-basic-counter --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- concurrency
- atomics
