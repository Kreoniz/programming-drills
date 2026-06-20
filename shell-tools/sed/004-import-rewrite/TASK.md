# Rewrite Import Specifiers

## Learning Objectives
- Perform a mechanical source rewrite
- Preserve subpaths
- Avoid touching unrelated strings

## Task
Edit `task.sh` so it rewrites import specifiers from `@old/ui` to `@acme/ui` in `data/component.tsx`.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/sed/004-import-rewrite`
- Reference check: `node tools/drill-runner.mjs check shell-tools/sed/004-import-rewrite --solution`

## Expected Output
```text
import { Button } from "@acme/ui/button";
import { Card } from "@acme/ui/card";
const label = "@old/ui should stay in runtime text";
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- sed
- codemods
- imports
