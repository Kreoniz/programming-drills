#!/usr/bin/env bash
set -euo pipefail
awk '$1 == "LISTEN" { split($4,a,":"); port=a[length(a)]; proc=$0; sub(/^.*users:\(\(\"/, "", proc); sub(/\".*$/, "", proc); print port, proc }' data/ss-ltnp.txt | sort -n
