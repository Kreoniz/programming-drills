# nftables Open TCP Ports

## Learning Objectives
- Read nftables rule syntax
- Identify accept rules
- Extract allowed destination ports

## Task
Parse `data/nft-ruleset.txt` and print allowed TCP destination ports from accept rules, one per line sorted numerically.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/firewall/001-nft-open-ports`
- Reference check: `node tools/drill-runner.mjs check networking-tools/firewall/001-nft-open-ports --solution`

## Expected Output
```text
22
443
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- nft
- firewall
- ports
- sed
