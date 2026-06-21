# sysctl Forwarding Flags

## Learning Objectives
- Read sysctl key/value output
- Identify forwarding flags
- Explain routing-capable host settings

## Task
Parse `data/sysctl-net.txt` and print enabled forwarding flags as `key=enabled`, sorted by key.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/sysctl/001-forwarding`
- Reference check: `node tools/drill-runner.mjs check networking-tools/sysctl/001-forwarding --solution`

## Expected Output
```text
net.ipv4.ip_forward=enabled
net.ipv6.conf.all.forwarding=enabled
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- sysctl
- kernel
- routing
