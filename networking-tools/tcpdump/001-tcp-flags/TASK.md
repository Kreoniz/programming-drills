# tcpdump TCP Flag Counts

## Learning Objectives
- Read tcpdump TCP flags
- Distinguish SYN from SYN-ACK
- Summarize handshake patterns

## Task
Parse `data/tcpdump-tcp.txt` and count SYN-only, SYN-ACK, and FIN packets.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/tcpdump/001-tcp-flags`
- Reference check: `node tools/drill-runner.mjs check networking-tools/tcpdump/001-tcp-flags --solution`

## Expected Output
```text
FIN 1
SYN 2
SYN-ACK 1
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- tcpdump
- tcp
- packets
- awk
