#!/usr/bin/env bash
set -euo pipefail
jq -r '.[] | select(.ifname != "lo") | .ifname as $if | .addr_info[] | select(.family == "inet") | "\($if) \(.local)/\(.prefixlen)"' data/ip-addr.json | sort
