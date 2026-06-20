# Hydration Mismatch Debugging

## Learning Objectives
- Recognize hydration mismatch sources
- Keep initial render deterministic
- Use effects for client-only values

## Task
Refactor the component so the server and first client render are deterministic; move `Date.now()` into an effect after hydration.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/performance/005-hydration-mismatch`
- Verify the reference solution: `pnpm drill:check ts-react/performance/005-hydration-mismatch --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- ssr
- hydration
