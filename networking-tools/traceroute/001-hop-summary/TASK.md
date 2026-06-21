# traceroute Hop Summary

## Learning Objectives
- Read traceroute hop numbers
- Ignore timeout hops
- Extract host and IP fields

## Task
Parse `data/traceroute.txt` and print responsive hops as `hop host ip`, excluding timeout-only hops.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/traceroute/001-hop-summary`
- Reference check: `node tools/drill-runner.mjs check networking-tools/traceroute/001-hop-summary --solution`

## Expected Output
```text
1 router.local 192.168.10.1
3 edge.example.net 203.0.113.1
4 example.com 93.184.216.34
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- traceroute
- routing
- latency
- awk
