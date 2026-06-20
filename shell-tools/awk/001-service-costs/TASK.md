# Aggregate Service Costs

## Learning Objectives
- Use awk field separators
- Group rows by key
- Sort aggregate output

## Task
Edit `task.sh` so it sums cost by service from `data/costs.csv`, skipping the header, and prints sorted `service total` lines.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/awk/001-service-costs`
- Reference check: `node tools/drill-runner.mjs check shell-tools/awk/001-service-costs --solution`

## Expected Output
```text
api 17
web 8
worker 3
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- awk
- aggregation
- csv
