#!/usr/bin/env bash
set -euo pipefail
find data/src -type f -print0 | xargs -0 rg -l 'TODO' | sort
