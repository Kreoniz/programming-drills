# Consistent JSON Error Responses

## Learning Objectives
- Write reusable HTTP helpers
- Set headers before status
- Encode JSON response bodies

## Task
Implement `WriteJSONError`. It should set `Content-Type: application/json`, write the provided status, and encode `{ "error": message }`.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/http/005-json-error-response`
- Reference check: `node tools/drill-runner.mjs check go/http/005-json-error-response --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- http
- json
- errors
