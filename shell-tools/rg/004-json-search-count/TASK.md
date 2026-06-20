# Count Matches from ripgrep JSON

## Learning Objectives
- Produce machine-readable ripgrep output
- Filter match records
- Return deterministic counts

## Task
Edit `task.sh` so it uses `rg --json` to count log lines containing `"level":"error"` across `data/logs`.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/rg/004-json-search-count`
- Reference check: `node tools/drill-runner.mjs check shell-tools/rg/004-json-search-count --solution`

## Expected Output
```text
3
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- rg
- ripgrep
- json
- pipelines
