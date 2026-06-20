# Deferred Search Rendering

## Learning Objectives
- Use useDeferredValue intentionally
- Keep input updates responsive
- Expose stale render state accessibly

## Task
Refactor the search component so the input uses immediate state, filtering uses a deferred query, and the list marks stale results with `aria-busy`.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check ts-react/performance/006-deferred-search`
- Reference check: `node tools/drill-runner.mjs check ts-react/performance/006-deferred-search --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- performance
- useDeferredValue
