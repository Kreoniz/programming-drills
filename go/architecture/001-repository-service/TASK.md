# Repository and Service Boundary

## Learning Objectives
- Separate service policy from storage
- Use narrow repository interfaces
- Keep domain validation close to the use case

## Task
Implement `RegistrationService.Register`. Normalize email, reject empty or duplicate emails, create a `User`, save it through the repository, and return the saved user.

Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

## Expected Commands
- From this exercise: `go test ./...`
- From the repository root: `pnpm drill:check go/architecture/001-repository-service`
- Verify the reference solution: `pnpm drill:check go/architecture/001-repository-service --solution`

## Difficulty
intermediate+

## Estimated Time
25 minutes

## Tags
- go
- architecture
- repository
- services
