#!/usr/bin/env bash
set -euo pipefail
jq -r '.services[] | select(.enabled) | .name' data/services.json | sort
