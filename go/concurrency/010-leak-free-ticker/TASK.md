# Leak-Free Context Ticker

## Learning Objectives
- Stop tickers to release resources
- Close producer-owned channels
- Use context to avoid goroutine leaks

## Task
Implement `StartTicker`. It should send ticks until the context is canceled, stop the ticker, and close the output channel.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/concurrency/010-leak-free-ticker`
- Reference check: `node tools/drill-runner.mjs check go/concurrency/010-leak-free-ticker --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- concurrency
- context
- goroutine-leaks
