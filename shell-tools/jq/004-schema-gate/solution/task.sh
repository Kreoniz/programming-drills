#!/usr/bin/env bash
set -euo pipefail
jq -e 'all(.users[]; (.id | type == "string") and (.roles | type == "array"))' data/users.json >/dev/null
echo ok
