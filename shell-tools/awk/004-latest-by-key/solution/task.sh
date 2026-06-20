#!/usr/bin/env bash
set -euo pipefail
awk '{ if (!($1 in version) || $2 > version[$1]) { version[$1] = $2; row[$1] = $0 } } END { for (id in row) print row[id] }' data/records.txt | sort
