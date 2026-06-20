# sqlite3 Join Order Totals

## Learning Objectives
- Join related tables
- Aggregate with SUM
- Group and order result sets

## Task
Edit `query.sql` so it returns each customer email and total order cents, sorted by total descending.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/sqlite3/002-join-order-totals`
- Reference check: `node tools/drill-runner.mjs check shell-tools/sqlite3/002-join-order-totals --solution`

## Expected Output
```text
ada@example.com|3500
grace@example.com|800
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- sqlite3
- sql
- joins
- aggregation
