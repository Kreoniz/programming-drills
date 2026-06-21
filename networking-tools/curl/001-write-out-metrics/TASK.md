# curl Write-Out Metrics

## Learning Objectives
- Read curl diagnostic metrics
- Extract HTTP status and timing
- Summarize remote endpoint information

## Task
Parse `data/curl-write-out.txt` and print `status=<code> remote=<ip> total=<seconds>`.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/curl/001-write-out-metrics`
- Reference check: `node tools/drill-runner.mjs check networking-tools/curl/001-write-out-metrics --solution`

## Expected Output
```text
status=200 remote=93.184.216.34 total=0.153
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- curl
- http
- diagnostics
- awk
