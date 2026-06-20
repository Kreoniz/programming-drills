# Module Path Parsing

## Learning Objectives
- Reason about module path components
- Return structured parse results
- Reject malformed input

## Task
Implement `ParseModulePath` for paths shaped like `host/owner/name`. Return ok=false when fewer than three path segments are present.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/foundation/010-module-paths`
- Verify the reference solution: `pnpm drill:check go/foundation/010-module-paths --solution`

## Difficulty
beginner

## Estimated Time
25 minutes

## Tags
- go
- foundation
- modules
- packages
