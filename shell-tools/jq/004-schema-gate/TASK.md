# JSON Shape Gate

## Learning Objectives
- Use jq as a validation gate
- Inspect JSON value types
- Make failures visible through exit status

## Task
Edit `task.sh` so it validates every user has a string `id` and array `roles`; print `ok` only when validation succeeds.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/jq/004-schema-gate`
- Reference check: `node tools/drill-runner.mjs check shell-tools/jq/004-schema-gate --solution`

## Expected Output
```text
ok
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- jq
- json
- validation
- ci
