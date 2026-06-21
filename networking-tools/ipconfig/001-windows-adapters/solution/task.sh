#!/usr/bin/env bash
set -euo pipefail
awk '/ adapter .*:$/ { adapter=$0; sub(/:$/, "", adapter) } /IPv4 Address/ { ip=$NF; sub(/\(Preferred\)/, "", ip); print adapter "|" ip }' data/ipconfig.txt
