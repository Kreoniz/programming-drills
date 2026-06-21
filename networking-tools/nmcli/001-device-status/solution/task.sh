#!/usr/bin/env bash
set -euo pipefail
awk 'NR > 1 && $3 == "connected" && $2 != "loopback" { conn=$4; for (i=5;i<=NF;i++) conn=conn " " $i; print $1, $2, conn }' data/nmcli-device.txt | sort
