#!/usr/bin/env bash
set -euo pipefail
awk '$1 ~ /forward/ && $3 == 1 { print $1 "=enabled" }' data/sysctl-net.txt | sort
