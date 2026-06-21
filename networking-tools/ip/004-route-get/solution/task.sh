#!/usr/bin/env bash
set -euo pipefail
awk 'NR == 1 { via="direct"; for (i=1;i<=NF;i++) { if ($i=="via") via=$(i+1); if ($i=="dev") dev=$(i+1); if ($i=="src") src=$(i+1) } printf "dev=%s src=%s via=%s\n", dev, src, via }' data/ip-route-get.txt
