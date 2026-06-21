# Route Get Decision

## Learning Objectives
- Read route decision output
- Extract egress interface and source address
- Handle routes with a gateway

## Task
Parse `data/ip-route-get.txt` and print `dev=<dev> src=<src> via=<gateway-or-direct>`.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ip/004-route-get`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ip/004-route-get --solution`

## Expected Output
```text
dev=eth0 src=192.168.10.23 via=192.168.10.1
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ip
- routes
- diagnostics
