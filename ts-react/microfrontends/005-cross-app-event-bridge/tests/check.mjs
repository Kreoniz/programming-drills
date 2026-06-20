#!/usr/bin/env node
    import { existsSync, readFileSync } from "node:fs";
    import path from "node:path";

    const target = path.resolve(process.argv[2] ?? ".");
    const checks = [
  {
    "file": "src/eventBridge.ts",
    "includes": "new CustomEvent"
  },
  {
    "file": "src/eventBridge.ts",
    "includes": "window.dispatchEvent"
  },
  {
    "file": "src/eventBridge.ts",
    "includes": "window.addEventListener"
  },
  {
    "file": "src/eventBridge.ts",
    "includes": "window.removeEventListener"
  }
];
    const failures = [];

    function read(rel) {
      const full = path.join(target, rel);
      if (!existsSync(full)) {
        failures.push("missing file: " + rel);
        return "";
      }
      return readFileSync(full, "utf8");
    }

    const cache = new Map();
    for (const check of checks) {
      if (!cache.has(check.file)) cache.set(check.file, read(check.file));
      const body = cache.get(check.file);
      if (/TODO|expect\(true\)\.toBe\(true\)/.test(body)) {
        failures.push(check.file + " still contains starter markers");
      }
      if (check.includes && !body.includes(check.includes)) failures.push(check.file + " must include: " + check.includes);
      if (check.excludes && body.includes(check.excludes)) failures.push(check.file + " must not include: " + check.excludes);
    }

    if (failures.length) {
      console.error(failures.map(f => "- " + f).join("\n"));
      process.exit(1);
    }
    console.log("static checks passed");
