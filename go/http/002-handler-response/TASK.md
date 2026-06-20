# HTTP Handler Basics

## Learning Objectives
- Write an http.HandlerFunc
- Use httptest-driven behavior
- Return simple text responses

## Task
Implement `GreetHandler`. Read `name` from the query string, default to `guest`, and write `hello <name>\n` with HTTP 200.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/http/002-handler-response`
- Verify the reference solution: `pnpm drill:check go/http/002-handler-response --solution`

## Difficulty
beginner+

## Estimated Time
25 minutes

## Tags
- go
- http
- handlers
