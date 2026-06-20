# Backlog

## Completed
- Created project skeleton, docs, metadata schema, runner, and verifier.
- Authored 61 Go drills across foundation, idioms, testing, concurrency, HTTP, CLI, generics, and architecture.
- Authored 58 TS/React drills across advanced TypeScript, React architecture, performance, testing, webpack, Rspack, Vite/bundlers, microfrontends, monorepo, and design systems.
- Authored 24 shell-tools drills across `rg`, `sed`, `awk`, `jq`, `xargs`, and `sqlite3`.
- Added reference solutions and automated checks for every drill.
- Added `tools/generate-extra-drills.mjs` to keep the expansion reproducible.
- Added `tools/generate-shell-drills.mjs` and made `shell-tools/` a first-class runner/verifier track.
- Ran `node tools/verify-drills.mjs`: all 143 reference solutions passed.
- Ran `node tools/verify-drills.mjs --check-starters`: all starters failed as expected.
- Fixed generated `TASK.md` indentation across all 143 drills and added a verifier guard for indented markdown control lines.

## Validation Notes
- Plain `pnpm drill:list` attempted a pnpm auto-install preflight in this sandbox and failed on pnpm's store SQLite file.
- `pnpm_config_verify_deps_before_run=false pnpm drill:list` works.
- Direct Node commands work: `node tools/drill-runner.mjs list` and `node tools/verify-drills.mjs`.

## Future Improvements
- Add more real React runtime tests once dependencies are installed.
- Add Go HTTP router and graceful shutdown drills.
- Add Playwright-based UI flow drills.
- Add bundle-analysis artifacts for webpack/Rspack/Vite exercises.
- Add spaced-repetition study schedules based on completed drills.
