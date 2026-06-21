#!/usr/bin/env node
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const trackRoots = ["go", "ts-react", "shell-tools", "networking-tools"];
const checkStarters = process.argv.includes("--check-starters");
const goCache = path.join(root, ".cache", "go-build");
const goTmp = path.join(root, ".cache", "go-tmp");
mkdirSync(goCache, { recursive: true });
mkdirSync(goTmp, { recursive: true });
const required = [
  "id", "title", "language", "track", "topic", "difficulty", "estimated_minutes", "tags",
  "theory_file", "task_file", "starter_path", "solution_path", "check_command",
  "solution_check_command", "prerequisites",
];

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

function run(command, cwd) {
  return new Promise((resolve) => {
    const child = spawn(command, {
      cwd,
      shell: true,
      stdio: "pipe",
      env: { ...process.env, GOCACHE: goCache, GOTMPDIR: goTmp, CGO_ENABLED: "0" },
    });
    let output = "";
    child.stdout.on("data", d => { output += d; });
    child.stderr.on("data", d => { output += d; });
    child.on("close", code => resolve({ code: code ?? 1, output }));
  });
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const report = { checked_at: new Date().toISOString(), totals: {}, failures: [] };
const nestedFiles = await Promise.all(trackRoots.map(track => walk(path.join(root, track))));
const files = nestedFiles.flat();
const exercises = [];

for (const file of files) {
  const dir = path.dirname(file);
  let meta;
  try {
    meta = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    report.failures.push({ id: file, phase: "metadata", error: String(error) });
    continue;
  }
  exercises.push({ dir, meta });
  for (const key of required) {
    if (!(key in meta)) report.failures.push({ id: meta.id ?? file, phase: "metadata", error: `missing ${key}` });
  }
  for (const rel of [meta.theory_file, meta.task_file, "HINTS.md", meta.starter_path, meta.solution_path]) {
    if (rel && !existsSync(path.join(dir, rel))) {
      report.failures.push({ id: meta.id, phase: "files", error: `missing ${rel}` });
    }
  }
  if (meta.theory_file && existsSync(path.join(dir, meta.theory_file))) {
    const count = wordCount(await readFile(path.join(dir, meta.theory_file), "utf8"));
      if (count < 100 || count > 250) {
        report.failures.push({ id: meta.id, phase: "theory", error: `theory word count ${count}, expected 100..250` });
      }
    }
  if (meta.task_file && existsSync(path.join(dir, meta.task_file))) {
    const task = await readFile(path.join(dir, meta.task_file), "utf8");
    const badTaskLine = task.split("\n").findIndex(line => /^ {4}(#{1,6} |- |```)/.test(line));
    if (badTaskLine !== -1) {
      report.failures.push({ id: meta.id, phase: "task-format", error: `indented markdown control line at ${meta.task_file}:${badTaskLine + 1}` });
    }
  }
  if (!meta.check_command || !meta.solution_check_command) {
    report.failures.push({ id: meta.id, phase: "commands", error: "missing check command" });
  }
  const hasGoTest = meta.language === "go" && existsSync(path.join(dir, meta.solution_path ?? "", "exercise_test.go"));
  const hasStaticChecker = existsSync(path.join(dir, "tests", "check.mjs"));
  const hasTypeCheck = String(meta.solution_check_command).includes("tsc");
  if (!hasGoTest && !hasStaticChecker && !hasTypeCheck) {
    report.failures.push({ id: meta.id, phase: "checker", error: "no automated checker detected" });
  }
}

for (const { dir, meta } of exercises) {
  const cwd = path.join(dir, meta.solution_path);
  const result = await run(meta.solution_check_command, cwd);
  if (result.code !== 0) {
    report.failures.push({ id: meta.id, phase: "solution-check", error: result.output.slice(-4000) });
  }
  if (checkStarters) {
    const starter = await run(meta.check_command, path.join(dir, meta.starter_path));
    if (starter.code === 0) {
      report.failures.push({ id: meta.id, phase: "starter-check", error: "starter unexpectedly passed" });
    }
  }
}

report.totals.exercises = exercises.length;
report.totals.go = exercises.filter(e => e.meta.language === "go").length;
report.totals.tsReact = exercises.filter(e => e.meta.language === "ts-react").length;
report.totals.shellTools = exercises.filter(e => e.meta.language === "shell").length;
report.totals.networkingTools = exercises.filter(e => e.meta.language === "networking").length;
report.totals.failures = report.failures.length;
writeFileSync(path.join(root, "tools", "verify-report.json"), JSON.stringify(report, null, 2) + "\n");

if (report.failures.length) {
  console.error(`Verification failed with ${report.failures.length} issue(s). See tools/verify-report.json.`);
  for (const failure of report.failures.slice(0, 20)) {
    console.error(`- ${failure.id} [${failure.phase}]: ${String(failure.error).split("\n")[0]}`);
  }
  process.exit(1);
}

console.log(`Verified ${report.totals.exercises} drills: ${report.totals.go} Go, ${report.totals.tsReact} TS/React, ${report.totals.shellTools} shell-tools, ${report.totals.networkingTools} networking-tools.`);
if (checkStarters) console.log("Starter checks were run and failed as expected.");
