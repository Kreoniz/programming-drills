# curl Response Header Audit

## Learning Objectives
- Read HTTP response headers
- Normalize header names
- Extract cache and content-type behavior

## Task
Parse `data/headers.txt` and print `content-type=<value>` and `cache=<value>` with lowercase header names.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/curl/002-response-headers`
- Reference check: `node tools/drill-runner.mjs check networking-tools/curl/002-response-headers --solution`

## Expected Output
```text
content-type=text/html; charset=UTF-8
cache=max-age=3600
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- curl
- http
- headers
- awk
