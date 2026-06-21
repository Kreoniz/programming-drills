#!/usr/bin/env bash
set -euo pipefail
awk '$1 == "search" { print $0 } $1 == "nameserver" { ns = ns " " $2 } END { sub(/^ /, "", ns); print "nameservers " ns }' data/resolv.conf
