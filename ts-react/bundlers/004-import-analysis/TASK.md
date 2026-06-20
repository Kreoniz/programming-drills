# Import Graph Analysis Script

## Learning Objectives
- Reason about import graphs
- Parse common import forms
- Separate graph analysis from bundler execution

## Task
Implement `findImports` so it extracts static `import ... from` and dynamic `import()` specifiers from a source string.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check ts-react/bundlers/004-import-analysis`
- Reference check: `node tools/drill-runner.mjs check ts-react/bundlers/004-import-analysis --solution`

## Difficulty
advanced

## Estimated Time
40 minutes

## Tags
- bundlers
- dependency-graph
- node
