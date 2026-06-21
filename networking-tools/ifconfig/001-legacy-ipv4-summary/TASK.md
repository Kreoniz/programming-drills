# ifconfig IPv4 Summary

## Learning Objectives
- Read legacy net-tools output
- Associate indented address lines with interfaces
- Extract IPv4, netmask, and broadcast fields

## Task
Parse `data/ifconfig.txt` and print `interface ipv4 netmask broadcast` for interfaces with IPv4 addresses, excluding loopback.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ifconfig/001-legacy-ipv4-summary`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ifconfig/001-legacy-ipv4-summary --solution`

## Expected Output
```text
eth0 192.168.10.23 255.255.255.0 192.168.10.255
wlan0 10.20.0.8 255.255.0.0 10.20.255.255
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ifconfig
- net-tools
- interfaces
- awk
