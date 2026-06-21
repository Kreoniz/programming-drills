#!/usr/bin/env bash
set -euo pipefail
awk '$2 != "*" && $1 ~ /^[0-9]+$/ { ip=$3; gsub(/[()]/, "", ip); print $1, $2, ip }' data/traceroute.txt
