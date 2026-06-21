#!/usr/bin/env bash
set -euo pipefail
awk -F': ' '/Speed/ { speed=$2 } /Duplex/ { duplex=$2 } /Link detected/ { link=$2 } END { printf "speed=%s duplex=%s link=%s\n", speed, duplex, link }' data/ethtool-eth0.txt
