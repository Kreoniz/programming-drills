# Reducer Command Pattern

## Learning Objectives
- Keep reducers pure
- Model side effects as commands
- Make orchestration testable

## Task
Refactor the reducer so it returns `{ state, command }`, keeping navigation and analytics as commands instead of executing them inside the reducer.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check ts-react/react-architecture/009-reducer-command-pattern`
- Reference check: `node tools/drill-runner.mjs check ts-react/react-architecture/009-reducer-command-pattern --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- react
- reducers
- architecture
