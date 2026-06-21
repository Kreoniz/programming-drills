#!/usr/bin/env bash
set -euo pipefail
awk 'BEGIN{FS=": "} { key=tolower($1); if (key=="content-type") ct=$2; if (key=="cache-control") cache=$2 } END { print "content-type=" ct; print "cache=" cache }' data/headers.txt
