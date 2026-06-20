#!/usr/bin/env bash
set -euo pipefail
sed -E '/^import /s#from "@old/ui([^"]*)"#from "@acme/ui\1"#' data/component.tsx
