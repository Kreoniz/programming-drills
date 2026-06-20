# Profiling-Friendly Inverted Index

## Learning Objectives
- Build an allocation-conscious map
- Use benchmarks to inspect performance later
- Keep API surface small and practical

## Task
Implement `BuildIndex`. For each document, lowercase words and map each word to the document indexes it appears in. Do not record the same document index twice for one word.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/architecture/002-profiling-index`
- Verify the reference solution: `pnpm drill:check go/architecture/002-profiling-index --solution`

## Difficulty
intermediate+

## Estimated Time
25 minutes

## Tags
- go
- architecture
- profiling
- performance
