# Dependency Injection without a Framework

## Learning Objectives
- Inject behavior through interfaces
- Keep services testable
- Validate before side effects

## Task
Implement `Welcome`. Validate that the email contains `@`, then use the injected sender to send a welcome message.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/idioms/008-dependency-injection-service`
- Verify the reference solution: `pnpm drill:check go/idioms/008-dependency-injection-service --solution`

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- go
- idioms
- dependency-injection
- interfaces
