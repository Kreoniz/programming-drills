# List Package Dependencies

## Learning Objectives
- Convert objects to entries
- Handle multiple dependency maps
- Produce package audit-friendly output

## Task
Edit `task.sh` so it prints dependency and devDependency entries as `name@version`, sorted alphabetically.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/jq/002-package-deps`
- Reference check: `node tools/drill-runner.mjs check shell-tools/jq/002-package-deps --solution`

## Expected Output
```text
@types/node@^24.0.0
react@^18.2.0
vite@^5.0.0
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- jq
- json
- package-json
