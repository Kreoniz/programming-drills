# How To Add New Exercises

Create a directory under the relevant track, for example `go/http/004-router-methods` or `ts-react/performance/006-profiler-regression`. Add `exercise.json`, `THEORY.md`, `TASK.md`, `HINTS.md`, `starter/`, and `solution/`.

Metadata must include id, title, language, track, topic, difficulty, estimated_minutes, tags, theory_file, task_file, starter_path, solution_path, check_command, solution_check_command, and prerequisites. Theory must be 100-250 words. The starter should compile when practical but fail tests or checks. The solution must pass.

Prefer one or two learning objectives per drill. Add tests that describe behavior clearly instead of checking implementation details, except for tooling/config drills where the implementation is the behavior. Run `pnpm drill:verify:starters` before considering the exercise complete.
