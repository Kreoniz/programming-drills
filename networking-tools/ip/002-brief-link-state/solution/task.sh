#!/usr/bin/env bash
set -euo pipefail
awk '$1 != "lo" && $1 !~ /^docker/ { print $1, $2 }' data/ip-br-link.txt | sort
