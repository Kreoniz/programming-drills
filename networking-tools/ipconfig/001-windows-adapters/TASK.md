# Windows ipconfig Adapter Summary

## Learning Objectives
- Read Windows ipconfig output
- Associate adapter blocks with IPv4 addresses
- Recognize disconnected media state

## Task
Parse `data/ipconfig.txt` and print adapters with IPv4 addresses as `adapter|ipv4`, excluding disconnected adapters.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ipconfig/001-windows-adapters`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ipconfig/001-windows-adapters --solution`

## Expected Output
```text
Ethernet adapter Ethernet|192.168.10.44
Wireless LAN adapter Wi-Fi|10.0.0.15
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ipconfig
- windows
- interfaces
- awk
