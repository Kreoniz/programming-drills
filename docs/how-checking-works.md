# How Checking Works

The root runner discovers every `exercise.json` under `go/`, `ts-react/`, `shell-tools/`, and `networking-tools/`. A starter check runs `check_command` from the exercise's `starter/` directory. A reference check runs `solution_check_command` from `solution/`.

Go drills use `go test ./...` inside an isolated module. Type-level TypeScript drills use `tsc -p .` with compile-time assertions. Architecture and tooling drills use local Node checkers in `tests/check.mjs` to inspect the intended source/config files for required engineering decisions. Shell-tools drills use local fixtures plus `tests/check.mjs` to execute `task.sh` or `query.sql` wrappers and compare exact stdout. Networking-tools drills also use fixtures, which means you practice parsing `ip`, `ifconfig`, `ipconfig`, `ss`, DNS, curl, tcpdump, firewall, and sysctl output without requiring root or live network access.

`pnpm drill:verify` scans metadata, required files, theory word counts, checker presence, and all reference solutions. `pnpm drill:verify:starters` additionally checks that starters fail, which protects against accidentally solved starter code.
