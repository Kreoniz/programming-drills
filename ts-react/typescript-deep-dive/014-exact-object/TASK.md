# Exact Object Shape

## Learning Objectives
- Reject excess keys in generic helpers
- Preserve literal value types
- Design strict config APIs

## Task
Implement `Exact<Shape, Value>` and `defineConfig` so object literals cannot include keys outside the expected config shape.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `tsc -p .`
- From the repository root: `node tools/drill-runner.mjs check ts-react/typescript-deep-dive/014-exact-object`
- Reference check: `node tools/drill-runner.mjs check ts-react/typescript-deep-dive/014-exact-object --solution`

## Difficulty
advanced

## Estimated Time
35 minutes

## Tags
- typescript
- excess-property-checks
- config
