# Parallel xargs Workers

## Learning Objectives
- Use `xargs -P` for parallel execution
- Pass one item per worker invocation
- Sort output after parallel work

## Task
Edit `task.sh` so it processes services with two parallel workers through `bin/render-service.sh`, then sorts the output.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/xargs/004-parallel-workers`
- Reference check: `node tools/drill-runner.mjs check shell-tools/xargs/004-parallel-workers --solution`

## Expected Output
```text
API
CACHE
WEB
WORKER
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- xargs
- parallelism
- pipelines
