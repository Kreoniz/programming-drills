# Latest Record by Key

## Learning Objectives
- Store best records in associative arrays
- Compare numeric versions
- Print selected original records

## Task
Edit `task.sh` so it keeps only the highest-version row for each ID from `data/records.txt`, sorted by ID.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/awk/004-latest-by-key`
- Reference check: `node tools/drill-runner.mjs check shell-tools/awk/004-latest-by-key --solution`

## Expected Output
```text
a 3 ready
b 2 done
c 1 new
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- awk
- dedupe
- records
