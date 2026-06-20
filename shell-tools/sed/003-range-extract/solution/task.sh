#!/usr/bin/env bash
set -euo pipefail
sed -n '/BEGIN MIGRATION/,/END MIGRATION/{/BEGIN MIGRATION/d;/END MIGRATION/d;p;}' data/deploy.log
