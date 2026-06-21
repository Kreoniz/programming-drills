# Hints

1. Identify the field boundaries in the fixture before writing the pipeline.
2. Prefer jq for JSON fixtures, awk for column-oriented output, and sed for focused extraction or redaction.
3. If the command output might vary by discovery order, sort the final report before comparing it.
