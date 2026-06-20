# Find React Hook Files

## Learning Objectives
- Use `rg -l` to list matching files
- Limit searches by glob
- Exclude test files from navigation output

## Task
Edit `task.sh` so it lists `.tsx` source files using `useEffect` or `useMemo`, excluding test files, sorted alphabetically.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/rg/002-react-hook-files`
- Reference check: `node tools/drill-runner.mjs check shell-tools/rg/002-react-hook-files --solution`

## Expected Output
```text
data/app/Dashboard.tsx
data/app/Profile.tsx
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- rg
- ripgrep
- react
- globs
