# sqlite3 Window Ranking

## Learning Objectives
- Use window functions
- Compute revenue expressions
- Order ranked reports deterministically

## Task
Edit `query.sql` so it ranks products by revenue descending and returns `rank|name|revenue`.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/sqlite3/003-window-ranking`
- Reference check: `node tools/drill-runner.mjs check shell-tools/sqlite3/003-window-ranking --solution`

## Expected Output
```text
1|pro|5000
2|team|3600
3|solo|1200
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- sqlite3
- sql
- window-functions
