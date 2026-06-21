#!/usr/bin/env bash
set -euo pipefail
awk '$1 !~ /^#/ && $1 !~ /^127\./ && NF > 1 { for (i=2;i<=NF;i++) print $i, $1 }' data/hosts | sort
