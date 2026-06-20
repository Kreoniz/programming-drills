# ripgrep TODO Audit

## Learning Objectives
- Use ripgrep with alternation
- Exclude directories with globs
- Produce file and line-number output

## Task
Edit `task.sh` so it prints every TODO or FIXME under `data/src`, with line numbers, while excluding any vendor directory.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/rg/001-todo-audit`
- Reference check: `node tools/drill-runner.mjs check shell-tools/rg/001-todo-audit --solution`

## Expected Output
```text
data/src/app.go:1:// TODO: handle timeout
data/src/component.tsx:1:// FIXME: memoize selector
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- rg
- ripgrep
- search
- globs
