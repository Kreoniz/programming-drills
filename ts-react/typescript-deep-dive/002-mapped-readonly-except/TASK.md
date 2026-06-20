# Mapped Types with Readonly Exceptions

## Learning Objectives
- Use mapped type modifiers
- Compose utility types
- Test mutability at compile time

## Task
Implement `ReadonlyExcept<T, K>`. Every property should be readonly except the keys in `K`, which remain writable.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `tsc -p .`
- From the repository root: `pnpm drill:check ts-react/typescript-deep-dive/002-mapped-readonly-except`
- Verify the reference solution: `pnpm drill:check ts-react/typescript-deep-dive/002-mapped-readonly-except --solution`

## Difficulty
advanced

## Estimated Time
35 minutes

## Tags
- typescript
- mapped-types
- readonly
