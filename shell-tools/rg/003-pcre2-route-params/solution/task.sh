#!/usr/bin/env bash
set -euo pipefail
rg --pcre2 -o -r '$1' ':([A-Za-z_][A-Za-z0-9_]*)' data/routes.ts
