#!/usr/bin/env bash
set -euo pipefail
rg --line-number --glob '!**/vendor/**' 'TODO|FIXME' data/src | sort
