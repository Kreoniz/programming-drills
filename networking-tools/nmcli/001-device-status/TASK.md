# nmcli Device Status

## Learning Objectives
- Read NetworkManager device state
- Filter connected devices
- Preserve multi-word connection names

## Task
Parse `data/nmcli-device.txt` and print connected devices as `device type connection`, sorted by device.

Edit `starter/task.sh`. The files under `data/` are captured outputs from networking utilities. The `solution/` directory is only for reference verification.

## Expected Commands
- From this exercise: `node ../tests/check.mjs .`
- From the repository root: `node tools/drill-runner.mjs check networking-tools/nmcli/001-device-status`
- Reference check: `node tools/drill-runner.mjs check networking-tools/nmcli/001-device-status --solution`

## Expected Output
```text
enp1s0 ethernet Wired connection 1
wlp2s0 wifi Corp WiFi
```

## Difficulty
intermediate

## Estimated Time
25 minutes

## Tags
- nmcli
- networkmanager
- interfaces
