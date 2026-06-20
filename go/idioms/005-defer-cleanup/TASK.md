# Defer for Cleanup

## Learning Objectives
- Use defer for cleanup
- Avoid leaking resources on errors
- Preserve the most relevant error

## Task
Implement `UseResource`. Open a resource, defer its close once open succeeds, run work, and return the work error if one occurs.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/idioms/005-defer-cleanup`
- Verify the reference solution: `pnpm drill:check go/idioms/005-defer-cleanup --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- idioms
- defer
- cleanup
