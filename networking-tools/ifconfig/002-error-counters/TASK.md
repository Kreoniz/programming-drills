# ifconfig Error Counters

## Learning Objectives
- Read error counters
- Track interface context
- Report only suspicious interfaces

## Task
Parse `data/ifconfig-errors.txt` and print interfaces with nonzero RX or TX errors/drops as `iface rx_errors rx_dropped tx_errors tx_dropped`.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ifconfig/002-error-counters`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ifconfig/002-error-counters --solution`

## Expected Output
```text
eth0 2 4 0 1
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ifconfig
- errors
- packet-loss
- awk
