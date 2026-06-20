#!/usr/bin/env bash
set -euo pipefail
awk '{ bucket = int($3 / 100) "xx"; count[bucket]++ } END { for (bucket in count) print bucket, count[bucket] }' data/access.log | sort
