#!/usr/bin/env bash
set -euo pipefail
xargs -P 2 -n 1 bash bin/render-service.sh < data/services.txt | sort
