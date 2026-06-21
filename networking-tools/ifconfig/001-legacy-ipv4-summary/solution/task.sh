#!/usr/bin/env bash
set -euo pipefail
awk '/^[^[:space:]]/ { iface=$1; sub(/:$/, "", iface) } /^[[:space:]]+inet / && iface != "lo" { print iface, $2, $4, $6 }' data/ifconfig.txt
