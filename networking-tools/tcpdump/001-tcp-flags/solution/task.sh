#!/usr/bin/env bash
set -euo pipefail
awk '/Flags \[S\]/ { syn++ } /Flags \[S\.\]/ { synack++ } /Flags \[F\.\]/ { fin++ } END { print "FIN", fin+0; print "SYN", syn+0; print "SYN-ACK", synack+0 }' data/tcpdump-tcp.txt
