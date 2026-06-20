# Shared Dependency Version Mismatch

## Learning Objectives
- Reason about shared dependency contracts
- Avoid duplicate React
- Surface version mismatches early

## Task
Adjust the shared config so React and React DOM are singletons with strict version checks and required versions sourced from package metadata.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `pnpm drill:check ts-react/microfrontends/002-shared-version-mismatch`
- Verify the reference solution: `pnpm drill:check ts-react/microfrontends/002-shared-version-mismatch --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- microfrontends
- module-federation
- shared-dependencies
