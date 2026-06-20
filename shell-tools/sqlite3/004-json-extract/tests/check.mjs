#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const target = path.resolve(process.argv[2] ?? ".");
const expected = "created|acct_1\nupdated|acct_2\n";
const staticIncludes = ["json_extract","ORDER BY"];
const checkFile = "query.sql";
const body = readFileSync(path.join(target, checkFile), "utf8");
const failures = [];

if (/(^|\n)\s*# TODO|SELECT 'TODO'/.test(body)) failures.push(checkFile + " still contains starter TODO markers");
for (const token of staticIncludes) {
  if (!body.includes(token)) failures.push(checkFile + " must include: " + token);
}
if (!existsSync(path.join(target, "task.sh"))) failures.push("missing task.sh");

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
console.log("shell tool checks passed");
