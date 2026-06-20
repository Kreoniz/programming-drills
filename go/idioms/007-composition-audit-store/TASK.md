# Composition over Frameworks

## Learning Objectives
- Compose small interfaces
- Add cross-cutting behavior directly
- Avoid framework-style dependency containers

## Task
Implement `AuditStore.Save`. It should save through the composed store, then log `saved: <value>` only after a successful save.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/idioms/007-composition-audit-store`
- Verify the reference solution: `pnpm drill:check go/idioms/007-composition-audit-store --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- idioms
- composition
- interfaces
