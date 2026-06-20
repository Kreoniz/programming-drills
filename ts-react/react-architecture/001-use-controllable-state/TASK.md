# Controlled and Uncontrolled Hook API

## Learning Objectives
- Design controlled/uncontrolled APIs
- Avoid duplicate sources of truth
- Stabilize hook return values

## Task
Finish `useControllableState` so controlled values come from props, uncontrolled values live in local state, and changes call `onChange` consistently.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/react-architecture/001-use-controllable-state`
- Verify the reference solution: `pnpm drill:check ts-react/react-architecture/001-use-controllable-state --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- hooks
- architecture
