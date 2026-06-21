# iptables Drop Counters

## Learning Objectives
- Read iptables counters
- Extract destination ports
- Prioritize high-volume drops

## Task
Parse `data/iptables.txt` and print DROP rules with packet counts as `pkts target proto dpt`, sorted descending by packet count.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/firewall/002-iptables-drops`
- Reference check: `node tools/drill-runner.mjs check networking-tools/firewall/002-iptables-drops --solution`

## Expected Output
```text
120 DROP tcp 23
12 DROP tcp 5432
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- iptables
- firewall
- counters
- awk
