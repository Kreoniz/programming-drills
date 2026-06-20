#!/usr/bin/env bash
set -euo pipefail
jq -r 'sort_by(.status) | group_by(.status)[] | "\(.[0].status) \(map(.duration) | add)"' data/events.json
