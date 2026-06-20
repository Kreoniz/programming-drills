# Wrapping Sentinel Errors

## Learning Objectives
- Use sentinel errors intentionally
- Wrap errors with `%w`
- Keep caller checks possible

## Task
Implement `LoadUser`. Return the user name when found. Missing IDs should return an error that wraps `ErrUserNotFound` and includes the missing ID.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/idioms/002-error-wrapping`
- Verify the reference solution: `pnpm drill:check go/idioms/002-error-wrapping --solution`

## Difficulty
beginner+

## Estimated Time
25 minutes

## Tags
- go
- idioms
- errors
- wrapping
