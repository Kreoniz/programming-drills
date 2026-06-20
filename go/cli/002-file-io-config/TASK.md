# File I/O for Config

## Learning Objectives
- Use os.Open and bufio.Scanner
- Parse simple config safely
- Return file and scanner errors

## Task
Implement `ReadConfig`. Read `KEY=value` lines, skip blanks and comments beginning with `#`, and return a map.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/cli/002-file-io-config`
- Verify the reference solution: `pnpm drill:check go/cli/002-file-io-config --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- cli
- file-io
- configuration
