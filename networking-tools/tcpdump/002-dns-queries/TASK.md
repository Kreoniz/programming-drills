# tcpdump DNS Query Names

## Learning Objectives
- Recognize DNS query packets
- Extract queried names
- De-duplicate repeated queries

## Task
Parse `data/tcpdump-dns.txt` and print unique DNS query names, sorted alphabetically.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/tcpdump/002-dns-queries`
- Reference check: `node tools/drill-runner.mjs check networking-tools/tcpdump/002-dns-queries --solution`

## Expected Output
```text
api.internal.example.
example.com.
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- tcpdump
- dns
- packets
- awk
