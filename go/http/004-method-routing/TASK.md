# Method-Aware HTTP Handler

## Learning Objectives
- Check request methods
- Set protocol-relevant headers
- Test handlers with httptest

## Task
Implement `StatusHandler`. It should respond to GET with `ok\n`; all other methods should return 405 and an `Allow: GET` header.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/http/004-method-routing`
- Reference check: `node tools/drill-runner.mjs check go/http/004-method-routing --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- http
- routing
- handlers
