# resolv.conf Summary

## Learning Objectives
- Read resolver configuration
- Separate search domains from nameservers
- Ignore comments and options

## Task
Parse `data/resolv.conf` and print one line for search domains and one for nameservers.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/dns/001-resolv-conf`
- Reference check: `node tools/drill-runner.mjs check networking-tools/dns/001-resolv-conf --solution`

## Expected Output
```text
search corp.example internal.example
nameservers 10.0.0.53 1.1.1.1
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- dns
- resolv.conf
- awk
