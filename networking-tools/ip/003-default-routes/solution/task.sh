#!/usr/bin/env bash
set -euo pipefail
awk '$1 == "default" { for (i=1;i<=NF;i++) { if ($i=="via") gw=$(i+1); if ($i=="dev") dev=$(i+1); if ($i=="metric") metric=$(i+1) } print metric, gw, dev }' data/ip-route.txt | sort -n
