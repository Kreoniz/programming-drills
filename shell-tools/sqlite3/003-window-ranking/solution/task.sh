#!/usr/bin/env bash
set -euo pipefail

sqlite3 -batch -noheader -separator '|' :memory: <<'SQL'
.read schema.sql
.read seed.sql
.read query.sql
SQL
