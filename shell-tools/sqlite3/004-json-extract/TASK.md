# sqlite3 JSON Extract

## Learning Objectives
- Use sqlite JSON functions
- Filter by extracted JSON fields
- Return pipe-separated CLI output

## Task
Edit `query.sql` so it extracts event type and account ID from JSON payloads for account events, sorted by event ID.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/sqlite3/004-json-extract`
- Reference check: `node tools/drill-runner.mjs check shell-tools/sqlite3/004-json-extract --solution`

## Expected Output
```text
created|acct_1
updated|acct_2
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- sqlite3
- sql
- json
