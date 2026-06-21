# ss Listening TCP Ports

## Learning Objectives
- Read ss listening socket output
- Extract local ports
- Identify owning processes

## Task
Parse `data/ss-ltnp.txt` and print `port process` for listening TCP sockets, sorted numerically by port.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/ss/001-listening-tcp`
- Reference check: `node tools/drill-runner.mjs check networking-tools/ss/001-listening-tcp --solution`

## Expected Output
```text
22 sshd
5432 postgres
8080 node
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- ss
- ports
- processes
- sockets
