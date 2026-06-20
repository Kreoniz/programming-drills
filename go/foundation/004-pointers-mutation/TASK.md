# Pointers and Intentional Mutation

## Learning Objectives
- Use pointers for mutation
- Protect nil inputs
- Separate validation from state changes

## Task
Implement `Withdraw`. It should reject nil accounts, non-positive amounts, and overdrafts. On success it mutates the account balance and returns true.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/foundation/004-pointers-mutation`
- Verify the reference solution: `pnpm drill:check go/foundation/004-pointers-mutation --solution`

## Difficulty
beginner

## Estimated Time
25 minutes

## Tags
- go
- foundation
- pointers
