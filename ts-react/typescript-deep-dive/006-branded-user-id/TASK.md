# Branded Primitive IDs

## Learning Objectives
- Create branded primitive types
- Prevent accidental ID mixing
- Keep runtime representation simple

## Task
Implement `Brand`, `UserId`, and `makeUserId` so plain strings are not assignable to `UserId` without passing through the constructor.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `tsc -p .`
- From the repository root: `pnpm drill:check ts-react/typescript-deep-dive/006-branded-user-id`
- Verify the reference solution: `pnpm drill:check ts-react/typescript-deep-dive/006-branded-user-id --solution`

## Difficulty
advanced

## Estimated Time
35 minutes

## Tags
- typescript
- branded-types
- domain-modeling
