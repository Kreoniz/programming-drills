#!/usr/bin/env bash
set -euo pipefail
sed -E -e '/^[[:space:]]*(#|$)/d' -e 's/^[[:space:]]+//' -e 's/[[:space:]]*=[[:space:]]*/=/' data/app.env
