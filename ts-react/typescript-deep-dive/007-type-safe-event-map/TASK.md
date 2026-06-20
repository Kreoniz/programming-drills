# Type-Safe Event Maps

## Learning Objectives
- Use keyof constraints
- Infer payloads from event names
- Design typed callback APIs

## Task
Implement `TypedEmitter<M>` so `on` and `emit` infer payload types from the event key.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `tsc -p .`
- From the repository root: `pnpm drill:check ts-react/typescript-deep-dive/007-type-safe-event-map`
- Verify the reference solution: `pnpm drill:check ts-react/typescript-deep-dive/007-type-safe-event-map --solution`

## Difficulty
advanced

## Estimated Time
35 minutes

## Tags
- typescript
- event-maps
- interfaces
