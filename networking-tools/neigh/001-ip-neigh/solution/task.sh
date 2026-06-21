#!/usr/bin/env bash
set -euo pipefail
awk '$NF == "STALE" || $NF == "FAILED" { for (i=1;i<=NF;i++) if ($i=="dev") dev=$(i+1); print $1, dev, $NF }' data/ip-neigh.txt
