# Average Latency by Endpoint

## Learning Objectives
- Track sums and counts
- Format numeric output
- Sort endpoint averages

## Task
Edit `task.sh` so it calculates average latency by endpoint from `data/latency.csv`, printing one decimal place.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/awk/003-average-latency`
- Reference check: `node tools/drill-runner.mjs check shell-tools/awk/003-average-latency --solution`

## Expected Output
```text
/api 15.0
/home 7.0
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- awk
- metrics
- csv
