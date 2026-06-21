# dig Answer Records

## Learning Objectives
- Read dig answer sections
- Extract record TTL and address
- Ignore comments and metadata

## Task
Parse `data/dig-example.txt` and print A records as `name ttl ip`, sorted by IP.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/dns/002-dig-answer`
- Reference check: `node tools/drill-runner.mjs check networking-tools/dns/002-dig-answer --solution`

## Expected Output
```text
example.com. 300 93.184.216.34
www.example.com. 60 93.184.216.34
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- dns
- dig
- records
- awk
