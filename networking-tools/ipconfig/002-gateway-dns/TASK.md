# Windows ipconfig Gateway and DNS

## Learning Objectives
- Extract gateway fields
- Collect multi-line DNS server fields
- Summarize Windows resolver configuration

## Task
Parse `data/ipconfig-dns.txt` and print `adapter gateway dns1,dns2` for adapters with a default gateway.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ipconfig/002-gateway-dns`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ipconfig/002-gateway-dns --solution`

## Expected Output
```text
Wireless LAN adapter Wi-Fi 10.0.0.1 1.1.1.1,8.8.8.8
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ipconfig
- windows
- dns
- gateway
