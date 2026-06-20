# Exhaustive Discriminated Unions

## Learning Objectives
- Use discriminated unions
- Force exhaustive reducer handling
- Keep impossible states visible

## Task
Complete the reducer so every action is handled and the default path calls `assertNever(action)`.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/typescript-deep-dive/005-exhaustive-discriminated-union`
- Verify the reference solution: `pnpm drill:check ts-react/typescript-deep-dive/005-exhaustive-discriminated-union --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- typescript
- discriminated-unions
- reducers
