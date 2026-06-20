# Memoization Dependency Traps

## Learning Objectives
- Spot unstable dependencies
- Use memoization only around real work
- Keep dependency arrays honest

## Task
Refactor the list filter so `useMemo` depends on primitive values instead of a freshly-created options object.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/performance/001-memoization-dependencies`
- Verify the reference solution: `pnpm drill:check ts-react/performance/001-memoization-dependencies --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- performance
- memoization
