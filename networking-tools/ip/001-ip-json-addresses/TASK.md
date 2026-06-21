# ip JSON Address Inventory

## Learning Objectives
- Read `ip -j addr` style output
- Select non-loopback IPv4 addresses
- Use structured JSON instead of brittle text parsing

## Task
Produce `interface address/prefix` lines for non-loopback IPv4 addresses from `data/ip-addr.json`, sorted by interface.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ip/001-ip-json-addresses`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ip/001-ip-json-addresses --solution`

## Expected Output
```text
eth0 192.168.10.23/24
wlan0 10.20.0.8/16
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ip
- iproute2
- interfaces
- jq
