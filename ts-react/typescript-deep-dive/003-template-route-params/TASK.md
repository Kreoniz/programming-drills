# Template Literal Route Params

## Learning Objectives
- Use template literal types
- Build recursive type transforms
- Type route contracts from strings

## Task
Implement `RouteParams<Path>` so `/users/:userId/posts/:postId` becomes `{ userId: string; postId: string }`.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `tsc -p .`
- From the repository root: `pnpm drill:check ts-react/typescript-deep-dive/003-template-route-params`
- Verify the reference solution: `pnpm drill:check ts-react/typescript-deep-dive/003-template-route-params --solution`

## Difficulty
advanced

## Estimated Time
35 minutes

## Tags
- typescript
- template-literal-types
- routing
