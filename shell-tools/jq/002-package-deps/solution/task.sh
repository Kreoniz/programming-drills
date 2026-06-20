#!/usr/bin/env bash
set -euo pipefail
jq -r '(.dependencies // {}) + (.devDependencies // {}) | to_entries[] | "\(.key)@\(.value)"' data/package.json | sort
