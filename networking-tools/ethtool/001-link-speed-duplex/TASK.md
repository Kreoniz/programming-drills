# ethtool Speed and Duplex

## Learning Objectives
- Read physical link details
- Extract speed and duplex
- Check carrier state

## Task
Parse `data/ethtool-eth0.txt` and print `speed=<speed> duplex=<duplex> link=<yes|no>`.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ethtool/001-link-speed-duplex`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ethtool/001-link-speed-duplex --solution`

## Expected Output
```text
speed=1000Mb/s duplex=Full link=yes
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ethtool
- ethernet
- link
