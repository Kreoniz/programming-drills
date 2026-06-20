#!/usr/bin/env bash
set -euo pipefail
xargs -I{} printf 'https://api.example.test/users/%s\n' {} < data/user-ids.txt
