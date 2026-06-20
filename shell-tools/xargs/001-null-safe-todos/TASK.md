# Null-Safe TODO Search

## Learning Objectives
- Use `find -print0` with `xargs -0`
- Handle spaces in filenames
- Sort search results

## Task
Edit `task.sh` so it finds files under `data/src` containing TODO, including filenames with spaces, using a null-delimited xargs pipeline.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/xargs/001-null-safe-todos`
- Reference check: `node tools/drill-runner.mjs check shell-tools/xargs/001-null-safe-todos --solution`

## Expected Output
```text
data/src/needs review.txt
data/src/plain.txt
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- xargs
- null-delimited
- filenames
- rg
