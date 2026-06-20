# Request ID Middleware

## Learning Objectives
- Use request contexts in middleware
- Propagate request metadata
- Keep ID generation injectable

## Task
Implement `RequestIDMiddleware`. Use the incoming `X-Request-ID` when present; otherwise generate one with `nextID`. Store it in context and set it on the response.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/http/006-request-id-middleware`
- Reference check: `node tools/drill-runner.mjs check go/http/006-request-id-middleware --solution`

## Difficulty
intermediate+

## Estimated Time
30 minutes

## Tags
- go
- http
- middleware
- context
