# Render Count Regression Guard

## Learning Objectives
- Detect unnecessary renders
- Use test-local render counters
- Protect memoized child boundaries

## Task
Complete the test so an unrelated state update does not rerender the expensive child more than once.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check ts-react/performance/007-render-count-guard`
- Reference check: `node tools/drill-runner.mjs check ts-react/performance/007-render-count-guard --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- performance
- testing
