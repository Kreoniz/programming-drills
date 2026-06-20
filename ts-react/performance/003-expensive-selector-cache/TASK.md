# Expensive Selector Cache

## Learning Objectives
- Memoize expensive selectors
- Avoid global stale caches
- Reason about identity and query keys

## Task
Implement a selector factory that caches the last input array and query, returning the previous result when both are unchanged.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/performance/003-expensive-selector-cache`
- Verify the reference solution: `pnpm drill:check ts-react/performance/003-expensive-selector-cache --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- performance
- selectors
