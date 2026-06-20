# Redact Secrets in Logs

## Learning Objectives
- Use capture groups in substitutions
- Redact several key names
- Preserve non-secret log fields

## Task
Edit `task.sh` so it replaces password, token, and api_key values with `REDACTED`, preserving key names.

Edit `starter/task.sh` or `starter/query.sql` as directed. The fixtures are local to each exercise. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check shell-tools/sed/002-redact-secrets`
- Reference check: `node tools/drill-runner.mjs check shell-tools/sed/002-redact-secrets --solution`

## Expected Output
```text
user=ada password=REDACTED action=login
token=REDACTED status=ok
api_key=REDACTED region=us
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- sed
- redaction
- logs
