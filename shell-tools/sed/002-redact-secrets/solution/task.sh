#!/usr/bin/env bash
set -euo pipefail
sed -E 's/(password|token|api_key)=[^ ]+/\1=REDACTED/g' data/log.txt
