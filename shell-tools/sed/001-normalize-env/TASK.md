# Normalize an env File

## Learning Objectives
- Delete comment and blank lines
- Use extended regular expressions
- Normalize key-value formatting

## Task
Edit `task.sh` so it removes comments and blank lines from `data/app.env`, trims leading whitespace, and normalizes spaces around `=`.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/sed/001-normalize-env`
- Reference check: `node tools/drill-runner.mjs check shell-tools/sed/001-normalize-env --solution`

## Expected Output
```text
PORT=8080
ENV=prod
DEBUG=true
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- sed
- text-processing
- config
