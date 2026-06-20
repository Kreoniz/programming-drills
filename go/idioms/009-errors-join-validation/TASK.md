# Joining Validation Errors

## Learning Objectives
- Combine multiple validation errors
- Keep errors.Is compatibility
- Validate independent fields in one pass

## Task
Implement `ValidateProfile`. Missing name should include `ErrMissingName`; invalid email should include `ErrInvalidEmail`. Return nil when both fields are valid.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/idioms/009-errors-join-validation`
- Reference check: `node tools/drill-runner.mjs check go/idioms/009-errors-join-validation --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- idioms
- errors
- validation
