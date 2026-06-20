#!/usr/bin/env bash
set -euo pipefail
rg --json '"level":"error"' data/logs | jq -r 'select(.type == "match") | 1' | wc -l | tr -d ' '
