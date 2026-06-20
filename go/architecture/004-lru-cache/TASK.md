# Small LRU Cache

## Learning Objectives
- Build a bounded cache API
- Reason about recency updates
- Keep cache behavior deterministic

## Task
Implement `LRU`. `Put` should evict the least recently used key when capacity is exceeded; `Get` should mark a key as recently used.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/architecture/004-lru-cache`
- Reference check: `node tools/drill-runner.mjs check go/architecture/004-lru-cache --solution`

## Difficulty
intermediate+

## Estimated Time
30 minutes

## Tags
- go
- architecture
- cache
- data-structures
