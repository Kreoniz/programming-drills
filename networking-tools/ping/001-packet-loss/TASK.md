# ping Packet Loss and RTT

## Learning Objectives
- Read packet loss summaries
- Extract average RTT
- Produce a compact diagnostic line

## Task
Parse `data/ping.txt` and print `loss=<loss> avg_ms=<avg>` from the packet summary and RTT line.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ping/001-packet-loss`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ping/001-packet-loss --solution`

## Expected Output
```text
loss=25% avg_ms=18.734
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ping
- latency
- packet-loss
- sed
