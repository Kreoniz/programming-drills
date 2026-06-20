# Benchmark-Friendly Buffer Pool

## Learning Objectives
- Use sync.Pool carefully
- Reset pooled buffers
- Keep pooled implementation benchmarkable

## Task
Implement `RenderWithPool`. Use the provided `sync.Pool` of `*bytes.Buffer`, reset buffers before reuse, and put them back before returning.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/testing/010-benchmark-pool`
- Reference check: `node tools/drill-runner.mjs check go/testing/010-benchmark-pool --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- testing
- benchmarks
- sync-pool
