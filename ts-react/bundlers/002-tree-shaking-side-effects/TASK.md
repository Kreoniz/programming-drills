# Tree Shaking and Side Effects

## Learning Objectives
- Use sideEffects correctly
- Avoid barrel imports that hide costs
- Reason about tree-shakable package design

## Task
Fix package metadata and imports so only CSS is marked side-effectful and components are imported from ESM entrypoints.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/bundlers/002-tree-shaking-side-effects`
- Verify the reference solution: `pnpm drill:check ts-react/bundlers/002-tree-shaking-side-effects --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- bundlers
- tree-shaking
- package-json
