# hosts File Overrides

## Learning Objectives
- Read hosts-file alias rows
- Ignore comments and loopback entries
- Expand multiple aliases per address

## Task
Parse `data/hosts` and print `hostname ip` for non-loopback host aliases, sorted by hostname.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/dns/003-hosts-overrides`
- Reference check: `node tools/drill-runner.mjs check networking-tools/dns/003-hosts-overrides --solution`

## Expected Output
```text
api 192.168.10.20
api.local 192.168.10.20
db.local 192.168.10.21
postgres.local 192.168.10.21
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- dns
- hosts
- awk
