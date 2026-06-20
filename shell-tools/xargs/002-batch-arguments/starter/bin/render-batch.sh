#!/usr/bin/env bash
printf 'batch:'
for arg in "$@"; do printf ' %s' "$arg"; done
printf '\n'
