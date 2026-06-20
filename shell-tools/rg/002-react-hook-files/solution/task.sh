#!/usr/bin/env bash
set -euo pipefail
rg -l --glob '*.tsx' --glob '!*test.tsx' 'use(Effect|Memo)\(' data/app | sort
