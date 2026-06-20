# Command Handler Boundary

## Learning Objectives
- Separate command input from side effects
- Validate before persistence
- Publish events after successful writes

## Task
Implement `CreateProjectHandler.Handle`. Trim the name, reject empty names, call the store, and publish a `project.created` event after successful save.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/architecture/005-command-handler`
- Reference check: `node tools/drill-runner.mjs check go/architecture/005-command-handler --solution`

## Difficulty
intermediate+

## Estimated Time
30 minutes

## Tags
- go
- architecture
- commands
- events
