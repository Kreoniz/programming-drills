# Webpack Loader and Plugin Order

## Learning Objectives
- Reason about loader execution order
- Separate loaders from plugins
- Inject env flags safely

## Task
Fix the config so TypeScript runs through Babel after `ts-loader`, CSS uses `style-loader` before `css-loader`, and `DefinePlugin` injects a compile-time flag.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/webpack/002-loader-plugin-order`
- Verify the reference solution: `pnpm drill:check ts-react/webpack/002-loader-plugin-order --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- webpack
- loaders
- plugins
