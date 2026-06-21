#!/usr/bin/env bash
set -euo pipefail
awk '/^[^[:space:]]/ { if (iface && (rxe+rxd+txe+txd)>0) print iface, rxe, rxd, txe, txd; iface=$1; sub(/:$/, "", iface); rxe=rxd=txe=txd=0 } /RX errors/ { rxe=$3; rxd=$5 } /TX errors/ { txe=$3; txd=$5 } END { if (iface && (rxe+rxd+txe+txd)>0) print iface, rxe, rxd, txe, txd }' data/ifconfig-errors.txt
