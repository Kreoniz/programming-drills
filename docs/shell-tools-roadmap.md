# Shell Tools Roadmap

This track practices practical command-line data work with exact-output checks. Start with `shell-tools/rg` to build fast code-search habits: line-number TODO audits, file listing, PCRE2 captures, and machine-readable search output.

Move to `sed` for careful stream edits: config cleanup, secret redaction, marker-range extraction, and mechanical import rewrites. Then use `awk` for row-oriented reports: grouped totals, status buckets, averages, and latest-record selection.

The `jq` drills focus on structured JSON work instead of brittle text parsing: selection, dependency listings, grouped reductions, and CI-friendly schema gates. The `xargs` drills cover null-safe filenames, batching, placeholders, and parallel workers. Finish with `sqlite3` for local SQL workflows: filtered selects, joins, window functions, and JSON extraction.

For each drill, inspect the fixture files, edit `starter/task.sh` or `starter/query.sql`, and run `node tools/drill-runner.mjs check <id>`.
