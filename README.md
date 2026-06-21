# Programming Drill System

This repository is a self-contained drill pack for practical Go foundations and advanced TypeScript/React engineering. It is not a tutorial-only repo: every drill has brief theory, a focused task, starter code with TODOs, automated checks, progressive hints, and a reference solution used by the verifier.

Current size: 168 drills total, with 61 Go drills, 58 TypeScript/React drills, 24 shell-tools drills, and 25 networking-tools drills.

## Setup
- Required locally: Go 1.22+ and Node 20+.
- Required for shell-tools drills: `rg`, GNU `sed`, GNU `awk`, `jq`, GNU `xargs`, and `sqlite3`.
- Required for networking-tools drills: common Linux networking utilities such as `ip`, `ifconfig`, `ss`, `curl`, `tcpdump`, `awk`, `sed`, and `jq`. The drills use local fixtures, so root and live network access are not required.
- Recommended: pnpm. This workspace uses pnpm scripts but has no required runtime install for the generated checkers.
- Optional for extending React runtime tests: add Vitest, React Testing Library, and React type packages when you want to turn static drills into executable app tests.

## Commands
- List drills: `pnpm drill:list`
- Check one starter: `pnpm drill:check go/foundation/001-zero-values`
- Check one reference solution: `pnpm drill:check ts-react/webpack/001-code-splitting --solution`
- Verify all reference solutions and metadata: `pnpm drill:verify`
- Verify starters are intentionally incomplete: `pnpm drill:verify:starters`
- Run all Go reference checks: `pnpm drill:check:go`
- Run all TS/React reference checks: `pnpm drill:check:ts`
- Run all shell-tools reference checks: `pnpm drill:check:shell`
- Run all networking-tools reference checks: `pnpm drill:check:net`

Inside a Go exercise you can also run `go test ./...`. Inside a type-level TS exercise you can run `tsc -p .`. Inside a static TS/React, shell-tools, or networking-tools exercise you can run `node ../tests/check.mjs .`. If your pnpm installation tries to auto-install before running scripts, use `pnpm_config_verify_deps_before_run=false pnpm drill:list` or call the runner directly with `node tools/drill-runner.mjs list`.

## How To Practice
Pick one exercise, open its `TASK.md`, read `THEORY.md`, then edit files only under `starter/`. Run the root check command until it passes. Use `HINTS.md` progressively when stuck. Avoid reading `solution/` until after you finish or deliberately want to compare approaches.

## Recommended Study Path
Start Go in order: `go/foundation`, `go/idioms`, `go/testing`, `go/concurrency`, then the practical HTTP, CLI, generics, and architecture drills. Start TS/React with `typescript-deep-dive`, then React architecture, performance, testing, bundlers, microfrontends, monorepo, and design-systems. Start shell-tools with `shell-tools/rg`, then `sed`, `awk`, `jq`, `xargs`, and `sqlite3`. Start networking with `networking-tools/ip`, then `ifconfig`, `ipconfig`, `ss`, DNS, ping/traceroute, curl, tcpdump, neighbor tables, firewall output, NetworkManager, ethtool, and sysctl.

## How Tracks Differ
Go drills are mostly executable packages with Go unit tests, table-driven tests, benchmarks, fuzz targets, concurrency tests, and standard-library APIs. TS/React drills assume you already know ordinary React and TypeScript. Many use compile-time type tests or static engineering checks for architecture, bundler, federation, and test-code tasks where installing a full app would add noise. Shell-tools drills use local fixtures and exact-output command checks for practical `rg`, `sed`, `awk`, `jq`, `xargs`, and `sqlite3` pipelines. Networking-tools drills use captured outputs from real utilities so you can practice diagnosis without depending on the host network.

## Troubleshooting
If `pnpm drill:verify` fails, open `tools/verify-report.json` for the exact drill and phase. If `tsc` is missing, install TypeScript locally or use a Node version that has access to `tsc`. If a starter check fails, that is expected until you implement the TODOs. If a solution check fails, the drill library itself is broken and should be fixed before practicing that exercise.
