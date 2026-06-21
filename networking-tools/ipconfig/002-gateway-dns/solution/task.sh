#!/usr/bin/env bash
set -euo pipefail
awk '/ adapter .*:$/ { if (adapter && gw) print adapter, gw, dns; adapter=$0; sub(/:$/, "", adapter); dns=""; gw="" } /DNS Servers/ { dns=$NF; next } /^[[:space:]]+[0-9]+\./ && dns != "" { dns=dns "," $1 } /Default Gateway/ && $NF ~ /^[0-9]/ { gw=$NF } END { if (adapter && gw) print adapter, gw, dns }' data/ipconfig-dns.txt
