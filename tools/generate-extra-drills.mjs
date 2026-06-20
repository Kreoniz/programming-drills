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
    This drill adds practice around ${ex.focus}. It is intentionally small enough to finish in one sitting, but it mirrors a problem that appears inside larger production codebases. The goal is to make the contract obvious, implement it directly, and let the checks expose missed edge cases.

    Start by reading the tests or checker before changing the starter. Identify the observable behavior first: what input is valid, what output shape is expected, how errors are represented, and which decisions should remain stable for callers. For Go, prefer standard-library tools, explicit errors, small interfaces, and straightforward control flow. For TypeScript and React, prefer precise public types, deterministic render behavior, and configuration that makes package or runtime boundaries visible.

    Your solution does not need to match the reference line for line. It should pass the same checks and remain clear enough that you would be comfortable revisiting it after a month.
  `;
}

function hintsFor() {
  return text`
    # Hints

    1. Read the automated check first and name the missing behavior in one sentence.
    2. Make the smallest implementation that satisfies the first failing assertion, then run the check again.
    3. If the task involves ordering, cancellation, types, or config boundaries, write that rule directly instead of hiding it behind a broad helper.
  `;
}

function taskFor(ex) {
  return text`
    # ${ex.title}

    ## Learning Objectives
    ${ex.objectives.map((o) => `- ${o}`).join("\n")}

    ## Task
    ${ex.task}

    Edit files only under \`starter/\` while practicing. The \`solution/\` directory is a reference implementation used by the verifier.

    ## Expected Commands
    - From this exercise: \`${ex.checkCommand}\`
    - From the repository root: \`node tools/drill-runner.mjs check ${ex.id}\`
    - Reference check: \`node tools/drill-runner.mjs check ${ex.id} --solution\`

    ## Difficulty
    ${ex.difficulty}

    ## Estimated Time
    ${ex.minutes} minutes

    ## Tags
    ${ex.tags.map((t) => `- ${t}`).join("\n")}
  `.replace(/^ {4}/gm, "");
}

function metadata(ex) {
  return {
    id: ex.id,
    title: ex.title,
    language: ex.language,
    track: ex.track,
    topic: ex.topic,
    difficulty: ex.difficulty,
    estimated_minutes: ex.minutes,
    tags: ex.tags,
    theory_file: "THEORY.md",
    task_file: "TASK.md",
    starter_path: "starter",
    solution_path: "solution",
    check_command: ex.checkCommand,
    solution_check_command: ex.solutionCommand,
    prerequisites: ex.prerequisites ?? [],
  };
}

function goExercise(def) {
  return {
    language: "go",
    track: "go",
    checkCommand: "go test ./...",
    solutionCommand: "go test ./...",
    difficulty: "intermediate",
    minutes: 30,
    prerequisites: [],
    ...def,
  };
}

function typeExercise(def) {
  return {
    language: "ts-react",
    track: "ts-react",
    checkCommand: "tsc -p .",
    solutionCommand: "tsc -p .",
    difficulty: "advanced",
    minutes: 35,
    prerequisites: [],
    kind: "type",
    ...def,
  };
}

function staticExercise(def) {
  return {
    language: "ts-react",
    track: "ts-react",
    checkCommand: "node ../tests/check.mjs .",
    solutionCommand: "node ../tests/check.mjs .",
    difficulty: "advanced",
    minutes: 40,
    prerequisites: [],
    kind: "static",
    ...def,
  };
}

const goExercises = [
  goExercise({
    id: "go/foundation/011-runes-initials",
    title: "Rune-Aware Initials",
    topic: "foundation",
    focus: "Unicode-aware string iteration and small formatting helpers",
    task: "Implement `Initials`. Trim and split a name into fields, take the first rune of each field, uppercase it, and join initials without separators.",
    objectives: ["Iterate over runes instead of bytes", "Use strings.Fields for whitespace", "Format Unicode text safely enough for names"],
    tags: ["go", "foundation", "strings", "unicode"],
    starter: text`
      package drill

      func Initials(name string) string {
        // TODO: return uppercase first rune from each word.
        return ""
      }
    `,
    solution: text`
      package drill

      import (
        "strings"
        "unicode"
      )

      func Initials(name string) string {
        var b strings.Builder
        for _, field := range strings.Fields(name) {
          for _, r := range field {
            b.WriteRune(unicode.ToUpper(r))
            break
          }
        }
        return b.String()
      }
    `,
    test: text`
      package drill

      import "testing"

      func TestInitials(t *testing.T) {
        tests := map[string]string{
          "Ada Lovelace": "AL",
          "  grace   hopper ": "GH",
          "søren kierkegaard": "SK",
        }
        for input, want := range tests {
          if got := Initials(input); got != want {
            t.Fatalf("Initials(%q) = %q, want %q", input, got, want)
          }
        }
      }
    `,
  }),
  goExercise({
    id: "go/idioms/009-errors-join-validation",
    title: "Joining Validation Errors",
    topic: "idioms",
    focus: "multi-error validation with errors.Join and sentinel checks",
    task: "Implement `ValidateProfile`. Missing name should include `ErrMissingName`; invalid email should include `ErrInvalidEmail`. Return nil when both fields are valid.",
    objectives: ["Combine multiple validation errors", "Keep errors.Is compatibility", "Validate independent fields in one pass"],
    tags: ["go", "idioms", "errors", "validation"],
    starter: text`
      package drill

      import "errors"

      var ErrMissingName = errors.New("missing name")
      var ErrInvalidEmail = errors.New("invalid email")

      type Profile struct {
        Name  string
        Email string
      }

      func ValidateProfile(profile Profile) error {
        // TODO: join all validation failures.
        return nil
      }
    `,
    solution: text`
      package drill

      import (
        "errors"
        "strings"
      )

      var ErrMissingName = errors.New("missing name")
      var ErrInvalidEmail = errors.New("invalid email")

      type Profile struct {
        Name  string
        Email string
      }

      func ValidateProfile(profile Profile) error {
        var failures []error
        if strings.TrimSpace(profile.Name) == "" {
          failures = append(failures, ErrMissingName)
        }
        if !strings.Contains(profile.Email, "@") {
          failures = append(failures, ErrInvalidEmail)
        }
        return errors.Join(failures...)
      }
    `,
    test: text`
      package drill

      import (
        "errors"
        "testing"
      )

      func TestValidateProfileJoinsErrors(t *testing.T) {
        err := ValidateProfile(Profile{Name: " ", Email: "bad"})
        if !errors.Is(err, ErrMissingName) || !errors.Is(err, ErrInvalidEmail) {
          t.Fatalf("joined error = %v", err)
        }
        if err := ValidateProfile(Profile{Name: "Ada", Email: "ada@example.com"}); err != nil {
          t.Fatalf("valid profile got %v", err)
        }
      }
    `,
  }),
  goExercise({
    id: "go/idioms/010-functional-options-client",
    title: "Functional Options for Client Config",
    topic: "idioms",
    focus: "functional options and safe defaults for maintainable Go APIs",
    task: "Implement `NewClient`, `WithBaseURL`, and `WithRetries`. Defaults are base URL `http://localhost` and 2 retries. Ignore negative retries.",
    objectives: ["Use functional options", "Provide safe defaults", "Reject invalid option values without panics"],
    tags: ["go", "idioms", "functional-options", "api-design"],
    starter: text`
      package drill

      type Client struct {
        BaseURL string
        Retries int
      }

      type Option func(*Client)

      func WithBaseURL(url string) Option {
        // TODO: return an option that updates BaseURL.
        return func(*Client) {}
      }

      func WithRetries(retries int) Option {
        // TODO: return an option that updates Retries when valid.
        return func(*Client) {}
      }

      func NewClient(options ...Option) Client {
        // TODO: apply defaults and options.
        return Client{}
      }
    `,
    solution: text`
      package drill

      type Client struct {
        BaseURL string
        Retries int
      }

      type Option func(*Client)

      func WithBaseURL(url string) Option {
        return func(c *Client) {
          if url != "" {
            c.BaseURL = url
          }
        }
      }

      func WithRetries(retries int) Option {
        return func(c *Client) {
          if retries >= 0 {
            c.Retries = retries
          }
        }
      }

      func NewClient(options ...Option) Client {
        c := Client{BaseURL: "http://localhost", Retries: 2}
        for _, option := range options {
          option(&c)
        }
        return c
      }
    `,
    test: text`
      package drill

      import "testing"

      func TestNewClientFunctionalOptions(t *testing.T) {
        def := NewClient()
        if def.BaseURL != "http://localhost" || def.Retries != 2 {
          t.Fatalf("defaults = %#v", def)
        }
        got := NewClient(WithBaseURL("https://api.example.com"), WithRetries(5))
        if got.BaseURL != "https://api.example.com" || got.Retries != 5 {
          t.Fatalf("configured = %#v", got)
        }
        got = NewClient(WithRetries(-1))
        if got.Retries != 2 {
          t.Fatalf("negative retries should be ignored: %#v", got)
        }
      }
    `,
  }),
  goExercise({
    id: "go/testing/009-tempdir-report-writer",
    title: "TempDir File Writer",
    topic: "testing",
    focus: "file-writing code that is easy to test with t.TempDir",
    task: "Implement `WriteReport`. Create parent directories as needed and write lines joined by newlines with a trailing newline.",
    objectives: ["Write deterministic file output", "Create parent directories", "Keep filesystem tests isolated"],
    tags: ["go", "testing", "file-io", "tempdir"],
    starter: text`
      package drill

      func WriteReport(path string, lines []string) error {
        // TODO: create parent dirs and write newline-terminated content.
        return nil
      }
    `,
    solution: text`
      package drill

      import (
        "os"
        "path/filepath"
        "strings"
      )

      func WriteReport(path string, lines []string) error {
        if err := os.MkdirAll(filepath.Dir(path), 0755); err != nil {
          return err
        }
        body := strings.Join(lines, "\\n")
        if body != "" {
          body += "\\n"
        }
        return os.WriteFile(path, []byte(body), 0644)
      }
    `,
    test: text`
      package drill

      import (
        "os"
        "path/filepath"
        "testing"
      )

      func TestWriteReport(t *testing.T) {
        target := filepath.Join(t.TempDir(), "reports", "daily.txt")
        if err := WriteReport(target, []string{"alpha", "beta"}); err != nil {
          t.Fatal(err)
        }
        got, err := os.ReadFile(target)
        if err != nil {
          t.Fatal(err)
        }
        if string(got) != "alpha\\nbeta\\n" {
          t.Fatalf("body = %q", string(got))
        }
      }
    `,
  }),
  goExercise({
    id: "go/concurrency/009-token-bucket-rate-limiter",
    title: "Token Bucket Rate Limiter",
    topic: "concurrency",
    focus: "mutex-protected state for simple rate limiting",
    task: "Implement a token bucket with `Allow`. The bucket starts full, refills whole tokens based on elapsed time, and never exceeds capacity.",
    objectives: ["Protect mutable limiter state", "Model elapsed-time refill logic", "Keep rate limiting deterministic under injected clocks"],
    tags: ["go", "concurrency", "rate-limiting", "mutex"],
    difficulty: "intermediate+",
    starter: text`
      package drill

      import "time"

      type TokenBucket struct {
        capacity int
        ratePerSecond int
        tokens int
        last time.Time
      }

      func NewTokenBucket(capacity, ratePerSecond int, now time.Time) *TokenBucket {
        // TODO: initialize a full bucket.
        return &TokenBucket{}
      }

      func (b *TokenBucket) Allow(now time.Time) bool {
        // TODO: refill and consume one token if available.
        return false
      }
    `,
    solution: text`
      package drill

      import (
        "sync"
        "time"
      )

      type TokenBucket struct {
        mu sync.Mutex
        capacity int
        ratePerSecond int
        tokens int
        last time.Time
      }

      func NewTokenBucket(capacity, ratePerSecond int, now time.Time) *TokenBucket {
        if capacity < 1 {
          capacity = 1
        }
        if ratePerSecond < 1 {
          ratePerSecond = 1
        }
        return &TokenBucket{capacity: capacity, ratePerSecond: ratePerSecond, tokens: capacity, last: now}
      }

      func (b *TokenBucket) Allow(now time.Time) bool {
        b.mu.Lock()
        defer b.mu.Unlock()
        elapsed := now.Sub(b.last)
        if elapsed > 0 {
          refill := int(elapsed.Seconds()) * b.ratePerSecond
          if refill > 0 {
            b.tokens += refill
            if b.tokens > b.capacity {
              b.tokens = b.capacity
            }
            b.last = now
          }
        }
        if b.tokens == 0 {
          return false
        }
        b.tokens--
        return true
      }
    `,
    test: text`
      package drill

      import (
        "testing"
        "time"
      )

      func TestTokenBucketAllow(t *testing.T) {
        now := time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC)
        bucket := NewTokenBucket(2, 1, now)
        if !bucket.Allow(now) || !bucket.Allow(now) {
          t.Fatal("bucket should start full")
        }
        if bucket.Allow(now) {
          t.Fatal("third immediate request should be denied")
        }
        if !bucket.Allow(now.Add(2 * time.Second)) {
          t.Fatal("bucket should refill after elapsed seconds")
        }
      }
    `,
  }),
  goExercise({
    id: "go/concurrency/010-leak-free-ticker",
    title: "Leak-Free Context Ticker",
    topic: "concurrency",
    focus: "ticker goroutines that stop cleanly on context cancellation",
    task: "Implement `StartTicker`. It should send ticks until the context is canceled, stop the ticker, and close the output channel.",
    objectives: ["Stop tickers to release resources", "Close producer-owned channels", "Use context to avoid goroutine leaks"],
    tags: ["go", "concurrency", "context", "goroutine-leaks"],
    starter: text`
      package drill

      import (
        "context"
        "time"
      )

      func StartTicker(ctx context.Context, interval time.Duration) <-chan time.Time {
        // TODO: tick until ctx cancellation and close output.
        out := make(chan time.Time)
        close(out)
        return out
      }
    `,
    solution: text`
      package drill

      import (
        "context"
        "time"
      )

      func StartTicker(ctx context.Context, interval time.Duration) <-chan time.Time {
        out := make(chan time.Time)
        ticker := time.NewTicker(interval)
        go func() {
          defer close(out)
          defer ticker.Stop()
          for {
            select {
            case <-ctx.Done():
              return
            case t := <-ticker.C:
              select {
              case <-ctx.Done():
                return
              case out <- t:
              }
            }
          }
        }()
        return out
      }
    `,
    test: text`
      package drill

      import (
        "context"
        "testing"
        "time"
      )

      func TestStartTickerClosesOnCancel(t *testing.T) {
        ctx, cancel := context.WithCancel(context.Background())
        ticks := StartTicker(ctx, time.Millisecond)
        select {
        case _, ok := <-ticks:
          if !ok {
            t.Fatal("ticker closed before first tick")
          }
        case <-time.After(time.Second):
          t.Fatal("ticker did not produce first tick")
        }
        cancel()
        select {
        case _, ok := <-ticks:
          if ok {
            t.Fatal("ticker channel should close after cancellation")
          }
        case <-time.After(time.Second):
          t.Fatal("ticker did not stop")
        }
      }
    `,
  }),
  goExercise({
    id: "go/http/004-method-routing",
    title: "Method-Aware HTTP Handler",
    topic: "http",
    focus: "HTTP method routing and correct status codes for unsupported methods",
    task: "Implement `StatusHandler`. It should respond to GET with `ok\\n`; all other methods should return 405 and an `Allow: GET` header.",
    objectives: ["Check request methods", "Set protocol-relevant headers", "Test handlers with httptest"],
    tags: ["go", "http", "routing", "handlers"],
    starter: text`
      package drill

      import "net/http"

      func StatusHandler(w http.ResponseWriter, r *http.Request) {
        // TODO: allow only GET.
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "net/http"
      )

      func StatusHandler(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodGet {
          w.Header().Set("Allow", http.MethodGet)
          http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
          return
        }
        fmt.Fprintln(w, "ok")
      }
    `,
    test: text`
      package drill

      import (
        "net/http"
        "net/http/httptest"
        "testing"
      )

      func TestStatusHandler(t *testing.T) {
        rec := httptest.NewRecorder()
        StatusHandler(rec, httptest.NewRequest(http.MethodGet, "/status", nil))
        if rec.Code != http.StatusOK || rec.Body.String() != "ok\\n" {
          t.Fatalf("GET status=%d body=%q", rec.Code, rec.Body.String())
        }
        rec = httptest.NewRecorder()
        StatusHandler(rec, httptest.NewRequest(http.MethodPost, "/status", nil))
        if rec.Code != http.StatusMethodNotAllowed || rec.Header().Get("Allow") != http.MethodGet {
          t.Fatalf("POST status=%d allow=%q", rec.Code, rec.Header().Get("Allow"))
        }
      }
    `,
  }),
  goExercise({
    id: "go/http/005-json-error-response",
    title: "Consistent JSON Error Responses",
    topic: "http",
    focus: "JSON response helpers and stable HTTP error contracts",
    task: "Implement `WriteJSONError`. It should set `Content-Type: application/json`, write the provided status, and encode `{ \"error\": message }`.",
    objectives: ["Write reusable HTTP helpers", "Set headers before status", "Encode JSON response bodies"],
    tags: ["go", "http", "json", "errors"],
    starter: text`
      package drill

      import "net/http"

      func WriteJSONError(w http.ResponseWriter, status int, message string) {
        // TODO: write a stable JSON error response.
      }
    `,
    solution: text`
      package drill

      import (
        "encoding/json"
        "net/http"
      )

      func WriteJSONError(w http.ResponseWriter, status int, message string) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(status)
        _ = json.NewEncoder(w).Encode(map[string]string{"error": message})
      }
    `,
    test: text`
      package drill

      import (
        "encoding/json"
        "net/http"
        "net/http/httptest"
        "testing"
      )

      func TestWriteJSONError(t *testing.T) {
        rec := httptest.NewRecorder()
        WriteJSONError(rec, http.StatusBadRequest, "bad input")
        if rec.Code != http.StatusBadRequest {
          t.Fatalf("status = %d", rec.Code)
        }
        if rec.Header().Get("Content-Type") != "application/json" {
          t.Fatalf("content-type = %q", rec.Header().Get("Content-Type"))
        }
        var body map[string]string
        if err := json.Unmarshal(rec.Body.Bytes(), &body); err != nil {
          t.Fatal(err)
        }
        if body["error"] != "bad input" {
          t.Fatalf("body = %#v", body)
        }
      }
    `,
  }),
  goExercise({
    id: "go/cli/003-env-config",
    title: "Environment Configuration Loader",
    topic: "cli",
    focus: "configuration loading through injected environment lookup functions",
    task: "Implement `LoadConfig`. Use `APP_PORT` with default 8080, `APP_ENV` with default `dev`, and return an error for invalid ports.",
    objectives: ["Inject environment lookup for tests", "Apply defaults consistently", "Validate parsed configuration"],
    tags: ["go", "cli", "configuration", "environment"],
    starter: text`
      package drill

      type Config struct {
        Port int
        Env  string
      }

      func LoadConfig(lookup func(string) (string, bool)) (Config, error) {
        // TODO: load APP_PORT and APP_ENV with defaults.
        return Config{}, nil
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "strconv"
      )

      type Config struct {
        Port int
        Env  string
      }

      func LoadConfig(lookup func(string) (string, bool)) (Config, error) {
        cfg := Config{Port: 8080, Env: "dev"}
        if raw, ok := lookup("APP_ENV"); ok && raw != "" {
          cfg.Env = raw
        }
        if raw, ok := lookup("APP_PORT"); ok && raw != "" {
          port, err := strconv.Atoi(raw)
          if err != nil || port < 1 || port > 65535 {
            return Config{}, fmt.Errorf("invalid APP_PORT")
          }
          cfg.Port = port
        }
        return cfg, nil
      }
    `,
    test: text`
      package drill

      import "testing"

      func TestLoadConfig(t *testing.T) {
        env := map[string]string{"APP_PORT": "9090", "APP_ENV": "prod"}
        got, err := LoadConfig(func(key string) (string, bool) { v, ok := env[key]; return v, ok })
        if err != nil {
          t.Fatal(err)
        }
        if got.Port != 9090 || got.Env != "prod" {
          t.Fatalf("config = %#v", got)
        }
        if _, err := LoadConfig(func(string) (string, bool) { return "bad", true }); err == nil {
          t.Fatal("invalid port should fail")
        }
      }
    `,
  }),
  goExercise({
    id: "go/cli/004-structured-log-line",
    title: "Structured Log Line",
    topic: "cli",
    focus: "stable structured logging with sorted fields",
    task: "Implement `WriteLogLine`. Write `LEVEL message key=value...\\n`, sorting field keys alphabetically for deterministic output.",
    objectives: ["Write deterministic logs", "Sort map keys before output", "Accept io.Writer for testability"],
    tags: ["go", "cli", "logging", "io"],
    starter: text`
      package drill

      import "io"

      func WriteLogLine(w io.Writer, level string, message string, fields map[string]string) error {
        // TODO: write a deterministic structured log line.
        return nil
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "io"
        "sort"
      )

      func WriteLogLine(w io.Writer, level string, message string, fields map[string]string) error {
        if _, err := fmt.Fprintf(w, "%s %s", level, message); err != nil {
          return err
        }
        keys := make([]string, 0, len(fields))
        for key := range fields {
          keys = append(keys, key)
        }
        sort.Strings(keys)
        for _, key := range keys {
          if _, err := fmt.Fprintf(w, " %s=%s", key, fields[key]); err != nil {
            return err
          }
        }
        _, err := fmt.Fprintln(w)
        return err
      }
    `,
    test: text`
      package drill

      import (
        "bytes"
        "testing"
      )

      func TestWriteLogLine(t *testing.T) {
        var b bytes.Buffer
        err := WriteLogLine(&b, "INFO", "started", map[string]string{"service": "api", "trace": "abc"})
        if err != nil {
          t.Fatal(err)
        }
        if got := b.String(); got != "INFO started service=api trace=abc\\n" {
          t.Fatalf("log = %q", got)
        }
      }
    `,
  }),
  goExercise({
    id: "go/generics/003-result-map",
    title: "Generic Result Mapping",
    topic: "generics",
    focus: "generic result containers and mapping successful values without losing errors",
    task: "Implement `Result[T]`, `Ok`, `Err`, and `MapResult`. Mapping should transform only successful values and preserve errors unchanged.",
    objectives: ["Model generic result values", "Transform generic success payloads", "Preserve error semantics"],
    tags: ["go", "generics", "errors"],
    starter: text`
      package drill

      type Result[T any] struct {
        Value T
        Err   error
      }

      func Ok[T any](value T) Result[T] {
        // TODO: create successful result.
        return Result[T]{}
      }

      func Err[T any](err error) Result[T] {
        // TODO: create failed result.
        return Result[T]{}
      }

      func MapResult[T any, U any](result Result[T], fn func(T) U) Result[U] {
        // TODO: map success and preserve errors.
        return Result[U]{}
      }
    `,
    solution: text`
      package drill

      type Result[T any] struct {
        Value T
        Err   error
      }

      func Ok[T any](value T) Result[T] {
        return Result[T]{Value: value}
      }

      func Err[T any](err error) Result[T] {
        return Result[T]{Err: err}
      }

      func MapResult[T any, U any](result Result[T], fn func(T) U) Result[U] {
        if result.Err != nil {
          return Result[U]{Err: result.Err}
        }
        return Ok(fn(result.Value))
      }
    `,
    test: text`
      package drill

      import (
        "errors"
        "testing"
      )

      func TestMapResult(t *testing.T) {
        got := MapResult(Ok(21), func(v int) string { return string(rune('A' + v - 21)) })
        if got.Err != nil || got.Value != "A" {
          t.Fatalf("mapped = %#v", got)
        }
        boom := errors.New("boom")
        failed := MapResult(Err[int](boom), func(v int) string { return "nope" })
        if !errors.Is(failed.Err, boom) {
          t.Fatalf("error not preserved: %#v", failed)
        }
      }
    `,
  }),
  goExercise({
    id: "go/architecture/003-context-repository-timeout",
    title: "Context-Aware Repository Service",
    topic: "architecture",
    focus: "service boundaries that propagate context cancellation to repositories",
    task: "Implement `UserService.DisplayName`. It should call the repository with the provided context, propagate errors, and return `Name <email>`.",
    objectives: ["Pass context through service boundaries", "Keep repository interfaces narrow", "Format domain output after data access"],
    tags: ["go", "architecture", "context", "repository"],
    starter: text`
      package drill

      import "context"

      type User struct {
        Name  string
        Email string
      }

      type UserRepo interface {
        Find(ctx context.Context, id string) (User, error)
      }

      type UserService struct {
        Repo UserRepo
      }

      func (s UserService) DisplayName(ctx context.Context, id string) (string, error) {
        // TODO: fetch through repo and format the display name.
        return "", nil
      }
    `,
    solution: text`
      package drill

      import (
        "context"
        "fmt"
      )

      type User struct {
        Name  string
        Email string
      }

      type UserRepo interface {
        Find(ctx context.Context, id string) (User, error)
      }

      type UserService struct {
        Repo UserRepo
      }

      func (s UserService) DisplayName(ctx context.Context, id string) (string, error) {
        user, err := s.Repo.Find(ctx, id)
        if err != nil {
          return "", err
        }
        return fmt.Sprintf("%s <%s>", user.Name, user.Email), nil
      }
    `,
    test: text`
      package drill

      import (
        "context"
        "errors"
        "testing"
      )

      type repoSpy struct { ctx context.Context }

      func (r *repoSpy) Find(ctx context.Context, id string) (User, error) {
        r.ctx = ctx
        if id == "missing" {
          return User{}, errors.New("missing")
        }
        return User{Name: "Ada", Email: "ada@example.com"}, nil
      }

      func TestUserServiceDisplayName(t *testing.T) {
        ctx := context.WithValue(context.Background(), "trace", "abc")
        repo := &repoSpy{}
        got, err := (UserService{Repo: repo}).DisplayName(ctx, "1")
        if err != nil || got != "Ada <ada@example.com>" {
          t.Fatalf("got %q err %v", got, err)
        }
        if repo.ctx != ctx {
          t.Fatal("context was not propagated")
        }
      }
    `,
  }),
  goExercise({
    id: "go/architecture/004-lru-cache",
    title: "Small LRU Cache",
    topic: "architecture",
    focus: "bounded caches and API behavior under eviction",
    task: "Implement `LRU`. `Put` should evict the least recently used key when capacity is exceeded; `Get` should mark a key as recently used.",
    objectives: ["Build a bounded cache API", "Reason about recency updates", "Keep cache behavior deterministic"],
    tags: ["go", "architecture", "cache", "data-structures"],
    difficulty: "intermediate+",
    starter: text`
      package drill

      type LRU struct {
        capacity int
      }

      func NewLRU(capacity int) *LRU {
        // TODO: initialize cache.
        return &LRU{capacity: capacity}
      }

      func (c *LRU) Put(key string, value string) {}

      func (c *LRU) Get(key string) (string, bool) {
        // TODO: return value and mark as recently used.
        return "", false
      }
    `,
    solution: text`
      package drill

      import "container/list"

      type entry struct {
        key string
        value string
      }

      type LRU struct {
        capacity int
        order *list.List
        items map[string]*list.Element
      }

      func NewLRU(capacity int) *LRU {
        if capacity < 1 {
          capacity = 1
        }
        return &LRU{capacity: capacity, order: list.New(), items: map[string]*list.Element{}}
      }

      func (c *LRU) Put(key string, value string) {
        if el, ok := c.items[key]; ok {
          el.Value.(*entry).value = value
          c.order.MoveToFront(el)
          return
        }
        el := c.order.PushFront(&entry{key: key, value: value})
        c.items[key] = el
        if c.order.Len() > c.capacity {
          last := c.order.Back()
          c.order.Remove(last)
          delete(c.items, last.Value.(*entry).key)
        }
      }

      func (c *LRU) Get(key string) (string, bool) {
        el, ok := c.items[key]
        if !ok {
          return "", false
        }
        c.order.MoveToFront(el)
        return el.Value.(*entry).value, true
      }
    `,
    test: text`
      package drill

      import "testing"

      func TestLRUEvictsLeastRecentlyUsed(t *testing.T) {
        cache := NewLRU(2)
        cache.Put("a", "one")
        cache.Put("b", "two")
        if _, ok := cache.Get("a"); !ok {
          t.Fatal("expected a")
        }
        cache.Put("c", "three")
        if _, ok := cache.Get("b"); ok {
          t.Fatal("b should have been evicted")
        }
        if got, ok := cache.Get("a"); !ok || got != "one" {
          t.Fatalf("a = %q ok=%v", got, ok)
        }
      }
    `,
  }),
  goExercise({
    id: "go/http/006-request-id-middleware",
    title: "Request ID Middleware",
    topic: "http",
    focus: "request-scoped values, middleware composition, and response headers",
    task: "Implement `RequestIDMiddleware`. Use the incoming `X-Request-ID` when present; otherwise generate one with `nextID`. Store it in context and set it on the response.",
    objectives: ["Use request contexts in middleware", "Propagate request metadata", "Keep ID generation injectable"],
    tags: ["go", "http", "middleware", "context"],
    difficulty: "intermediate+",
    starter: text`
      package drill

      import (
        "context"
        "net/http"
      )

      type requestIDKey struct{}

      func RequestID(ctx context.Context) string {
        value, _ := ctx.Value(requestIDKey{}).(string)
        return value
      }

      func RequestIDMiddleware(next http.Handler, nextID func() string) http.Handler {
        // TODO: attach request id to context and response header.
        return next
      }
    `,
    solution: text`
      package drill

      import (
        "context"
        "net/http"
      )

      type requestIDKey struct{}

      func RequestID(ctx context.Context) string {
        value, _ := ctx.Value(requestIDKey{}).(string)
        return value
      }

      func RequestIDMiddleware(next http.Handler, nextID func() string) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
          id := r.Header.Get("X-Request-ID")
          if id == "" {
            id = nextID()
          }
          w.Header().Set("X-Request-ID", id)
          ctx := context.WithValue(r.Context(), requestIDKey{}, id)
          next.ServeHTTP(w, r.WithContext(ctx))
        })
      }
    `,
    test: text`
      package drill

      import (
        "net/http"
        "net/http/httptest"
        "testing"
      )

      func TestRequestIDMiddleware(t *testing.T) {
        var seen string
        next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
          seen = RequestID(r.Context())
        })
        rec := httptest.NewRecorder()
        RequestIDMiddleware(next, func() string { return "generated" }).ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/", nil))
        if seen != "generated" || rec.Header().Get("X-Request-ID") != "generated" {
          t.Fatalf("seen=%q header=%q", seen, rec.Header().Get("X-Request-ID"))
        }
      }
    `,
  }),
  goExercise({
    id: "go/testing/010-benchmark-pool",
    title: "Benchmark-Friendly Buffer Pool",
    topic: "testing",
    focus: "sync.Pool basics and benchmarkable allocation reduction",
    task: "Implement `RenderWithPool`. Use the provided `sync.Pool` of `*bytes.Buffer`, reset buffers before reuse, and put them back before returning.",
    objectives: ["Use sync.Pool carefully", "Reset pooled buffers", "Keep pooled implementation benchmarkable"],
    tags: ["go", "testing", "benchmarks", "sync-pool"],
    starter: text`
      package drill

      import "sync"

      func RenderWithPool(pool *sync.Pool, parts []string) string {
        // TODO: use pooled *bytes.Buffer values.
        return ""
      }
    `,
    solution: text`
      package drill

      import (
        "bytes"
        "sync"
      )

      func RenderWithPool(pool *sync.Pool, parts []string) string {
        buf, _ := pool.Get().(*bytes.Buffer)
        if buf == nil {
          buf = &bytes.Buffer{}
        }
        buf.Reset()
        for _, part := range parts {
          buf.WriteString(part)
        }
        out := buf.String()
        pool.Put(buf)
        return out
      }
    `,
    test: text`
      package drill

      import (
        "bytes"
        "sync"
        "testing"
      )

      func TestRenderWithPool(t *testing.T) {
        pool := &sync.Pool{New: func() any { return &bytes.Buffer{} }}
        if got := RenderWithPool(pool, []string{"go", "-", "test"}); got != "go-test" {
          t.Fatalf("got %q", got)
        }
        if got := RenderWithPool(pool, []string{"next"}); got != "next" {
          t.Fatalf("buffer was not reset, got %q", got)
        }
      }

      func BenchmarkRenderWithPool(b *testing.B) {
        pool := &sync.Pool{New: func() any { return &bytes.Buffer{} }}
        for i := 0; i < b.N; i++ {
          _ = RenderWithPool(pool, []string{"a", "b", "c"})
        }
      }
    `,
  }),
  goExercise({
    id: "go/architecture/005-command-handler",
    title: "Command Handler Boundary",
    topic: "architecture",
    focus: "application command handlers that validate input and coordinate dependencies",
    task: "Implement `CreateProjectHandler.Handle`. Trim the name, reject empty names, call the store, and publish a `project.created` event after successful save.",
    objectives: ["Separate command input from side effects", "Validate before persistence", "Publish events after successful writes"],
    tags: ["go", "architecture", "commands", "events"],
    difficulty: "intermediate+",
    starter: text`
      package drill

      type Project struct {
        Name string
      }

      type ProjectStore interface {
        Save(Project) error
      }

      type Publisher interface {
        Publish(topic string, payload string) error
      }

      type CreateProjectHandler struct {
        Store ProjectStore
        Publisher Publisher
      }

      func (h CreateProjectHandler) Handle(name string) error {
        // TODO: validate, save, then publish project.created.
        return nil
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "strings"
      )

      type Project struct {
        Name string
      }

      type ProjectStore interface {
        Save(Project) error
      }

      type Publisher interface {
        Publish(topic string, payload string) error
      }

      type CreateProjectHandler struct {
        Store ProjectStore
        Publisher Publisher
      }

      func (h CreateProjectHandler) Handle(name string) error {
        name = strings.TrimSpace(name)
        if name == "" {
          return fmt.Errorf("project name is required")
        }
        project := Project{Name: name}
        if err := h.Store.Save(project); err != nil {
          return err
        }
        return h.Publisher.Publish("project.created", name)
      }
    `,
    test: text`
      package drill

      import "testing"

      type projectStoreSpy struct { saved []Project }
      func (s *projectStoreSpy) Save(project Project) error { s.saved = append(s.saved, project); return nil }
      type publisherSpy struct { topic string; payload string }
      func (p *publisherSpy) Publish(topic string, payload string) error { p.topic = topic; p.payload = payload; return nil }

      func TestCreateProjectHandler(t *testing.T) {
        store := &projectStoreSpy{}
        pub := &publisherSpy{}
        err := (CreateProjectHandler{Store: store, Publisher: pub}).Handle("  Apollo ")
        if err != nil {
          t.Fatal(err)
        }
        if store.saved[0].Name != "Apollo" || pub.topic != "project.created" || pub.payload != "Apollo" {
          t.Fatalf("store=%#v publisher=%#v", store.saved, pub)
        }
        if err := (CreateProjectHandler{Store: store, Publisher: pub}).Handle(" "); err == nil {
          t.Fatal("blank name should fail")
        }
      }
    `,
  }),
  goExercise({
    id: "go/concurrency/011-batch-with-context",
    title: "Batch Processing with Context",
    topic: "concurrency",
    focus: "context-aware loops that return partial results and cancellation errors",
    task: "Implement `ProcessBatch`. Apply `fn` to items in order, stop when context is canceled, and return partial results with the context error.",
    objectives: ["Check context during CPU-bound loops", "Return partial progress intentionally", "Preserve item ordering"],
    tags: ["go", "concurrency", "context", "batching"],
    starter: text`
      package drill

      import "context"

      func ProcessBatch[T any, U any](ctx context.Context, items []T, fn func(T) U) ([]U, error) {
        // TODO: process in order until context cancellation.
        return nil, nil
      }
    `,
    solution: text`
      package drill

      import "context"

      func ProcessBatch[T any, U any](ctx context.Context, items []T, fn func(T) U) ([]U, error) {
        out := make([]U, 0, len(items))
        for _, item := range items {
          select {
          case <-ctx.Done():
            return out, ctx.Err()
          default:
          }
          out = append(out, fn(item))
        }
        return out, nil
      }
    `,
    test: text`
      package drill

      import (
        "context"
        "errors"
        "testing"
      )

      func TestProcessBatchContext(t *testing.T) {
        ctx, cancel := context.WithCancel(context.Background())
        calls := 0
        got, err := ProcessBatch(ctx, []int{1, 2, 3}, func(v int) int {
          calls++
          if calls == 2 {
            cancel()
          }
          return v * 2
        })
        if !errors.Is(err, context.Canceled) {
          t.Fatalf("expected cancel error, got %v", err)
        }
        if len(got) != 2 || got[0] != 2 || got[1] != 4 {
          t.Fatalf("partial results = %#v", got)
        }
      }
    `,
  }),
  goExercise({
    id: "go/cli/005-subcommand-parser",
    title: "Subcommand Parser",
    topic: "cli",
    focus: "small CLI subcommand parsing without global state",
    task: "Implement `ParseCommand`. Support `serve --port <n>` and `migrate --dry-run`. Return an error for unknown subcommands or invalid flags.",
    objectives: ["Parse subcommands with separate FlagSets", "Return structured command values", "Reject unknown commands"],
    tags: ["go", "cli", "flags", "subcommands"],
    starter: text`
      package drill

      type Command struct {
        Name string
        Port int
        DryRun bool
      }

      func ParseCommand(args []string) (Command, error) {
        // TODO: parse serve and migrate subcommands.
        return Command{}, nil
      }
    `,
    solution: text`
      package drill

      import (
        "flag"
        "fmt"
      )

      type Command struct {
        Name string
        Port int
        DryRun bool
      }

      func ParseCommand(args []string) (Command, error) {
        if len(args) == 0 {
          return Command{}, fmt.Errorf("missing subcommand")
        }
        switch args[0] {
        case "serve":
          fs := flag.NewFlagSet("serve", flag.ContinueOnError)
          port := fs.Int("port", 8080, "port")
          if err := fs.Parse(args[1:]); err != nil {
            return Command{}, err
          }
          return Command{Name: "serve", Port: *port}, nil
        case "migrate":
          fs := flag.NewFlagSet("migrate", flag.ContinueOnError)
          dryRun := fs.Bool("dry-run", false, "dry run")
          if err := fs.Parse(args[1:]); err != nil {
            return Command{}, err
          }
          return Command{Name: "migrate", DryRun: *dryRun}, nil
        default:
          return Command{}, fmt.Errorf("unknown subcommand %q", args[0])
        }
      }
    `,
    test: text`
      package drill

      import "testing"

      func TestParseCommand(t *testing.T) {
        serve, err := ParseCommand([]string{"serve", "--port", "9090"})
        if err != nil || serve.Name != "serve" || serve.Port != 9090 {
          t.Fatalf("serve = %#v err=%v", serve, err)
        }
        migrate, err := ParseCommand([]string{"migrate", "--dry-run"})
        if err != nil || migrate.Name != "migrate" || !migrate.DryRun {
          t.Fatalf("migrate = %#v err=%v", migrate, err)
        }
        if _, err := ParseCommand([]string{"unknown"}); err == nil {
          t.Fatal("unknown subcommand should fail")
        }
      }
    `,
  }),
];

const typePrelude = text`
  export type Equal<X, Y> = (
    <T>() => T extends X ? 1 : 2
  ) extends (
    <T>() => T extends Y ? 1 : 2
  ) ? true : false;

  export type Assert<T extends true> = T;
`;

const tsExercises = [
  typeExercise({
    id: "ts-react/typescript-deep-dive/011-union-to-intersection",
    title: "Union to Intersection",
    topic: "typescript-deep-dive",
    focus: "distributive conditional types and function-parameter inference",
    task: "Implement `UnionToIntersection<T>` so a union of object types becomes their intersection.",
    objectives: ["Use distributive conditional types", "Infer from function parameters", "Understand union-to-intersection mechanics"],
    tags: ["typescript", "conditional-types", "infer"],
    starter: text`
      export type UnionToIntersection<T> = T; // TODO
    `,
    solution: text`
      export type UnionToIntersection<T> =
        (T extends unknown ? (value: T) => void : never) extends (value: infer I) => void ? I : never;
    `,
    test: text`
      import type { UnionToIntersection } from "./exercise";
      ${typePrelude}

      type Input = { id: string } | { name: string } | { active: boolean };
      type _case = Assert<Equal<UnionToIntersection<Input>, { id: string } & { name: string } & { active: boolean }>>;
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/012-deep-readonly",
    title: "Deep Readonly Transform",
    topic: "typescript-deep-dive",
    focus: "recursive mapped types for nested immutable data",
    task: "Implement `DeepReadonly<T>`. Functions should be left unchanged; objects and arrays should become deeply readonly.",
    objectives: ["Write recursive mapped types", "Handle function leaves", "Preserve nested property types"],
    tags: ["typescript", "mapped-types", "immutability"],
    starter: text`
      export type DeepReadonly<T> = T; // TODO
    `,
    solution: text`
      export type DeepReadonly<T> =
        T extends (...args: any[]) => any
          ? T
          : T extends object
            ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
            : T;
    `,
    test: text`
      import type { DeepReadonly } from "./exercise";

      type State = { user: { name: string; roles: string[] }; save(): void };
      declare const state: DeepReadonly<State>;
      state.save();
      // @ts-expect-error nested object is readonly
      state.user.name = "Ada";
      // @ts-expect-error nested array is readonly
      state.user.roles.push("admin");
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/013-dot-paths",
    title: "Dot Path Types",
    topic: "typescript-deep-dive",
    focus: "template literal recursion for nested object paths",
    task: "Implement `DotPaths<T>` so nested object keys become dot-separated path strings.",
    objectives: ["Generate path unions", "Use key remapping with template literals", "Stop recursion at primitive leaves"],
    tags: ["typescript", "template-literal-types", "type-level-programming"],
    starter: text`
      export type DotPaths<T> = never; // TODO
    `,
    solution: text`
      export type DotPaths<T> = {
        [K in keyof T & string]:
          T[K] extends Record<string, unknown>
            ? K | \`\${K}.\${DotPaths<T[K]>}\`
            : K
      }[keyof T & string];
    `,
    test: text`
      import type { DotPaths } from "./exercise";
      ${typePrelude}

      type Paths = DotPaths<{ user: { profile: { name: string } }; enabled: boolean }>;
      type _paths = Assert<Equal<Paths, "user" | "user.profile" | "user.profile.name" | "enabled">>;
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/014-exact-object",
    title: "Exact Object Shape",
    topic: "typescript-deep-dive",
    focus: "generic constraints that reject excess keys in helper APIs",
    task: "Implement `Exact<Shape, Value>` and `defineConfig` so object literals cannot include keys outside the expected config shape.",
    objectives: ["Reject excess keys in generic helpers", "Preserve literal value types", "Design strict config APIs"],
    tags: ["typescript", "excess-property-checks", "config"],
    starter: text`
      export type Exact<Shape, Value> = Value; // TODO
      export type AppConfig = { mode: "dev" | "prod"; port: number };
      export function defineConfig<T extends AppConfig>(config: T): T {
        return config;
      }
    `,
    solution: text`
      export type Exact<Shape, Value> =
        Value extends Shape
          ? Exclude<keyof Value, keyof Shape> extends never ? Value : never
          : never;
      export type AppConfig = { mode: "dev" | "prod"; port: number };
      export function defineConfig<T extends AppConfig>(config: Exact<AppConfig, T>): T {
        return config;
      }
    `,
    test: text`
      import { defineConfig } from "./exercise";

      defineConfig({ mode: "dev", port: 3000 });
      // @ts-expect-error extra keys should be rejected
      defineConfig({ mode: "dev", port: 3000, debug: true });
      // @ts-expect-error mode is restricted
      defineConfig({ mode: "test", port: 3000 });
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/015-tuple-zip",
    title: "Tuple Zip",
    topic: "typescript-deep-dive",
    focus: "variadic tuple inference and recursive tuple transforms",
    task: "Implement `Zip<A, B>` so two tuples become a tuple of pairs until either input runs out.",
    objectives: ["Use variadic tuple inference", "Write recursive tuple types", "Preserve literal tuple order"],
    tags: ["typescript", "tuples", "infer"],
    starter: text`
      export type Zip<A extends readonly unknown[], B extends readonly unknown[]> = []; // TODO
    `,
    solution: text`
      export type Zip<A extends readonly unknown[], B extends readonly unknown[]> =
        A extends readonly [infer AH, ...infer AT]
          ? B extends readonly [infer BH, ...infer BT]
            ? [[AH, BH], ...Zip<AT, BT>]
            : []
          : [];
    `,
    test: text`
      import type { Zip } from "./exercise";
      ${typePrelude}

      type _zip = Assert<Equal<Zip<[1, 2, 3], ["a", "b"]>, [[1, "a"], [2, "b"]]>>;
      type _empty = Assert<Equal<Zip<[], ["a"]>, []>>;
    `,
  }),
  staticExercise({
    id: "ts-react/react-architecture/008-abortable-async-hook",
    title: "Abortable Async Hook",
    topic: "react-architecture",
    focus: "custom hooks that cancel stale async work with AbortController",
    task: "Complete `useAbortableQuery` so each key change creates an `AbortController`, aborts stale requests in cleanup, and ignores aborted failures.",
    objectives: ["Cancel stale async work", "Use effect cleanup correctly", "Model loading and error state"],
    tags: ["react", "hooks", "async-ui", "abortcontroller"],
    files: {
      "src/useAbortableQuery.tsx": {
        starter: text`
          import { useEffect, useState } from "react";

          export function useAbortableQuery<T>(key: string, load: (signal: AbortSignal) => Promise<T>) {
            const [data, setData] = useState<T | null>(null);
            const [error, setError] = useState<unknown>(null);
            // TODO: create AbortController per key and abort stale requests.
            useEffect(() => {
              load(new AbortController().signal).then(setData, setError);
            }, [key, load]);
            return { data, error };
          }
        `,
        solution: text`
          import { useEffect, useState } from "react";

          export function useAbortableQuery<T>(key: string, load: (signal: AbortSignal) => Promise<T>) {
            const [data, setData] = useState<T | null>(null);
            const [error, setError] = useState<unknown>(null);
            useEffect(() => {
              const controller = new AbortController();
              setError(null);
              load(controller.signal).then(
                value => { if (!controller.signal.aborted) setData(value); },
                reason => { if (!controller.signal.aborted) setError(reason); },
              );
              return () => controller.abort();
            }, [key, load]);
            return { data, error };
          }
        `,
      },
    },
    checks: [
      { file: "src/useAbortableQuery.tsx", includes: "new AbortController()" },
      { file: "src/useAbortableQuery.tsx", includes: "return () => controller.abort()" },
      { file: "src/useAbortableQuery.tsx", includes: "controller.signal.aborted" },
    ],
  }),
  staticExercise({
    id: "ts-react/react-architecture/009-reducer-command-pattern",
    title: "Reducer Command Pattern",
    topic: "react-architecture",
    focus: "separating pure state transitions from executable side-effect commands",
    task: "Refactor the reducer so it returns `{ state, command }`, keeping navigation and analytics as commands instead of executing them inside the reducer.",
    objectives: ["Keep reducers pure", "Model side effects as commands", "Make orchestration testable"],
    tags: ["react", "reducers", "architecture"],
    files: {
      "src/reducer.ts": {
        starter: text`
          type State = { saved: boolean };
          type Action = { type: "saved"; id: string };

          export function reducer(state: State, action: Action) {
            // TODO: return state plus a command instead of doing side effects here.
            window.location.href = "/projects/" + action.id;
            return { saved: true };
          }
        `,
        solution: text`
          type State = { saved: boolean };
          type Action = { type: "saved"; id: string };
          type Command = { type: "navigate"; to: string } | { type: "none" };

          export function reducer(state: State, action: Action): { state: State; command: Command } {
            switch (action.type) {
              case "saved":
                return { state: { saved: true }, command: { type: "navigate", to: "/projects/" + action.id } };
              default:
                return { state, command: { type: "none" } };
            }
          }
        `,
      },
    },
    checks: [
      { file: "src/reducer.ts", includes: "command:" },
      { file: "src/reducer.ts", includes: "type Command" },
      { file: "src/reducer.ts", includes: "\"navigate\"" },
      { file: "src/reducer.ts", excludes: "window.location.href" },
    ],
  }),
  staticExercise({
    id: "ts-react/performance/006-deferred-search",
    title: "Deferred Search Rendering",
    topic: "performance",
    focus: "useDeferredValue for keeping input responsive during expensive filtering",
    task: "Refactor the search component so the input uses immediate state, filtering uses a deferred query, and the list marks stale results with `aria-busy`.",
    objectives: ["Use useDeferredValue intentionally", "Keep input updates responsive", "Expose stale render state accessibly"],
    tags: ["react", "performance", "useDeferredValue"],
    files: {
      "src/SearchResults.tsx": {
        starter: text`
          import { useMemo, useState } from "react";

          export function SearchResults(props: { items: string[] }) {
            const [query, setQuery] = useState("");
            // TODO: filter with a deferred query.
            const visible = useMemo(() => props.items.filter(item => item.includes(query)), [props.items, query]);
            return <>
              <input value={query} onChange={event => setQuery(event.currentTarget.value)} />
              <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>
            </>;
          }
        `,
        solution: text`
          import { useDeferredValue, useMemo, useState } from "react";

          export function SearchResults(props: { items: string[] }) {
            const [query, setQuery] = useState("");
            const deferredQuery = useDeferredValue(query);
            const isStale = query !== deferredQuery;
            const visible = useMemo(() => props.items.filter(item => item.includes(deferredQuery)), [props.items, deferredQuery]);
            return <>
              <input value={query} onChange={event => setQuery(event.currentTarget.value)} />
              <ul aria-busy={isStale}>{visible.map(item => <li key={item}>{item}</li>)}</ul>
            </>;
          }
        `,
      },
    },
    checks: [
      { file: "src/SearchResults.tsx", includes: "useDeferredValue" },
      { file: "src/SearchResults.tsx", includes: "deferredQuery" },
      { file: "src/SearchResults.tsx", includes: "aria-busy" },
    ],
  }),
  staticExercise({
    id: "ts-react/testing/005-optimistic-rollback-test",
    title: "Optimistic Rollback Test",
    topic: "testing",
    focus: "testing optimistic UI flows including failed mutation rollback",
    task: "Complete the test so it submits an optimistic item, mocks a rejected request, and verifies the item is rolled back with an error message.",
    objectives: ["Test optimistic updates", "Mock rejected mutations", "Assert rollback behavior"],
    tags: ["react", "testing", "optimistic-ui"],
    files: {
      "src/optimistic.test.tsx": {
        starter: text`
          import { describe, expect, it } from "vitest";

          describe("TodoList optimistic create", () => {
            it("rolls back failed creates", async () => {
              // TODO: mock rejected create, submit item, assert rollback and error.
              expect(true).toBe(true);
            });
          });
        `,
        solution: text`
          import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
          import userEvent from "@testing-library/user-event";
          import { describe, expect, it, vi } from "vitest";
          import { TodoList } from "./TodoList";

          describe("TodoList optimistic create", () => {
            it("rolls back failed creates", async () => {
              const createTodo = vi.fn().mockRejectedValue(new Error("network"));
              const user = userEvent.setup();
              render(<TodoList createTodo={createTodo} />);
              await user.type(screen.getByRole("textbox", { name: /todo/i }), "Ship it");
              await user.click(screen.getByRole("button", { name: /add/i }));
              expect(screen.getByText("Ship it")).toBeInTheDocument();
              await waitForElementToBeRemoved(() => screen.queryByText("Ship it"));
              expect(screen.getByRole("alert")).toHaveTextContent("network");
            });
          });
        `,
      },
    },
    checks: [
      { file: "src/optimistic.test.tsx", includes: "mockRejectedValue" },
      { file: "src/optimistic.test.tsx", includes: "waitForElementToBeRemoved" },
      { file: "src/optimistic.test.tsx", includes: "getByRole(\"alert\")" },
    ],
  }),
  staticExercise({
    id: "ts-react/bundlers/003-vite-library-mode",
    title: "Vite Library Mode",
    topic: "bundlers",
    focus: "Vite library builds with externalized peer dependencies",
    task: "Configure Vite for a component library build with ESM/CJS outputs, React externalized, and generated file names by format.",
    objectives: ["Configure library mode", "Externalize peer dependencies", "Name build outputs predictably"],
    tags: ["vite", "bundlers", "library-mode"],
    files: {
      "vite.config.ts": {
        starter: text`
          import { defineConfig } from "vite";

          export default defineConfig({
            // TODO: configure library mode for @acme/ui.
          });
        `,
        solution: text`
          import { defineConfig } from "vite";
          import react from "@vitejs/plugin-react";

          export default defineConfig({
            plugins: [react()],
            build: {
              lib: { entry: "src/index.ts", name: "AcmeUI", formats: ["es", "cjs"], fileName: format => \`index.\${format}.js\` },
              rollupOptions: { external: ["react", "react-dom"] },
            },
          });
        `,
      },
    },
    checks: [
      { file: "vite.config.ts", includes: "lib:" },
      { file: "vite.config.ts", includes: "formats: [\"es\", \"cjs\"]" },
      { file: "vite.config.ts", includes: "external: [\"react\", \"react-dom\"]" },
    ],
  }),
  staticExercise({
    id: "ts-react/webpack/003-alias-source-maps",
    title: "Webpack Aliases and Source Maps",
    topic: "webpack",
    focus: "resolve aliases, extension resolution, and production source-map choices",
    task: "Update the webpack config with `@app` and `@shared` aliases, TS/TSX extensions, and hidden source maps for production diagnostics.",
    objectives: ["Configure resolve aliases", "Support TS extension resolution", "Choose production source maps intentionally"],
    tags: ["webpack", "aliases", "source-maps"],
    files: {
      "webpack.config.js": {
        starter: text`
          const path = require("path");
          module.exports = {
            // TODO: add resolve aliases and production source maps.
          };
        `,
        solution: text`
          const path = require("path");
          module.exports = {
            devtool: "hidden-source-map",
            resolve: {
              extensions: [".tsx", ".ts", ".js"],
              alias: {
                "@app": path.resolve(__dirname, "src/app"),
                "@shared": path.resolve(__dirname, "src/shared"),
              },
            },
          };
        `,
      },
    },
    checks: [
      { file: "webpack.config.js", includes: "hidden-source-map" },
      { file: "webpack.config.js", includes: "\".tsx\", \".ts\", \".js\"" },
      { file: "webpack.config.js", includes: "\"@app\"" },
      { file: "webpack.config.js", includes: "\"@shared\"" },
    ],
  }),
  staticExercise({
    id: "ts-react/rspack/002-federation-remote",
    title: "Rspack Federation Remote",
    topic: "rspack",
    focus: "Rspack module federation remote configuration",
    task: "Configure an Rspack remote named `analytics` that exposes `./Dashboard` and shares React as a singleton.",
    objectives: ["Configure Rspack federation remotes", "Expose remote modules", "Share singleton React dependencies"],
    tags: ["rspack", "module-federation", "microfrontends"],
    files: {
      "rspack.config.js": {
        starter: text`
          const { container } = require("@rspack/core");
          const { ModuleFederationPlugin } = container;
          module.exports = {
            plugins: [
              // TODO: configure analytics remote.
            ],
          };
        `,
        solution: text`
          const { container } = require("@rspack/core");
          const { ModuleFederationPlugin } = container;
          module.exports = {
            plugins: [
              new ModuleFederationPlugin({
                name: "analytics",
                filename: "remoteEntry.js",
                exposes: { "./Dashboard": "./src/Dashboard" },
                shared: { react: { singleton: true }, "react-dom": { singleton: true } },
              }),
            ],
          };
        `,
      },
    },
    checks: [
      { file: "rspack.config.js", includes: "new ModuleFederationPlugin" },
      { file: "rspack.config.js", includes: "name: \"analytics\"" },
      { file: "rspack.config.js", includes: "\"./Dashboard\"" },
      { file: "rspack.config.js", includes: "singleton: true" },
    ],
  }),
  staticExercise({
    id: "ts-react/microfrontends/005-cross-app-event-bridge",
    title: "Cross-App Event Bridge",
    topic: "microfrontends",
    focus: "typed cross-application communication without shared runtime state",
    task: "Implement a typed event bridge over `window.dispatchEvent` and `window.addEventListener` for `cart:updated` events.",
    objectives: ["Use DOM events for deployment boundaries", "Type cross-app payloads", "Return unsubscribe functions"],
    tags: ["microfrontends", "events", "typescript"],
    files: {
      "src/eventBridge.ts": {
        starter: text`
          type Events = {
            "cart:updated": { count: number };
          };

          export function publish<K extends keyof Events>(name: K, payload: Events[K]) {
            // TODO: dispatch a CustomEvent.
          }

          export function subscribe<K extends keyof Events>(name: K, handler: (payload: Events[K]) => void) {
            // TODO: add listener and return unsubscribe.
            return () => {};
          }
        `,
        solution: text`
          type Events = {
            "cart:updated": { count: number };
          };

          export function publish<K extends keyof Events>(name: K, payload: Events[K]) {
            window.dispatchEvent(new CustomEvent(String(name), { detail: payload }));
          }

          export function subscribe<K extends keyof Events>(name: K, handler: (payload: Events[K]) => void) {
            const listener = (event: Event) => handler((event as CustomEvent<Events[K]>).detail);
            window.addEventListener(String(name), listener);
            return () => window.removeEventListener(String(name), listener);
          }
        `,
      },
    },
    checks: [
      { file: "src/eventBridge.ts", includes: "new CustomEvent" },
      { file: "src/eventBridge.ts", includes: "window.dispatchEvent" },
      { file: "src/eventBridge.ts", includes: "window.addEventListener" },
      { file: "src/eventBridge.ts", includes: "window.removeEventListener" },
    ],
  }),
  staticExercise({
    id: "ts-react/monorepo/003-boundary-lint-config",
    title: "Dependency Boundary Lint Config",
    topic: "monorepo",
    focus: "monorepo dependency graph boundaries enforced by lint configuration",
    task: "Complete the boundary config so apps may depend on packages, but packages cannot import from apps or package internals.",
    objectives: ["Encode dependency boundaries", "Protect public package APIs", "Prevent app-to-package coupling leaks"],
    tags: ["monorepo", "dependency-graph", "boundaries"],
    files: {
      "boundaries.config.json": {
        starter: text`
          {
            "rules": [
            ]
          }
        `,
        solution: text`
          {
            "rules": [
              { "from": "packages/*", "disallow": ["apps/*"] },
              { "from": "apps/*", "allow": ["packages/*"] },
              { "from": "*", "disallow": ["packages/*/src/internal/*"] }
            ]
          }
        `,
      },
    },
    checks: [
      { file: "boundaries.config.json", includes: "\"packages/*\"" },
      { file: "boundaries.config.json", includes: "\"apps/*\"" },
      { file: "boundaries.config.json", includes: "\"packages/*/src/internal/*\"" },
    ],
  }),
  staticExercise({
    id: "ts-react/design-systems/002-accessible-field-api",
    title: "Accessible Field API",
    topic: "design-systems",
    focus: "design-system form primitives that wire labels, descriptions, and errors",
    task: "Complete the Field component so it generates a stable id, connects label/htmlFor, description, and error text through ARIA attributes.",
    objectives: ["Design accessible component APIs", "Wire ARIA relationships", "Generate stable IDs with useId"],
    tags: ["react", "design-systems", "accessibility"],
    files: {
      "src/Field.tsx": {
        starter: text`
          export function Field(props: { label: string; description?: string; error?: string; children: React.ReactElement }) {
            // TODO: wire label, description, and error to the child input.
            return <label>{props.label}{props.children}</label>;
          }
        `,
        solution: text`
          import { cloneElement, useId } from "react";

          export function Field(props: { label: string; description?: string; error?: string; children: React.ReactElement }) {
            const id = useId();
            const descriptionId = props.description ? \`\${id}-description\` : undefined;
            const errorId = props.error ? \`\${id}-error\` : undefined;
            const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
            return (
              <div>
                <label htmlFor={id}>{props.label}</label>
                {cloneElement(props.children, { id, "aria-describedby": describedBy, "aria-invalid": Boolean(props.error) })}
                {props.description && <p id={descriptionId}>{props.description}</p>}
                {props.error && <p id={errorId} role="alert">{props.error}</p>}
              </div>
            );
          }
        `,
      },
    },
    checks: [
      { file: "src/Field.tsx", includes: "useId" },
      { file: "src/Field.tsx", includes: "htmlFor={id}" },
      { file: "src/Field.tsx", includes: "aria-describedby" },
      { file: "src/Field.tsx", includes: "role=\"alert\"" },
    ],
  }),
  staticExercise({
    id: "ts-react/testing/006-error-boundary-retry-test",
    title: "Error Boundary Retry Test",
    topic: "testing",
    focus: "testing recoverable error boundaries and retry flows",
    task: "Complete the test so it renders a failing child, asserts fallback UI, clicks retry, and verifies recovered content appears.",
    objectives: ["Test error boundary fallback behavior", "Exercise retry UI", "Assert recovery instead of implementation details"],
    tags: ["react", "testing", "error-boundaries"],
    files: {
      "src/errorBoundaryRetry.test.tsx": {
        starter: text`
          import { describe, expect, it } from "vitest";

          describe("RetryBoundary", () => {
            it("recovers after retry", async () => {
              // TODO: assert fallback, click retry, and assert recovered content.
              expect(true).toBe(true);
            });
          });
        `,
        solution: text`
          import { render, screen } from "@testing-library/react";
          import userEvent from "@testing-library/user-event";
          import { describe, expect, it } from "vitest";
          import { RetryBoundary } from "./RetryBoundary";

          describe("RetryBoundary", () => {
            it("recovers after retry", async () => {
              const user = userEvent.setup();
              render(<RetryBoundary />);
              expect(screen.getByRole("alert")).toHaveTextContent(/failed/i);
              await user.click(screen.getByRole("button", { name: /retry/i }));
              expect(await screen.findByText(/loaded/i)).toBeInTheDocument();
            });
          });
        `,
      },
    },
    checks: [
      { file: "src/errorBoundaryRetry.test.tsx", includes: "getByRole(\"alert\")" },
      { file: "src/errorBoundaryRetry.test.tsx", includes: "getByRole(\"button\", { name: /retry/i })" },
      { file: "src/errorBoundaryRetry.test.tsx", includes: "findByText(/loaded/i)" },
    ],
  }),
  staticExercise({
    id: "ts-react/performance/007-render-count-guard",
    title: "Render Count Regression Guard",
    topic: "performance",
    focus: "testing render count regressions with a lightweight render counter",
    task: "Complete the test so an unrelated state update does not rerender the expensive child more than once.",
    objectives: ["Detect unnecessary renders", "Use test-local render counters", "Protect memoized child boundaries"],
    tags: ["react", "performance", "testing"],
    files: {
      "src/renderCount.test.tsx": {
        starter: text`
          import { describe, expect, it } from "vitest";

          describe("Dashboard render behavior", () => {
            it("does not rerender expensive child on unrelated updates", async () => {
              // TODO: count ExpensiveChild renders after unrelated updates.
              expect(true).toBe(true);
            });
          });
        `,
        solution: text`
          import { render, screen } from "@testing-library/react";
          import userEvent from "@testing-library/user-event";
          import { describe, expect, it } from "vitest";
          import { Dashboard } from "./Dashboard";

          describe("Dashboard render behavior", () => {
            it("does not rerender expensive child on unrelated updates", async () => {
              let expensiveRenders = 0;
              const user = userEvent.setup();
              render(<Dashboard onExpensiveRender={() => { expensiveRenders += 1; }} />);
              await user.click(screen.getByRole("button", { name: /toggle sidebar/i }));
              await user.click(screen.getByRole("button", { name: /toggle sidebar/i }));
              expect(expensiveRenders).toBe(1);
            });
          });
        `,
      },
    },
    checks: [
      { file: "src/renderCount.test.tsx", includes: "expensiveRenders" },
      { file: "src/renderCount.test.tsx", includes: "onExpensiveRender" },
      { file: "src/renderCount.test.tsx", includes: "toBe(1)" },
    ],
  }),
  staticExercise({
    id: "ts-react/bundlers/004-import-analysis",
    title: "Import Graph Analysis Script",
    topic: "bundlers",
    focus: "dependency graph reasoning with a small static import analyzer",
    task: "Implement `findImports` so it extracts static `import ... from` and dynamic `import()` specifiers from a source string.",
    objectives: ["Reason about import graphs", "Parse common import forms", "Separate graph analysis from bundler execution"],
    tags: ["bundlers", "dependency-graph", "node"],
    files: {
      "src/findImports.ts": {
        starter: text`
          export function findImports(source: string): string[] {
            // TODO: extract static and dynamic import specifiers.
            return [];
          }
        `,
        solution: text`
          export function findImports(source: string): string[] {
            const found = new Set<string>();
            const staticImport = /import\\s+(?:[^'"]+?\\s+from\\s+)?["']([^"']+)["']/g;
            const dynamicImport = /import\\(\\s*["']([^"']+)["']\\s*\\)/g;
            for (const match of source.matchAll(staticImport)) found.add(match[1]);
            for (const match of source.matchAll(dynamicImport)) found.add(match[1]);
            return [...found].sort();
          }
        `,
      },
    },
    checks: [
      { file: "src/findImports.ts", includes: "matchAll" },
      { file: "src/findImports.ts", includes: "import\\(" },
      { file: "src/findImports.ts", includes: "sort()" },
    ],
  }),
  staticExercise({
    id: "ts-react/microfrontends/006-remote-contract-manifest",
    title: "Remote Contract Manifest",
    topic: "microfrontends",
    focus: "deployment-boundary thinking through explicit remote manifests",
    task: "Complete the manifest with remote name, entry URL, exposed modules, required shared versions, and a health-check endpoint.",
    objectives: ["Document remote deployment contracts", "Track exposed module names", "Make shared dependency versions explicit"],
    tags: ["microfrontends", "deployment", "contracts"],
    files: {
      "remote.manifest.json": {
        starter: text`
          {
            "name": "reports"
          }
        `,
        solution: text`
          {
            "name": "reports",
            "remoteEntry": "https://cdn.example.com/reports/remoteEntry.js",
            "exposes": {
              "./Widget": "./src/Widget",
              "./routes": "./src/routes"
            },
            "shared": {
              "react": "^18.2.0",
              "react-dom": "^18.2.0"
            },
            "healthCheck": "https://cdn.example.com/reports/health.json"
          }
        `,
      },
    },
    checks: [
      { file: "remote.manifest.json", includes: "\"remoteEntry\"" },
      { file: "remote.manifest.json", includes: "\"./Widget\"" },
      { file: "remote.manifest.json", includes: "\"react\"" },
      { file: "remote.manifest.json", includes: "\"healthCheck\"" },
    ],
  }),
  staticExercise({
    id: "ts-react/monorepo/004-package-exports-subpaths",
    title: "Package Exports Subpaths",
    topic: "monorepo",
    focus: "package export maps that expose intentional public subpaths",
    task: "Complete the package export map so root, `./button`, and `./tokens` have type and import entries while internals remain unexported.",
    objectives: ["Design package export maps", "Expose stable subpaths", "Hide internal modules"],
    tags: ["monorepo", "package-exports", "api-design"],
    files: {
      "packages/ui/package.json": {
        starter: text`
          {
            "name": "@acme/ui",
            "type": "module",
            "exports": {}
          }
        `,
        solution: text`
          {
            "name": "@acme/ui",
            "type": "module",
            "exports": {
              ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
              "./button": { "types": "./dist/button.d.ts", "import": "./dist/button.js" },
              "./tokens": { "types": "./dist/tokens.d.ts", "import": "./dist/tokens.js" }
            }
          }
        `,
      },
    },
    checks: [
      { file: "packages/ui/package.json", includes: "\"./button\"" },
      { file: "packages/ui/package.json", includes: "\"./tokens\"" },
      { file: "packages/ui/package.json", includes: "\"types\"" },
      { file: "packages/ui/package.json", excludes: "internal" },
    ],
  }),
];

function staticChecker(checks) {
  return text`
    #!/usr/bin/env node
    import { existsSync, readFileSync } from "node:fs";
    import path from "node:path";

    const target = path.resolve(process.argv[2] ?? ".");
    const checks = ${JSON.stringify(checks, null, 2)};
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
      if (/TODO|expect\\(true\\)\\.toBe\\(true\\)/.test(body)) {
        failures.push(check.file + " still contains starter markers");
      }
      if (check.includes && !body.includes(check.includes)) failures.push(check.file + " must include: " + check.includes);
      if (check.excludes && body.includes(check.excludes)) failures.push(check.file + " must not include: " + check.excludes);
    }

    if (failures.length) {
      console.error(failures.map(f => "- " + f).join("\\n"));
      process.exit(1);
    }
    console.log("static checks passed");
  `.trimStart();
}

async function writeGo(ex) {
  await writeJSON(`${ex.id}/exercise.json`, metadata(ex));
  await write(`${ex.id}/THEORY.md`, theoryFor(ex));
  await write(`${ex.id}/TASK.md`, taskFor(ex));
  await write(`${ex.id}/HINTS.md`, hintsFor());
  for (const side of ["starter", "solution"]) {
    await write(`${ex.id}/${side}/go.mod`, "module drill\n\ngo 1.22\n");
    await write(`${ex.id}/${side}/exercise.go`, ex[side]);
    await write(`${ex.id}/${side}/exercise_test.go`, ex.test);
  }
}

async function writeTs(ex) {
  await writeJSON(`${ex.id}/exercise.json`, metadata(ex));
  await write(`${ex.id}/THEORY.md`, theoryFor(ex));
  await write(`${ex.id}/TASK.md`, taskFor(ex));
  await write(`${ex.id}/HINTS.md`, hintsFor());
  if (ex.kind === "type") {
    for (const side of ["starter", "solution"]) {
      await write(`${ex.id}/${side}/tsconfig.json`, text`
        {
          "compilerOptions": {
            "target": "ES2020",
            "module": "ESNext",
            "strict": true,
            "noEmit": true,
            "skipLibCheck": true
          },
          "include": ["src/**/*.ts"]
        }
      `);
      await write(`${ex.id}/${side}/src/exercise.ts`, ex[side]);
      await write(`${ex.id}/${side}/src/exercise.test-d.ts`, ex.test);
    }
  } else {
    for (const side of ["starter", "solution"]) {
      for (const [rel, variants] of Object.entries(ex.files)) {
        await write(`${ex.id}/${side}/${rel}`, variants[side]);
      }
    }
    await write(`${ex.id}/tests/check.mjs`, staticChecker(ex.checks));
  }
}

for (const ex of goExercises) await writeGo(ex);
for (const ex of tsExercises) await writeTs(ex);
console.log(`generated ${goExercises.length} extra Go drills and ${tsExercises.length} extra TS/React drills`);
