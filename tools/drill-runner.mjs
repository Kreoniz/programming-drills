#!/usr/bin/env node
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const trackRoots = ["go", "ts-react", "shell-tools"];
const goCache = path.join(root, ".cache", "go-build");
const goTmp = path.join(root, ".cache", "go-tmp");
mkdirSync(goCache, { recursive: true });
mkdirSync(goTmp, { recursive: true });

async function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.name === "exercise.json") out.push(full);
  }
  return out;
}

async function discover() {
  const nested = await Promise.all(trackRoots.map(track => walk(path.join(root, track))));
  const files = nested.flat();
  const exercises = [];
  for (const file of files) {
    const meta = JSON.parse(await readFile(file, "utf8"));
    exercises.push({ meta, dir: path.dirname(file) });
  }
  return exercises.sort((a, b) => a.meta.id.localeCompare(b.meta.id));
}

function run(command, cwd) {
  return new Promise((resolve) => {
    const child = spawn(command, {
      cwd,
      shell: true,
      stdio: "inherit",
      env: { ...process.env, GOCACHE: goCache, GOTMPDIR: goTmp, CGO_ENABLED: "0" },
    });
    child.on("close", (code) => resolve(code ?? 1));
  });
}

function usage() {
  console.log([
    "Usage:",
    "  pnpm drill:list",
    "  pnpm drill:check <exercise-id|prefix> [--solution|--starter]",
    "  pnpm drill:check go --solution",
    "  pnpm drill:check ts-react --solution",
    "  pnpm drill:verify",
  ].join("\n"));
}

const [cmd, target, ...flags] = process.argv.slice(2);
const mode = flags.includes("--solution") ? "solution" : "starter";

if (!cmd || cmd === "help") {
  usage();
  process.exit(0);
}

const exercises = await discover();

if (cmd === "list") {
  for (const { meta } of exercises) {
    console.log(`${meta.id.padEnd(58)} ${meta.difficulty.padEnd(14)} ${String(meta.estimated_minutes).padStart(3)}m  ${meta.title}`);
  }
  console.log(`\n${exercises.length} drills`);
  process.exit(0);
}

if (cmd === "check") {
  if (!target) {
    usage();
    process.exit(1);
  }
  const matches = exercises.filter(({ meta }) => meta.id === target || meta.id.startsWith(target + "/") || meta.id.startsWith(target));
  if (matches.length === 0) {
    console.error(`No drills match ${target}`);
    process.exit(1);
  }
  let failures = 0;
  for (const ex of matches) {
    const command = mode === "solution" ? ex.meta.solution_check_command : ex.meta.check_command;
    const cwd = path.join(ex.dir, mode === "solution" ? ex.meta.solution_path : ex.meta.starter_path);
    console.log(`\n==> ${ex.meta.id} [${mode}] :: ${command}`);
    const code = await run(command, cwd);
    if (code !== 0) failures++;
  }
  if (failures) {
    console.error(`\n${failures} drill check(s) failed`);
    process.exit(1);
  }
  console.log(`\nAll ${matches.length} drill check(s) passed`);
  process.exit(0);
}

console.error(`Unknown command: ${cmd}`);
usage();
process.exit(1);
