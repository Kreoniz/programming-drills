# State Colocation Refactor

## Learning Objectives
- Colocate transient state
- Reduce parent render pressure
- Expose committed events instead of every keystroke

## Task
Refactor the dashboard sketch so search text is owned by `SearchBox` and only committed upward through `onCommit`.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/react-architecture/006-state-colocation`
- Verify the reference solution: `pnpm drill:check ts-react/react-architecture/006-state-colocation --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- state-colocation
- architecture
