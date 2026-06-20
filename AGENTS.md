# AGENTS.md

## Project Goals
Build and maintain a serious local programming drill system for Go foundations and advanced TypeScript/React engineering. Drills must be practical, focused, automatically checked, and usable without cloud services.

## Folder Layout
- `go/`: Go drill tracks from foundation through architecture.
- `ts-react/`: advanced TypeScript, React architecture, performance, testing, bundlers, microfrontends, monorepo, and design-system drills.
- `shell-tools/`: command-line drills for `rg`, `sed`, `awk`, `jq`, `xargs`, and `sqlite3`.
- `tools/`: drill runner, verifier, generated reports, and authoring helpers.
- `docs/`: roadmaps and authoring/checking documentation.
- Root docs: `README.md`, `backlog.md`, and `TOMORROW.md`.

## Authoring Rules
Every exercise needs `exercise.json`, `THEORY.md` with 100-250 words, `TASK.md`, `HINTS.md`, `starter/`, `solution/`, and at least one automated checker. Starter code must contain TODOs and must not pass all checks. Reference solutions must pass.

## Commands
- `pnpm drill:list`
- `pnpm drill:check <id>`
- `pnpm drill:check <id> --solution`
- `pnpm drill:verify`
- `pnpm drill:verify:starters`
- `pnpm drill:check:shell`

## Validation Requirements
The verifier checks metadata shape, required files, theory length, checker presence, and all reference solution commands. It writes `tools/verify-report.json` and exits nonzero on broken drills.

## Privacy and Safety Notes
The drills are local-only. Do not add paid APIs, cloud dependencies, telemetry, or secrets. Keep sample endpoints fake and deterministic.

## Definition of Done
A drill is done when its starter is incomplete, its solution passes, its task and theory are clear, its metadata is valid, and `pnpm drill:verify` remains green.
