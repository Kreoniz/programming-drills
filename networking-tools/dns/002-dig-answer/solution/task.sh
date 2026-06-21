#!/usr/bin/env bash
set -euo pipefail
awk '$4 == "A" { print $1, $2, $5 }' data/dig-example.txt | sort -k3,3 -k1,1
