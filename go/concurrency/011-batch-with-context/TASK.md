# Batch Processing with Context

## Learning Objectives
- Check context during CPU-bound loops
- Return partial progress intentionally
- Preserve item ordering

## Task
Implement `ProcessBatch`. Apply `fn` to items in order, stop when context is canceled, and return partial results with the context error.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/concurrency/011-batch-with-context`
- Reference check: `node tools/drill-runner.mjs check go/concurrency/011-batch-with-context --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- concurrency
- context
- batching
