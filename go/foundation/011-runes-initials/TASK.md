# Rune-Aware Initials

## Learning Objectives
- Iterate over runes instead of bytes
- Use strings.Fields for whitespace
- Format Unicode text safely enough for names

## Task
Implement `Initials`. Trim and split a name into fields, take the first rune of each field, uppercase it, and join initials without separators.

Edit files only under `starter/` while practicing. The `solution/` directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `node tools/drill-runner.mjs check go/foundation/011-runes-initials`
- Reference check: `node tools/drill-runner.mjs check go/foundation/011-runes-initials --solution`

## Difficulty
intermediate

## Estimated Time
30 minutes

## Tags
- go
- foundation
- strings
- unicode
