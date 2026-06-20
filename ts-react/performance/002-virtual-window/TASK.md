# Virtualization Window Calculation

## Learning Objectives
- Compute visible list windows
- Clamp ranges safely
- Separate rendering math from React components

## Task
Implement `getVisibleRange` so it returns clamped start and end indexes for fixed-height virtualized rows with overscan.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/performance/002-virtual-window`
- Verify the reference solution: `pnpm drill:check ts-react/performance/002-virtual-window --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- performance
- virtualization
