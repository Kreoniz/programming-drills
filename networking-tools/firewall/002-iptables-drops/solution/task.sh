#!/usr/bin/env bash
set -euo pipefail
awk '$3 == "DROP" { port=""; for (i=1;i<=NF;i++) if ($i ~ /^dpt:/) { port=$i; sub(/^dpt:/, "", port) } print $1, $3, $4, port }' data/iptables.txt | sort -nr
