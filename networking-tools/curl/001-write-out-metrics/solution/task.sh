#!/usr/bin/env bash
set -euo pipefail
awk -F= '{ v[$1]=$2 } END { printf "status=%s remote=%s total=%s\n", v["http_code"], v["remote_ip"], v["time_total"] }' data/curl-write-out.txt
