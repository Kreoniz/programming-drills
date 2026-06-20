# sqlite3 Active Users Query

## Learning Objectives
- Write a filtered SELECT
- Use deterministic ORDER BY
- Run SQL through sqlite3 CLI

## Task
Edit `query.sql` so it returns active users as `id|email`, sorted by email.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/sqlite3/001-active-users`
- Reference check: `node tools/drill-runner.mjs check shell-tools/sqlite3/001-active-users --solution`

## Expected Output
```text
1|ada@example.com
3|grace@example.com
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- sqlite3
- sql
- select
