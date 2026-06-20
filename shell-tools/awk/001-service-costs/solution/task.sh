#!/usr/bin/env bash
set -euo pipefail
awk -F, 'NR > 1 { sum[$1] += $2 } END { for (service in sum) print service, sum[service] }' data/costs.csv | sort
