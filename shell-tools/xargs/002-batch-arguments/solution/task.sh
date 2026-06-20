#!/usr/bin/env bash
set -euo pipefail
xargs -n 2 bash bin/render-batch.sh < data/services.txt
