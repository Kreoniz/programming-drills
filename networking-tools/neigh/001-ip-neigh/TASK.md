# Neighbor Table States

## Learning Objectives
- Read neighbor table states
- Identify suspicious neighbor entries
- Preserve interface context

## Task
Parse `data/ip-neigh.txt` and print `ip dev state` for STALE or FAILED neighbors.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/neigh/001-ip-neigh`
- Reference check: `node tools/drill-runner.mjs check networking-tools/neigh/001-ip-neigh --solution`

## Expected Output
```text
192.168.10.50 eth0 STALE
192.168.10.99 eth0 FAILED
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ip
- neigh
- arp
- layer2
