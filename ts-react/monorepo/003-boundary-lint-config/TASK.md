# Dependency Boundary Lint Config

## Learning Objectives
- Encode dependency boundaries
- Protect public package APIs
- Prevent app-to-package coupling leaks

## Task
Complete the boundary config so apps may depend on packages, but packages cannot import from apps or package internals.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check ts-react/monorepo/003-boundary-lint-config`
- Reference check: `node tools/drill-runner.mjs check ts-react/monorepo/003-boundary-lint-config --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- monorepo
- dependency-graph
- boundaries
