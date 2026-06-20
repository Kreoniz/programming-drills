# Extract Lines Between Markers

## Learning Objectives
- Use sed address ranges
- Suppress default printing
- Delete boundary marker lines

## Task
Edit `task.sh` so it prints only the migration lines between `BEGIN MIGRATION` and `END MIGRATION`, excluding the markers.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/sed/003-range-extract`
- Reference check: `node tools/drill-runner.mjs check shell-tools/sed/003-range-extract --solution`

## Expected Output
```text
create users
create orders
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- sed
- ranges
- logs
