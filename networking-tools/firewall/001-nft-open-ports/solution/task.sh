#!/usr/bin/env bash
set -euo pipefail
sed -n 's/.*tcp dport \([0-9][0-9]*\) accept.*/\1/p' data/nft-ruleset.txt | sort -n
