# Count HTTP Status Classes

## Learning Objectives
- Compute derived fields
- Count grouped rows
- Keep output stable with sorting

## Task
Edit `task.sh` so it counts requests by status class from `data/access.log` and prints sorted `2xx 3` style lines.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/awk/002-status-classes`
- Reference check: `node tools/drill-runner.mjs check shell-tools/awk/002-status-classes --solution`

## Expected Output
```text
2xx 2
3xx 1
4xx 2
5xx 1
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- awk
- logs
- aggregation
