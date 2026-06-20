# Group Event Durations

## Learning Objectives
- Use sort_by and group_by
- Reduce grouped numeric fields
- Emit compact text reports

## Task
Edit `task.sh` so it groups events by status and prints `status totalDuration` lines sorted by status.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/jq/003-group-duration`
- Reference check: `node tools/drill-runner.mjs check shell-tools/jq/003-group-duration --solution`

## Expected Output
```text
error 18
ok 17
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- jq
- json
- aggregation
