#!/usr/bin/env bash
set -euo pipefail
awk 'NR > 1 && $1 != "LISTEN" { count[$1]++ } END { for (state in count) print state, count[state] }' data/ss-tan.txt | sort
