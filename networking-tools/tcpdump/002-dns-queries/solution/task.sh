#!/usr/bin/env bash
set -euo pipefail
awk '$0 ~ / A\? / { for (i=1;i<=NF;i++) if ($i=="A?") print $(i+1) }' data/tcpdump-dns.txt | sort -u
