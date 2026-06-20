# Token Bucket Rate Limiter

## Learning Objectives
- Protect mutable limiter state
- Model elapsed-time refill logic
- Keep rate limiting deterministic under injected clocks

## Task
Implement a token bucket with `Allow`. The bucket starts full, refills whole tokens based on elapsed time, and never exceeds capacity.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/concurrency/009-token-bucket-rate-limiter`
- Reference check: `node tools/drill-runner.mjs check go/concurrency/009-token-bucket-rate-limiter --solution`

## Difficulty
intermediate+

## Estimated Time
30 minutes

## Tags
- go
- concurrency
- rate-limiting
- mutex
