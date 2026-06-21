# ss Connection State Counts

## Learning Objectives
- Read ss TCP state names
- Count state distribution
- Ignore listening sockets when investigating active connections

## Task
Parse `data/ss-tan.txt` and count TCP connections by state, excluding the header and LISTEN sockets.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ss/002-connection-states`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ss/002-connection-states --solution`

## Expected Output
```text
ESTAB 3
SYN-SENT 1
TIME-WAIT 2
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ss
- tcp
- states
- awk
