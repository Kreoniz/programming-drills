# Default Route Report

## Learning Objectives
- Identify default routes
- Extract gateway, device, and metric
- Reason about route priority

## Task
Parse `data/ip-route.txt` and print default routes as `metric gateway dev`, sorted by metric.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ip/003-default-routes`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ip/003-default-routes --solution`

## Expected Output
```text
100 192.168.10.1 eth0
600 10.20.0.1 wlan0
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ip
- routes
- gateway
- awk
