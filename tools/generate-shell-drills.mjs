#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function text(strings, ...values) {
  const raw = strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");
  const lines = raw.replace(/^\n/, "").replace(/\s+$/g, "").split("\n");
  const indents = lines.filter((line) => line.trim()).map((line) => line.match(/^\s*/)[0].length);
  const indent = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(indent)).join("\n") + "\n";
}

async function write(rel, body) {
  const full = path.join(root, rel);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, body);
}

async function writeJSON(rel, data) {
  await write(rel, `${JSON.stringify(data, null, 2)}\n`);
}

function theoryFor(ex) {
  return text`
    This drill practices ${ex.focus}. These tools reward precision: a one-character difference can decide whether a command is safe for a production tree, robust with odd filenames, or useful in a pipeline. The exercise is intentionally small, but the behavior mirrors the kind of command you would keep in a runbook, migration script, CI check, or incident-response notebook.

    Read the fixture files and expected output before editing the starter. Prefer commands that handle whitespace, ordering, quoting, and failure modes deliberately. When the task involves filenames, assume spaces can appear. When the task involves JSON or SQL, let the structured tool do the parsing instead of reaching for brittle text matching. When output ordering could vary, make it deterministic with sorting or explicit SQL ordering.

    The reference solution is not the only valid command. Your version should be clear, repeatable, and safe to run from the exercise directory.
  `;
}

function hintsFor(ex) {
  return text`
    # Hints

    1. Run the command manually from \`starter/\` and compare it with the expected behavior in \`TASK.md\`.
    2. Use the tool named in the tags as the main mechanism; avoid replacing a structured tool with ad hoc parsing.
    3. If output differs only by order, add an explicit \`sort\` or \`ORDER BY\` where appropriate.
  `;
}

function taskFor(ex) {
  return text`
    # ${ex.title}

    ## Learning Objectives
    ${ex.objectives.map((o) => `- ${o}`).join("\n")}

    ## Task
    ${ex.task}

    Edit \`starter/task.sh\` or \`starter/query.sql\` as directed. The fixtures are local to each exercise. The \`solution/\` directory is only for reference verification.

    ## Expected Commands
    - From this exercise: \`${ex.checkCommand}\`
    - From the repository root: \`node tools/drill-runner.mjs check ${ex.id}\`
    - Reference check: \`node tools/drill-runner.mjs check ${ex.id} --solution\`

    ## Expected Output
    \`\`\`text
    ${ex.expected.trimEnd()}
    \`\`\`

    ## Difficulty
    ${ex.difficulty}

    ## Estimated Time
    ${ex.minutes} minutes

    ## Tags
    ${ex.tags.map((tag) => `- ${tag}`).join("\n")}
  `.replace(/^ {4}/gm, "");
}

function metadata(ex) {
  return {
    id: ex.id,
    title: ex.title,
    language: "shell",
    track: "shell-tools",
    topic: ex.topic,
    difficulty: ex.difficulty,
    estimated_minutes: ex.minutes,
    tags: ex.tags,
    theory_file: "THEORY.md",
    task_file: "TASK.md",
    starter_path: "starter",
    solution_path: "solution",
    check_command: "node ../tests/check.mjs .",
    solution_check_command: "node ../tests/check.mjs .",
    prerequisites: [],
  };
}

function shellExercise(def) {
  return {
    checkCommand: "node ../tests/check.mjs .",
    difficulty: "intermediate",
    minutes: 25,
    staticIncludes: [],
    files: {},
    ...def,
  };
}

const sqliteTask = text`
  #!/usr/bin/env bash
  set -euo pipefail

  sqlite3 -batch -noheader -separator '|' :memory: <<'SQL'
  .read schema.sql
  .read seed.sql
  .read query.sql
  SQL
`;

const exercises = [
  shellExercise({
    id: "shell-tools/rg/001-todo-audit",
    title: "ripgrep TODO Audit",
    topic: "rg",
    focus: "ripgrep search patterns, line-number output, and glob exclusions",
    task: "Edit `task.sh` so it prints every TODO or FIXME under `data/src`, with line numbers, while excluding any vendor directory.",
    objectives: ["Use ripgrep with alternation", "Exclude directories with globs", "Produce file and line-number output"],
    tags: ["rg", "ripgrep", "search", "globs"],
    expected: "data/src/app.go:1:// TODO: handle timeout\ndata/src/component.tsx:1:// FIXME: memoize selector\n",
    staticIncludes: ["rg", "--line-number", "--glob"],
    files: {
      "data/src/app.go": "// TODO: handle timeout\npackage main\n",
      "data/src/component.tsx": "// FIXME: memoize selector\nexport const Component = () => null;\n",
      "data/src/vendor/lib.go": "// TODO: generated vendor issue\npackage vendor\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: use rg to find TODO/FIXME and exclude vendor.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      rg --line-number --glob '!**/vendor/**' 'TODO|FIXME' data/src | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/rg/002-react-hook-files",
    title: "Find React Hook Files",
    topic: "rg",
    focus: "ripgrep file listing for focused code navigation",
    task: "Edit `task.sh` so it lists `.tsx` source files using `useEffect` or `useMemo`, excluding test files, sorted alphabetically.",
    objectives: ["Use `rg -l` to list matching files", "Limit searches by glob", "Exclude test files from navigation output"],
    tags: ["rg", "ripgrep", "react", "globs"],
    expected: "data/app/Dashboard.tsx\ndata/app/Profile.tsx\n",
    staticIncludes: ["rg", "-l", "--glob"],
    files: {
      "data/app/Dashboard.tsx": "import { useMemo } from 'react';\nexport const value = useMemo(() => 1, []);\n",
      "data/app/Profile.tsx": "import { useEffect } from 'react';\nuseEffect(() => {}, []);\n",
      "data/app/Profile.test.tsx": "useEffect(() => {});\n",
      "data/app/plain.ts": "useEffect(() => {});\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: list hook-using TSX files, excluding tests.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      rg -l --glob '*.tsx' --glob '!*test.tsx' 'use(Effect|Memo)\\(' data/app | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/rg/003-pcre2-route-params",
    title: "Extract Route Params with PCRE2",
    topic: "rg",
    focus: "ripgrep PCRE2 captures and replacement output",
    task: "Edit `task.sh` so it extracts route parameter names from `data/routes.ts`, one per line, without the leading colon.",
    objectives: ["Use ripgrep PCRE2 mode", "Capture only the useful part of a match", "Use replacement output for extraction"],
    tags: ["rg", "ripgrep", "pcre2", "captures"],
    expected: "userId\npostId\norgId\n",
    staticIncludes: ["rg", "--pcre2", "-o", "-r"],
    files: {
      "data/routes.ts": "router.get('/users/:userId/posts/:postId', handler)\nrouter.get('/orgs/:orgId', handler)\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: extract route params with rg --pcre2.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      rg --pcre2 -o -r '$1' ':([A-Za-z_][A-Za-z0-9_]*)' data/routes.ts
    `,
  }),
  shellExercise({
    id: "shell-tools/rg/004-json-search-count",
    title: "Count Matches from ripgrep JSON",
    topic: "rg",
    focus: "ripgrep JSON output for machine-readable search pipelines",
    task: "Edit `task.sh` so it uses `rg --json` to count log lines containing `\"level\":\"error\"` across `data/logs`.",
    objectives: ["Produce machine-readable ripgrep output", "Filter match records", "Return deterministic counts"],
    tags: ["rg", "ripgrep", "json", "pipelines"],
    expected: "3\n",
    staticIncludes: ["rg", "--json", "jq"],
    files: {
      "data/logs/a.log": "{\"level\":\"info\",\"message\":\"boot\"}\n{\"level\":\"error\",\"message\":\"failed\"}\n",
      "data/logs/b.log": "{\"level\":\"error\",\"message\":\"timeout\"}\n{\"level\":\"error\",\"message\":\"retry\"}\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: count error matches using rg --json.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      rg --json '"level":"error"' data/logs | jq -r 'select(.type == "match") | 1' | wc -l | tr -d ' '
    `,
  }),
  shellExercise({
    id: "shell-tools/sed/001-normalize-env",
    title: "Normalize an env File",
    topic: "sed",
    focus: "sed deletion, trimming, and substitution for simple config cleanup",
    task: "Edit `task.sh` so it removes comments and blank lines from `data/app.env`, trims leading whitespace, and normalizes spaces around `=`.",
    objectives: ["Delete comment and blank lines", "Use extended regular expressions", "Normalize key-value formatting"],
    tags: ["sed", "text-processing", "config"],
    expected: "PORT=8080\nENV=prod\nDEBUG=true\n",
    staticIncludes: ["sed", "-E"],
    files: {
      "data/app.env": "# local config\n PORT = 8080\n\nENV= prod\n   # ignored\nDEBUG = true\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: normalize data/app.env with sed.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      sed -E -e '/^[[:space:]]*(#|$)/d' -e 's/^[[:space:]]+//' -e 's/[[:space:]]*=[[:space:]]*/=/' data/app.env
    `,
  }),
  shellExercise({
    id: "shell-tools/sed/002-redact-secrets",
    title: "Redact Secrets in Logs",
    topic: "sed",
    focus: "sed capture groups for safe log redaction",
    task: "Edit `task.sh` so it replaces password, token, and api_key values with `REDACTED`, preserving key names.",
    objectives: ["Use capture groups in substitutions", "Redact several key names", "Preserve non-secret log fields"],
    tags: ["sed", "redaction", "logs"],
    expected: "user=ada password=REDACTED action=login\ntoken=REDACTED status=ok\napi_key=REDACTED region=us\n",
    staticIncludes: ["sed", "-E"],
    files: {
      "data/log.txt": "user=ada password=hunter2 action=login\ntoken=abc123 status=ok\napi_key=secret-value region=us\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: redact secret values with sed.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      sed -E 's/(password|token|api_key)=[^ ]+/\\1=REDACTED/g' data/log.txt
    `,
  }),
  shellExercise({
    id: "shell-tools/sed/003-range-extract",
    title: "Extract Lines Between Markers",
    topic: "sed",
    focus: "sed address ranges and marker-line deletion",
    task: "Edit `task.sh` so it prints only the migration lines between `BEGIN MIGRATION` and `END MIGRATION`, excluding the markers.",
    objectives: ["Use sed address ranges", "Suppress default printing", "Delete boundary marker lines"],
    tags: ["sed", "ranges", "logs"],
    expected: "create users\ncreate orders\n",
    staticIncludes: ["sed", "-n"],
    files: {
      "data/deploy.log": "boot\nBEGIN MIGRATION\ncreate users\ncreate orders\nEND MIGRATION\nready\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: extract range with sed.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      sed -n '/BEGIN MIGRATION/,/END MIGRATION/{/BEGIN MIGRATION/d;/END MIGRATION/d;p;}' data/deploy.log
    `,
  }),
  shellExercise({
    id: "shell-tools/sed/004-import-rewrite",
    title: "Rewrite Import Specifiers",
    topic: "sed",
    focus: "sed substitutions for mechanical source rewrites",
    task: "Edit `task.sh` so it rewrites import specifiers from `@old/ui` to `@acme/ui` in `data/component.tsx`.",
    objectives: ["Perform a mechanical source rewrite", "Preserve subpaths", "Avoid touching unrelated strings"],
    tags: ["sed", "codemods", "imports"],
    expected: "import { Button } from \"@acme/ui/button\";\nimport { Card } from \"@acme/ui/card\";\nconst label = \"@old/ui should stay in runtime text\";\n",
    staticIncludes: ["sed", "-E"],
    files: {
      "data/component.tsx": "import { Button } from \"@old/ui/button\";\nimport { Card } from \"@old/ui/card\";\nconst label = \"@old/ui should stay in runtime text\";\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: rewrite import specifiers with sed.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      sed -E '/^import /s#from "@old/ui([^"]*)"#from "@acme/ui\\1"#' data/component.tsx
    `,
  }),
  shellExercise({
    id: "shell-tools/awk/001-service-costs",
    title: "Aggregate Service Costs",
    topic: "awk",
    focus: "awk grouping and numeric aggregation over CSV-like input",
    task: "Edit `task.sh` so it sums cost by service from `data/costs.csv`, skipping the header, and prints sorted `service total` lines.",
    objectives: ["Use awk field separators", "Group rows by key", "Sort aggregate output"],
    tags: ["awk", "aggregation", "csv"],
    expected: "api 17\nweb 8\nworker 3\n",
    staticIncludes: ["awk", "-F,"],
    files: {
      "data/costs.csv": "service,cost\napi,10\nweb,5\napi,7\nworker,3\nweb,3\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: aggregate service costs with awk.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk -F, 'NR > 1 { sum[$1] += $2 } END { for (service in sum) print service, sum[service] }' data/costs.csv | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/awk/002-status-classes",
    title: "Count HTTP Status Classes",
    topic: "awk",
    focus: "awk numeric expressions and status-class bucketing",
    task: "Edit `task.sh` so it counts requests by status class from `data/access.log` and prints sorted `2xx 3` style lines.",
    objectives: ["Compute derived fields", "Count grouped rows", "Keep output stable with sorting"],
    tags: ["awk", "logs", "aggregation"],
    expected: "2xx 2\n3xx 1\n4xx 2\n5xx 1\n",
    staticIncludes: ["awk"],
    files: {
      "data/access.log": "GET / 200 12\nGET /login 302 5\nPOST /login 401 9\nGET /missing 404 3\nGET /api 200 20\nPOST /api 500 30\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: bucket status codes with awk.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '{ bucket = int($3 / 100) "xx"; count[bucket]++ } END { for (bucket in count) print bucket, count[bucket] }' data/access.log | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/awk/003-average-latency",
    title: "Average Latency by Endpoint",
    topic: "awk",
    focus: "awk associative arrays for averages and formatted numeric output",
    task: "Edit `task.sh` so it calculates average latency by endpoint from `data/latency.csv`, printing one decimal place.",
    objectives: ["Track sums and counts", "Format numeric output", "Sort endpoint averages"],
    tags: ["awk", "metrics", "csv"],
    expected: "/api 15.0\n/home 7.0\n",
    staticIncludes: ["awk", "printf"],
    files: {
      "data/latency.csv": "endpoint,ms\n/api,10\n/home,5\n/api,20\n/home,9\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: calculate average latency with awk.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk -F, 'NR > 1 { sum[$1] += $2; count[$1]++ } END { for (endpoint in sum) printf "%s %.1f\\n", endpoint, sum[endpoint] / count[endpoint] }' data/latency.csv | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/awk/004-latest-by-key",
    title: "Latest Record by Key",
    topic: "awk",
    focus: "awk state tables for selecting records by version",
    task: "Edit `task.sh` so it keeps only the highest-version row for each ID from `data/records.txt`, sorted by ID.",
    objectives: ["Store best records in associative arrays", "Compare numeric versions", "Print selected original records"],
    tags: ["awk", "dedupe", "records"],
    expected: "a 3 ready\nb 2 done\nc 1 new\n",
    staticIncludes: ["awk"],
    files: {
      "data/records.txt": "a 1 draft\nb 2 done\na 3 ready\nc 1 new\nb 1 queued\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: keep latest version per ID with awk.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      awk '{ if (!($1 in version) || $2 > version[$1]) { version[$1] = $2; row[$1] = $0 } } END { for (id in row) print row[id] }' data/records.txt | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/jq/001-enabled-services",
    title: "Select Enabled Services",
    topic: "jq",
    focus: "jq selection and raw output for JSON service inventories",
    task: "Edit `task.sh` so it prints enabled service names from `data/services.json`, sorted alphabetically.",
    objectives: ["Select JSON array entries", "Emit raw strings", "Sort pipeline output"],
    tags: ["jq", "json", "filtering"],
    expected: "api\nworker\n",
    staticIncludes: ["jq", "-r", "select"],
    files: {
      "data/services.json": "{\"services\":[{\"name\":\"api\",\"enabled\":true},{\"name\":\"web\",\"enabled\":false},{\"name\":\"worker\",\"enabled\":true}]}\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: select enabled service names with jq.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      jq -r '.services[] | select(.enabled) | .name' data/services.json | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/jq/002-package-deps",
    title: "List Package Dependencies",
    topic: "jq",
    focus: "jq object traversal and entries for package metadata",
    task: "Edit `task.sh` so it prints dependency and devDependency entries as `name@version`, sorted alphabetically.",
    objectives: ["Convert objects to entries", "Handle multiple dependency maps", "Produce package audit-friendly output"],
    tags: ["jq", "json", "package-json"],
    expected: "@types/node@^24.0.0\nreact@^18.2.0\nvite@^5.0.0\n",
    staticIncludes: ["jq", "to_entries"],
    files: {
      "data/package.json": "{\"dependencies\":{\"react\":\"^18.2.0\"},\"devDependencies\":{\"vite\":\"^5.0.0\",\"@types/node\":\"^24.0.0\"}}\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: list dependencies with jq.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      jq -r '(.dependencies // {}) + (.devDependencies // {}) | to_entries[] | "\\(.key)@\\(.value)"' data/package.json | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/jq/003-group-duration",
    title: "Group Event Durations",
    topic: "jq",
    focus: "jq sorting, grouping, and numeric reduction",
    task: "Edit `task.sh` so it groups events by status and prints `status totalDuration` lines sorted by status.",
    objectives: ["Use sort_by and group_by", "Reduce grouped numeric fields", "Emit compact text reports"],
    tags: ["jq", "json", "aggregation"],
    expected: "error 18\nok 17\n",
    staticIncludes: ["jq", "group_by", "map"],
    files: {
      "data/events.json": "[{\"status\":\"ok\",\"duration\":10},{\"status\":\"error\",\"duration\":12},{\"status\":\"ok\",\"duration\":7},{\"status\":\"error\",\"duration\":6}]\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: group durations with jq.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      jq -r 'sort_by(.status) | group_by(.status)[] | "\\(.[0].status) \\(map(.duration) | add)"' data/events.json
    `,
  }),
  shellExercise({
    id: "shell-tools/jq/004-schema-gate",
    title: "JSON Shape Gate",
    topic: "jq",
    focus: "jq -e validation checks for CI-friendly JSON contracts",
    task: "Edit `task.sh` so it validates every user has a string `id` and array `roles`; print `ok` only when validation succeeds.",
    objectives: ["Use jq as a validation gate", "Inspect JSON value types", "Make failures visible through exit status"],
    tags: ["jq", "json", "validation", "ci"],
    expected: "ok\n",
    staticIncludes: ["jq", "-e", "all"],
    files: {
      "data/users.json": "{\"users\":[{\"id\":\"u1\",\"roles\":[\"admin\"]},{\"id\":\"u2\",\"roles\":[]}]}\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: validate JSON shape with jq -e.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      jq -e 'all(.users[]; (.id | type == "string") and (.roles | type == "array"))' data/users.json >/dev/null
      echo ok
    `,
  }),
  shellExercise({
    id: "shell-tools/xargs/001-null-safe-todos",
    title: "Null-Safe TODO Search",
    topic: "xargs",
    focus: "xargs -0 pipelines that survive spaces in filenames",
    task: "Edit `task.sh` so it finds files under `data/src` containing TODO, including filenames with spaces, using a null-delimited xargs pipeline.",
    objectives: ["Use `find -print0` with `xargs -0`", "Handle spaces in filenames", "Sort search results"],
    tags: ["xargs", "null-delimited", "filenames", "rg"],
    expected: "data/src/needs review.txt\ndata/src/plain.txt\n",
    staticIncludes: ["xargs", "-0", "rg"],
    files: {
      "data/src/plain.txt": "TODO: plain file\n",
      "data/src/needs review.txt": "TODO: spaced filename\n",
      "data/src/done.txt": "nothing\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: use find -print0 and xargs -0 with rg.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      find data/src -type f -print0 | xargs -0 rg -l 'TODO' | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/xargs/002-batch-arguments",
    title: "Batch Arguments with xargs",
    topic: "xargs",
    focus: "xargs batching with fixed argument counts",
    task: "Edit `task.sh` so it reads service names from `data/services.txt` and invokes `bin/render-batch.sh` with batches of two names.",
    objectives: ["Use `xargs -n` for batching", "Keep command invocations predictable", "Understand argv grouping"],
    tags: ["xargs", "batching", "argv"],
    expected: "batch: api web\nbatch: worker cache\nbatch: jobs\n",
    staticIncludes: ["xargs", "-n", "2"],
    files: {
      "data/services.txt": "api\nweb\nworker\ncache\njobs\n",
      "bin/render-batch.sh": "#!/usr/bin/env bash\nprintf 'batch:'\nfor arg in \"$@\"; do printf ' %s' \"$arg\"; done\nprintf '\\n'\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: batch service names into pairs with xargs.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      xargs -n 2 bash bin/render-batch.sh < data/services.txt
    `,
  }),
  shellExercise({
    id: "shell-tools/xargs/003-placeholder-urls",
    title: "Placeholder URL Builder",
    topic: "xargs",
    focus: "xargs placeholders for templated command construction",
    task: "Edit `task.sh` so it turns each user ID in `data/user-ids.txt` into an API URL using an xargs placeholder.",
    objectives: ["Use `xargs -I` placeholders", "Build templated commands", "Keep one output line per input"],
    tags: ["xargs", "placeholders", "pipelines"],
    expected: "https://api.example.test/users/u1\nhttps://api.example.test/users/u2\nhttps://api.example.test/users/u3\n",
    staticIncludes: ["xargs", "-I"],
    files: {
      "data/user-ids.txt": "u1\nu2\nu3\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: build URLs with xargs -I.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      xargs -I{} printf 'https://api.example.test/users/%s\\n' {} < data/user-ids.txt
    `,
  }),
  shellExercise({
    id: "shell-tools/xargs/004-parallel-workers",
    title: "Parallel xargs Workers",
    topic: "xargs",
    focus: "xargs parallelism with deterministic final output",
    task: "Edit `task.sh` so it processes services with two parallel workers through `bin/render-service.sh`, then sorts the output.",
    objectives: ["Use `xargs -P` for parallel execution", "Pass one item per worker invocation", "Sort output after parallel work"],
    tags: ["xargs", "parallelism", "pipelines"],
    expected: "API\nCACHE\nWEB\nWORKER\n",
    staticIncludes: ["xargs", "-P", "2"],
    files: {
      "data/services.txt": "api\nweb\nworker\ncache\n",
      "bin/render-service.sh": "#!/usr/bin/env bash\nprintf '%s\\n' \"$1\" | tr '[:lower:]' '[:upper:]'\n",
    },
    starter: text`
      #!/usr/bin/env bash
      set -euo pipefail
      # TODO: process in parallel with xargs and sort the output.
      :
    `,
    solution: text`
      #!/usr/bin/env bash
      set -euo pipefail
      xargs -P 2 -n 1 bash bin/render-service.sh < data/services.txt | sort
    `,
  }),
  shellExercise({
    id: "shell-tools/sqlite3/001-active-users",
    title: "sqlite3 Active Users Query",
    topic: "sqlite3",
    focus: "sqlite3 CLI execution and basic SELECT filtering",
    task: "Edit `query.sql` so it returns active users as `id|email`, sorted by email.",
    objectives: ["Write a filtered SELECT", "Use deterministic ORDER BY", "Run SQL through sqlite3 CLI"],
    tags: ["sqlite3", "sql", "select"],
    expected: "1|ada@example.com\n3|grace@example.com\n",
    staticIncludes: ["SELECT", "ORDER BY"],
    files: {
      "schema.sql": "CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL, active INTEGER NOT NULL);\n",
      "seed.sql": "INSERT INTO users VALUES (1, 'ada@example.com', 1), (2, 'alan@example.com', 0), (3, 'grace@example.com', 1);\n",
      "task.sh": sqliteTask,
    },
    starter: "-- TODO: return active users as id|email\nSELECT 'TODO';\n",
    solution: "SELECT id, email FROM users WHERE active = 1 ORDER BY email;\n",
  }),
  shellExercise({
    id: "shell-tools/sqlite3/002-join-order-totals",
    title: "sqlite3 Join Order Totals",
    topic: "sqlite3",
    focus: "joins and aggregation in sqlite3 command-line workflows",
    task: "Edit `query.sql` so it returns each customer email and total order cents, sorted by total descending.",
    objectives: ["Join related tables", "Aggregate with SUM", "Group and order result sets"],
    tags: ["sqlite3", "sql", "joins", "aggregation"],
    expected: "ada@example.com|3500\ngrace@example.com|800\n",
    staticIncludes: ["JOIN", "GROUP BY", "ORDER BY"],
    files: {
      "schema.sql": "CREATE TABLE customers (id INTEGER PRIMARY KEY, email TEXT NOT NULL);\nCREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL, cents INTEGER NOT NULL);\n",
      "seed.sql": "INSERT INTO customers VALUES (1, 'ada@example.com'), (2, 'grace@example.com');\nINSERT INTO orders VALUES (1, 1, 1200), (2, 1, 2300), (3, 2, 800);\n",
      "task.sh": sqliteTask,
    },
    starter: "-- TODO: join customers to orders and sum cents\nSELECT 'TODO';\n",
    solution: "SELECT customers.email, SUM(orders.cents) AS total_cents FROM customers JOIN orders ON orders.customer_id = customers.id GROUP BY customers.id, customers.email ORDER BY total_cents DESC;\n",
  }),
  shellExercise({
    id: "shell-tools/sqlite3/003-window-ranking",
    title: "sqlite3 Window Ranking",
    topic: "sqlite3",
    focus: "window functions for ranked reports in sqlite3",
    task: "Edit `query.sql` so it ranks products by revenue descending and returns `rank|name|revenue`.",
    objectives: ["Use window functions", "Compute revenue expressions", "Order ranked reports deterministically"],
    tags: ["sqlite3", "sql", "window-functions"],
    expected: "1|pro|5000\n2|team|3600\n3|solo|1200\n",
    staticIncludes: ["RANK()", "OVER", "ORDER BY"],
    files: {
      "schema.sql": "CREATE TABLE sales (product TEXT NOT NULL, qty INTEGER NOT NULL, unit_cents INTEGER NOT NULL);\n",
      "seed.sql": "INSERT INTO sales VALUES ('solo', 2, 600), ('pro', 5, 1000), ('team', 3, 1200);\n",
      "task.sh": sqliteTask,
    },
    starter: "-- TODO: rank products by revenue\nSELECT 'TODO';\n",
    solution: "SELECT RANK() OVER (ORDER BY qty * unit_cents DESC) AS rank, product, qty * unit_cents AS revenue FROM sales ORDER BY rank, product;\n",
  }),
  shellExercise({
    id: "shell-tools/sqlite3/004-json-extract",
    title: "sqlite3 JSON Extract",
    topic: "sqlite3",
    focus: "sqlite3 JSON extraction for event payload queries",
    task: "Edit `query.sql` so it extracts event type and account ID from JSON payloads for account events, sorted by event ID.",
    objectives: ["Use sqlite JSON functions", "Filter by extracted JSON fields", "Return pipe-separated CLI output"],
    tags: ["sqlite3", "sql", "json"],
    expected: "created|acct_1\nupdated|acct_2\n",
    staticIncludes: ["json_extract", "ORDER BY"],
    files: {
      "schema.sql": "CREATE TABLE events (id INTEGER PRIMARY KEY, payload TEXT NOT NULL);\n",
      "seed.sql": "INSERT INTO events VALUES (1, '{\"type\":\"created\",\"account_id\":\"acct_1\"}'), (2, '{\"type\":\"ignored\"}'), (3, '{\"type\":\"updated\",\"account_id\":\"acct_2\"}');\n",
      "task.sh": sqliteTask,
    },
    starter: "-- TODO: extract type and account_id from account events\nSELECT 'TODO';\n",
    solution: "SELECT json_extract(payload, '$.type'), json_extract(payload, '$.account_id') FROM events WHERE json_extract(payload, '$.account_id') IS NOT NULL ORDER BY id;\n",
  }),
];

function checkerSource(ex) {
  return text`
    #!/usr/bin/env node
    import { spawnSync } from "node:child_process";
    import { existsSync, readFileSync } from "node:fs";
    import path from "node:path";

    const target = path.resolve(process.argv[2] ?? ".");
    const expected = ${JSON.stringify(ex.expected)};
    const staticIncludes = ${JSON.stringify(ex.staticIncludes)};
    const checkFile = ${JSON.stringify(ex.topic === "sqlite3" ? "query.sql" : "task.sh")};
    const body = readFileSync(path.join(target, checkFile), "utf8");
    const failures = [];

    if (/(^|\\n)\\s*# TODO|SELECT 'TODO'/.test(body)) failures.push(checkFile + " still contains starter TODO markers");
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
      failures.push("task exited with " + result.status + "\\n" + result.stderr);
    }
    const stdout = result.stdout.replace(/\\r\\n/g, "\\n");
    if (stdout !== expected) {
      failures.push("stdout mismatch\\nGOT:\\n" + stdout + "\\nWANT:\\n" + expected);
    }

    if (failures.length) {
      console.error(failures.map(f => "- " + f).join("\\n"));
      process.exit(1);
    }
    console.log("shell tool checks passed");
  `.trimStart();
}

async function writeExercise(ex) {
  await writeJSON(`${ex.id}/exercise.json`, metadata(ex));
  await write(`${ex.id}/THEORY.md`, theoryFor(ex));
  await write(`${ex.id}/TASK.md`, taskFor(ex));
  await write(`${ex.id}/HINTS.md`, hintsFor(ex));
  await write(`${ex.id}/tests/check.mjs`, checkerSource(ex));

  for (const side of ["starter", "solution"]) {
    for (const [rel, body] of Object.entries(ex.files)) {
      await write(`${ex.id}/${side}/${rel}`, body);
    }
    if (ex.topic === "sqlite3") {
      await write(`${ex.id}/${side}/query.sql`, side === "starter" ? ex.starter : ex.solution);
    } else {
      await write(`${ex.id}/${side}/task.sh`, side === "starter" ? ex.starter : ex.solution);
    }
  }
}

for (const ex of exercises) await writeExercise(ex);
console.log(`generated ${exercises.length} shell tool drills`);
