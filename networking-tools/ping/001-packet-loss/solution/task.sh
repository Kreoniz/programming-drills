#!/usr/bin/env bash
set -euo pipefail
loss=$(sed -n 's/.*received, \([0-9.]*%\) packet loss.*/\1/p' data/ping.txt)
avg=$(sed -n 's#rtt min/avg/max/mdev = [^/]*/\([^/]*\)/.*#\1#p' data/ping.txt)
printf 'loss=%s avg_ms=%s\n' "$loss" "$avg"
