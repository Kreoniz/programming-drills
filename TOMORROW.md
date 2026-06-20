# TOMORROW

1. Run `pnpm drill:list` to scan the 143-drill library. If pnpm tries to auto-install first, use `pnpm_config_verify_deps_before_run=false pnpm drill:list` or `node tools/drill-runner.mjs list`.
2. Start with `go/foundation/001-zero-values` if you want Go fundamentals.
3. Start with `ts-react/typescript-deep-dive/001-conditional-api-data` if you want advanced TS/React.
4. For each drill, read `THEORY.md`, then `TASK.md`, edit only `starter/`, and run `pnpm drill:check <id>`.
5. Use `HINTS.md` before opening `solution/`.
6. Start with `shell-tools/rg/001-todo-audit` if you want command-line search and data-processing practice.
7. Run `pnpm drill:verify` when you want to confirm the reference library is still healthy.

Recommended first overnight set:
- Go: foundation 001-006, idioms 001-003, testing 001.
- TS/React: TypeScript deep dive 001-004, React architecture 001, performance 001.
- Shell tools: rg 001-002, sed 001, awk 001, jq 001, xargs 001, sqlite3 001.
