# Batch Arguments with xargs

## Learning Objectives
- Use `xargs -n` for batching
- Keep command invocations predictable
- Understand argv grouping

## Task
Edit `task.sh` so it reads service names from `data/services.txt` and invokes `bin/render-batch.sh` with batches of two names.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/xargs/002-batch-arguments`
- Reference check: `node tools/drill-runner.mjs check shell-tools/xargs/002-batch-arguments --solution`

## Expected Output
```text
batch: api web
batch: worker cache
batch: jobs
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- xargs
- batching
- argv
