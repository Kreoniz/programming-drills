# Mutex-Protected Cache

## Learning Objectives
- Protect maps with mutexes
- Hide synchronization inside a type
- Avoid repeated work for cached keys

## Task
Implement `NewCache` and `Get`. `Get` should return a cached value when present or call `load`, store the result, and return it.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/concurrency/007-mutex-cache`
- Verify the reference solution: `pnpm drill:check go/concurrency/007-mutex-cache --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- concurrency
- mutex
- cache
