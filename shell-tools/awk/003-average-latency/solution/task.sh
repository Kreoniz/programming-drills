#!/usr/bin/env bash
set -euo pipefail
awk -F, 'NR > 1 { sum[$1] += $2; count[$1]++ } END { for (endpoint in sum) printf "%s %.1f\n", endpoint, sum[endpoint] / count[endpoint] }' data/latency.csv | sort
