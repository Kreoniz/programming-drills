# Select Enabled Services

## Learning Objectives
- Select JSON array entries
- Emit raw strings
- Sort pipeline output

## Task
Edit `task.sh` so it prints enabled service names from `data/services.json`, sorted alphabetically.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/jq/001-enabled-services`
- Reference check: `node tools/drill-runner.mjs check shell-tools/jq/001-enabled-services --solution`

## Expected Output
```text
api
worker
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- jq
- json
- filtering
