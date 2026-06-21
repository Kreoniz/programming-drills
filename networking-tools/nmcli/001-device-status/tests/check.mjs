#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const target = path.resolve(process.argv[2] ?? ".");
const expected = "enp1s0 ethernet Wired connection 1\nwlp2s0 wifi Corp WiFi\n";
const staticIncludes = ["awk","connected"];
const body = readFileSync(path.join(target, "task.sh"), "utf8");
const failures = [];

if (/(^|\n)\s*# TODO/.test(body)) failures.push("task.sh still contains starter TODO markers");
for (const token of staticIncludes) {
  if (!body.includes(token)) failures.push("task.sh must include: " + token);
}

const result = spawnSync("bash", ["task.sh"], {
  cwd: target,
  encoding: "utf8",
  env: { ...process.env, LC_ALL: "C" },
});
if (result.status !== 0) {
  failures.push("task exited with " + result.status + "\n" + result.stderr);
}
const stdout = result.stdout.replace(/\r\n/g, "\n");
if (stdout !== expected) {
  failures.push("stdout mismatch\nGOT:\n" + stdout + "\nWANT:\n" + expected);
}

if (failures.length) {
  console.error(failures.map(f => "- " + f).join("\n"));
  process.exit(1);
}
console.log("networking tool checks passed");
