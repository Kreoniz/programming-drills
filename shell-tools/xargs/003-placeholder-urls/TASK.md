# Placeholder URL Builder

## Learning Objectives
- Use `xargs -I` placeholders
- Build templated commands
- Keep one output line per input

## Task
Edit `task.sh` so it turns each user ID in `data/user-ids.txt` into an API URL using an xargs placeholder.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/xargs/003-placeholder-urls`
- Reference check: `node tools/drill-runner.mjs check shell-tools/xargs/003-placeholder-urls --solution`

## Expected Output
```text
https://api.example.test/users/u1
https://api.example.test/users/u2
https://api.example.test/users/u3
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- xargs
- placeholders
- pipelines
