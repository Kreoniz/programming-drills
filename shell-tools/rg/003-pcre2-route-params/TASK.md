# Extract Route Params with PCRE2

## Learning Objectives
- Use ripgrep PCRE2 mode
- Capture only the useful part of a match
- Use replacement output for extraction

## Task
Edit `task.sh` so it extracts route parameter names from `data/routes.ts`, one per line, without the leading colon.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/rg/003-pcre2-route-params`
- Reference check: `node tools/drill-runner.mjs check shell-tools/rg/003-pcre2-route-params --solution`

## Expected Output
```text
userId
postId
orgId
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- rg
- ripgrep
- pcre2
- captures
