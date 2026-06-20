# Context-Aware Repository Service

## Learning Objectives
- Pass context through service boundaries
- Keep repository interfaces narrow
- Format domain output after data access

## Task
Implement `UserService.DisplayName`. It should call the repository with the provided context, propagate errors, and return `Name <email>`.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/architecture/003-context-repository-timeout`
- Reference check: `node tools/drill-runner.mjs check go/architecture/003-context-repository-timeout --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- architecture
- context
- repository
