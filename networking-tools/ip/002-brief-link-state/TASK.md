# ip Brief Link State

## Learning Objectives
- Read brief iproute2 output
- Filter virtual interfaces
- Produce quick interface-state reports

## Task
Parse `data/ip-br-link.txt` and print physical interface names with their state, excluding loopback and virtual docker interfaces.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ip/002-brief-link-state`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ip/002-brief-link-state --solution`

## Expected Output
```text
enp1s0 UP
wlp2s0 DOWN
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ip
- iproute2
- interfaces
- awk
