# Abortable Async Hook

## Learning Objectives
- Cancel stale async work
- Use effect cleanup correctly
- Model loading and error state

## Task
Complete `useAbortableQuery` so each key change creates an `AbortController`, aborts stale requests in cleanup, and ignores aborted failures.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check ts-react/react-architecture/008-abortable-async-hook`
- Reference check: `node tools/drill-runner.mjs check ts-react/react-architecture/008-abortable-async-hook --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- hooks
- async-ui
- abortcontroller
