# HTTP Middleware

## Learning Objectives
- Wrap http.Handler values
- Set response headers before writing
- Keep middleware composable

## Task
Implement `WithHeader`. Return a handler that sets the given header before delegating to the next handler.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/http/003-middleware-header`
- Verify the reference solution: `pnpm drill:check go/http/003-middleware-header --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- http
- middleware
