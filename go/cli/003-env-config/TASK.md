# Environment Configuration Loader

## Learning Objectives
- Inject environment lookup for tests
- Apply defaults consistently
- Validate parsed configuration

## Task
Implement `LoadConfig`. Use `APP_PORT` with default 8080, `APP_ENV` with default `dev`, and return an error for invalid ports.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/cli/003-env-config`
- Reference check: `node tools/drill-runner.mjs check go/cli/003-env-config --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- cli
- configuration
- environment
