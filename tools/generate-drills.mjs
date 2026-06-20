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

function words(s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function theoryFor(ex) {
  const body = text`
    This drill focuses on ${ex.focus}. The point is to practice the smallest useful version of the idea, then let the tests force precision. In production code, this skill usually appears inside larger features, where a vague understanding is not enough: edge cases, naming, and failure behavior become part of the API.

    Read the starter code before writing anything. Notice the public function or type that the tests exercise, the values that are considered invalid, and the shape of the expected result. Keep the implementation direct at first. For Go drills, prefer clear control flow, small helpers, and ordinary standard-library tools. For TypeScript and React drills, prefer explicit types and observable behavior over cleverness that hides the contract.

    The reference solution is intentionally small. Your version does not need to match it exactly, but it should satisfy the same contract and remain easy to change after the test passes.
  `;
  const count = words(body);
  if (count < 100 || count > 250) throw new Error(`bad theory length for ${ex.id}: ${count}`);
  return body;
}

function taskFor(ex) {
  return text`
    # ${ex.title}

    ## Learning Objectives
    ${ex.objectives.map((o) => `- ${o}`).join("\n")}

    ## Task
    ${ex.task}

    Work only in the starter directory while practicing. The solution directory is a reference implementation used by the verifier.

    ## Expected Commands
    - From this exercise: \`${ex.checkCommand}\`
    - From the repository root: \`pnpm drill:check ${ex.id}\`
    - Verify the reference solution: \`pnpm drill:check ${ex.id} --solution\`

    ## Difficulty
    ${ex.difficulty}

    ## Estimated Time
    ${ex.minutes} minutes

    ## Tags
    ${ex.tags.map((t) => `- ${t}`).join("\n")}
  `.replace(/^ {4}/gm, "");
}

function hintsFor(ex) {
  return text`
    # Hints

    1. Start by making the simplest test case pass. Avoid designing a larger abstraction until the tests show repeated pressure.
    2. Re-read the function signature and metadata tags. They usually point to the standard-library feature, React pattern, or type-system feature intended for the drill.
    3. If you are stuck, compare the failing assertion with the starter stub. Identify whether the missing piece is data normalization, error behavior, ordering, cancellation, or type inference.
  `;
}

function goExercise(def) {
  return {
    language: "go",
    checkCommand: "go test ./...",
    solutionCommand: "go test ./...",
    minutes: def.minutes ?? 25,
    difficulty: def.difficulty ?? "beginner",
    tags: def.tags ?? [def.topic],
    prerequisites: def.prerequisites ?? [],
    ...def,
  };
}

function typeExercise(def) {
  return {
    language: "ts-react",
    track: "ts-react",
    checkCommand: "tsc -p .",
    solutionCommand: "tsc -p .",
    minutes: def.minutes ?? 35,
    difficulty: def.difficulty ?? "advanced",
    tags: def.tags ?? [def.topic, "typescript"],
    prerequisites: def.prerequisites ?? [],
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
    minutes: def.minutes ?? 40,
    difficulty: def.difficulty ?? "advanced",
    tags: def.tags ?? [def.topic],
    prerequisites: def.prerequisites ?? [],
    kind: "static",
    ...def,
  };
}

const goTests = {
  zeroValues: text`
    package drill

    import "testing"

    func TestNormalizeSignup(t *testing.T) {
      got := NormalizeSignup("  NEW@Example.COM ", -4, true)
      if got.Email != "new@example.com" {
        t.Fatalf("email = %q", got.Email)
      }
      if got.Age != 0 {
        t.Fatalf("negative age should become zero, got %d", got.Age)
      }
      if !got.Newsletter {
        t.Fatal("newsletter choice was not preserved")
      }
      if got.Source != "organic" {
        t.Fatalf("source = %q, want organic", got.Source)
      }
    }
  `,
  shippingBand: text`
    package drill

    import "testing"

    func TestShippingBand(t *testing.T) {
      tests := []struct {
        name      string
        weight    int
        expedited bool
        want      string
      }{
        {"invalid", 0, false, "invalid"},
        {"letter", 50, false, "letter"},
        {"letter express", 100, true, "letter-express"},
        {"parcel", 750, false, "parcel"},
        {"freight express", 3000, true, "freight-express"},
      }
      for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) {
          if got := ShippingBand(tc.weight, tc.expedited); got != tc.want {
            t.Fatalf("got %q, want %q", got, tc.want)
          }
        })
      }
    }
  `,
  splitName: text`
    package drill

    import "testing"

    func TestSplitName(t *testing.T) {
      first, last, ok := SplitName("  Ada Lovelace  ")
      if !ok || first != "Ada" || last != "Lovelace" {
        t.Fatalf("got %q %q ok=%v", first, last, ok)
      }
      first, last, ok = SplitName("Grace Brewster Hopper")
      if !ok || first != "Grace Brewster" || last != "Hopper" {
        t.Fatalf("multi-part name got %q %q ok=%v", first, last, ok)
      }
      _, _, ok = SplitName("Prince")
      if ok {
        t.Fatal("single-token name should not parse")
      }
    }
  `,
  withdraw: text`
    package drill

    import "testing"

    func TestWithdraw(t *testing.T) {
      acct := &Account{BalanceCents: 500}
      if !Withdraw(acct, 125) {
        t.Fatal("expected withdraw to succeed")
      }
      if acct.BalanceCents != 375 {
        t.Fatalf("balance = %d", acct.BalanceCents)
      }
      if Withdraw(acct, 1000) {
        t.Fatal("overdraft should fail")
      }
      if Withdraw(nil, 10) {
        t.Fatal("nil account should fail")
      }
    }
  `,
  dedupe: text`
    package drill

    import (
      "reflect"
      "testing"
    )

    func TestDedupeStable(t *testing.T) {
      got := DedupeStable([]string{"go", "ts", "go", "react", "ts"})
      want := []string{"go", "ts", "react"}
      if !reflect.DeepEqual(got, want) {
        t.Fatalf("got %#v, want %#v", got, want)
      }
    }
  `,
  wordCount: text`
    package drill

    import "testing"

    func TestWordCount(t *testing.T) {
      got := WordCount("Go, go! React; go.")
      if got["go"] != 3 {
        t.Fatalf("go count = %d", got["go"])
      }
      if got["react"] != 1 {
        t.Fatalf("react count = %d", got["react"])
      }
    }
  `,
  order: text`
    package drill

    import "testing"

    func TestOrderTotal(t *testing.T) {
      var order Order
      order.AddItem("book", 2, 1200)
      order.AddItem("pen", 3, 150)
      if got := order.TotalCents(); got != 2850 {
        t.Fatalf("total = %d", got)
      }
      order.AddItem("ignored", 0, 999)
      if got := len(order.Items); got != 2 {
        t.Fatalf("invalid item should not be added, len=%d", got)
      }
    }
  `,
  window: text`
    package drill

    import "testing"

    func TestWindowMethods(t *testing.T) {
      w := Window{Width: 10, Height: 5}
      if got := w.Area(); got != 50 {
        t.Fatalf("area = %d", got)
      }
      w.Scale(3)
      if w.Width != 30 || w.Height != 15 {
        t.Fatalf("scaled window = %#v", w)
      }
      w.Scale(0)
      if w.Width != 30 || w.Height != 15 {
        t.Fatalf("non-positive scale should be ignored: %#v", w)
      }
    }
  `,
  slug: text`
    package drill

    import "testing"

    func TestSlugify(t *testing.T) {
      tests := map[string]string{
        "Go Modules: A Practical Start!": "go-modules-a-practical-start",
        "  React   Performance  ": "react-performance",
      }
      for input, want := range tests {
        if got := Slugify(input); got != want {
          t.Fatalf("Slugify(%q) = %q, want %q", input, got, want)
        }
      }
    }
  `,
  modulePath: text`
    package drill

    import "testing"

    func TestParseModulePath(t *testing.T) {
      host, owner, name, ok := ParseModulePath("github.com/acme/widget")
      if !ok || host != "github.com" || owner != "acme" || name != "widget" {
        t.Fatalf("got host=%q owner=%q name=%q ok=%v", host, owner, name, ok)
      }
      if _, _, _, ok := ParseModulePath("github.com/acme"); ok {
        t.Fatal("short module path should fail")
      }
    }
  `,
  parsePort: text`
    package drill

    import "testing"

    func TestParsePort(t *testing.T) {
      got, err := ParsePort("8080")
      if err != nil || got != 8080 {
        t.Fatalf("got %d err %v", got, err)
      }
      for _, input := range []string{"abc", "0", "70000"} {
        if _, err := ParsePort(input); err == nil {
          t.Fatalf("ParsePort(%q) expected error", input)
        }
      }
    }
  `,
  wrapping: text`
    package drill

    import (
      "errors"
      "testing"
    )

    func TestLoadUserWrapsNotFound(t *testing.T) {
      _, err := LoadUser(map[string]string{"1": "Ada"}, "2")
      if !errors.Is(err, ErrUserNotFound) {
        t.Fatalf("error %v should wrap ErrUserNotFound", err)
      }
      got, err := LoadUser(map[string]string{"1": "Ada"}, "1")
      if err != nil || got != "Ada" {
        t.Fatalf("got %q err %v", got, err)
      }
    }
  `,
  queue: text`
    package drill

    import (
      "errors"
      "testing"
    )

    func TestQueuePop(t *testing.T) {
      var q Queue
      if _, err := q.Pop(); !errors.Is(err, ErrEmpty) {
        t.Fatalf("empty pop error = %v", err)
      }
      q.Push("first")
      q.Push("second")
      got, err := q.Pop()
      if err != nil || got != "first" {
        t.Fatalf("got %q err %v", got, err)
      }
    }
  `,
  validation: text`
    package drill

    import (
      "errors"
      "testing"
    )

    func TestValidateUsername(t *testing.T) {
      var ve *ValidationError
      if err := ValidateUsername("ab"); !errors.As(err, &ve) || ve.Field != "username" {
        t.Fatalf("expected username validation error, got %v", err)
      }
      if err := ValidateUsername("ada_lovelace"); err != nil {
        t.Fatalf("valid username got error %v", err)
      }
    }
  `,
  deferCleanup: text`
    package drill

    import (
      "errors"
      "testing"
    )

    func TestUseResourceClosesOnError(t *testing.T) {
      res := &Resource{}
      workErr := errors.New("work failed")
      err := UseResource(func() (*Resource, error) {
        return res, nil
      }, func(*Resource) error {
        return workErr
      })
      if !errors.Is(err, workErr) {
        t.Fatalf("got error %v", err)
      }
      if !res.Closed {
        t.Fatal("resource was not closed")
      }
    }
  `,
  limitedReader: text`
    package drill

    import (
      "strings"
      "testing"
    )

    func TestReadAllLimited(t *testing.T) {
      got, err := ReadAllLimited(strings.NewReader("hello"), 10)
      if err != nil || got != "hello" {
        t.Fatalf("got %q err %v", got, err)
      }
      if _, err := ReadAllLimited(strings.NewReader("toolong"), 3); err == nil {
        t.Fatal("expected limit error")
      }
    }
  `,
  auditStore: text`
    package drill

    import "testing"

    type fakeStore struct{ saved []string }
    func (f *fakeStore) Save(value string) error { f.saved = append(f.saved, value); return nil }

    type fakeLogger struct{ lines []string }
    func (f *fakeLogger) Log(line string) { f.lines = append(f.lines, line) }

    func TestAuditStore(t *testing.T) {
      store := &fakeStore{}
      logger := &fakeLogger{}
      audit := AuditStore{Store: store, Logger: logger}
      if err := audit.Save("order-1"); err != nil {
        t.Fatalf("save failed: %v", err)
      }
      if len(store.saved) != 1 || store.saved[0] != "order-1" {
        t.Fatalf("store not called: %#v", store.saved)
      }
      if len(logger.lines) != 1 || logger.lines[0] != "saved: order-1" {
        t.Fatalf("logger not called: %#v", logger.lines)
      }
    }
  `,
  welcome: text`
    package drill

    import "testing"

    type senderSpy struct{ to []string }
    func (s *senderSpy) Send(to, body string) error { s.to = append(s.to, to); return nil }

    func TestWelcomeService(t *testing.T) {
      spy := &senderSpy{}
      svc := WelcomeService{Sender: spy}
      if err := svc.Welcome("ada@example.com"); err != nil {
        t.Fatalf("welcome failed: %v", err)
      }
      if len(spy.to) != 1 || spy.to[0] != "ada@example.com" {
        t.Fatalf("send calls = %#v", spy.to)
      }
      if err := svc.Welcome("not-email"); err == nil {
        t.Fatal("invalid email should fail")
      }
    }
  `,
  clamp: text`
    package drill

    import "testing"

    func TestClamp(t *testing.T) {
      tests := []struct {
        name string
        value, min, max int
        want int
      }{
        {"inside", 5, 1, 10, 5},
        {"low", -1, 0, 10, 0},
        {"high", 99, 0, 10, 10},
        {"swapped", 5, 10, 0, 5},
      }
      for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) {
          if got := Clamp(tc.value, tc.min, tc.max); got != tc.want {
            t.Fatalf("got %d, want %d", got, tc.want)
          }
        })
      }
    }
  `,
  csv: text`
    package drill

    import (
      "reflect"
      "testing"
    )

    func TestParseCSVLine(t *testing.T) {
      tests := []struct {
        name string
        input string
        want []string
      }{
        {"plain", "a,b,c", []string{"a", "b", "c"}},
        {"quoted comma", "a,\\"b,c\\",d", []string{"a", "b,c", "d"}},
      }
      for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) {
          if got := ParseCSVLine(tc.input); !reflect.DeepEqual(got, tc.want) {
            t.Fatalf("got %#v, want %#v", got, tc.want)
          }
        })
      }
    }
  `,
  tags: text`
    package drill

    import (
      "reflect"
      "testing"
    )

    func TestNormalizeTags(t *testing.T) {
      got := NormalizeTags([]string{" Go ", "react", "GO", "", "React"})
      want := []string{"go", "react"}
      if !reflect.DeepEqual(got, want) {
        t.Fatalf("got %#v, want %#v", got, want)
      }
    }
  `,
  receipt: text`
    package drill

    import (
      "os"
      "testing"
    )

    func TestRenderReceiptGolden(t *testing.T) {
      got := RenderReceipt([]LineItem{{Name: "Book", Qty: 2, PriceCents: 1200}, {Name: "Pen", Qty: 1, PriceCents: 150}})
      wantBytes, err := os.ReadFile("testdata/receipt.golden")
      if err != nil {
        t.Fatal(err)
      }
      if got != string(wantBytes) {
        t.Fatalf("receipt mismatch\\nGOT:\\n%s\\nWANT:\\n%s", got, string(wantBytes))
      }
    }
  `,
  concat: text`
    package drill

    import "testing"

    func TestConcatLabels(t *testing.T) {
      if got := ConcatLabels([]string{"api", "web", "db"}); got != "api,web,db" {
        t.Fatalf("got %q", got)
      }
    }

    func BenchmarkConcatLabels(b *testing.B) {
      labels := []string{"api", "web", "db", "worker", "cache"}
      for i := 0; i < b.N; i++ {
        _ = ConcatLabels(labels)
      }
    }
  `,
  keyValue: text`
    package drill

    import "testing"

    func TestParseKeyValue(t *testing.T) {
      key, value, ok := ParseKeyValue("mode=debug")
      if !ok || key != "mode" || value != "debug" {
        t.Fatalf("got %q %q ok=%v", key, value, ok)
      }
      if _, _, ok := ParseKeyValue("missing"); ok {
        t.Fatal("missing equals should fail")
      }
    }

    func FuzzParseKeyValue(f *testing.F) {
      f.Add("a=b")
      f.Fuzz(func(t *testing.T, input string) {
        key, _, ok := ParseKeyValue(input)
        if ok && key == "" {
          t.Fatalf("empty key accepted for %q", input)
        }
      })
    }
  `,
  safeCounter: text`
    package drill

    import (
      "sync"
      "testing"
    )

    func TestSafeCounterConcurrent(t *testing.T) {
      var c SafeCounter
      var wg sync.WaitGroup
      for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
          defer wg.Done()
          c.Inc()
        }()
      }
      wg.Wait()
      if got := c.Value(); got != 100 {
        t.Fatalf("value = %d", got)
      }
    }
  `,
  clock: text`
    package drill

    import (
      "testing"
      "time"
    )

    func TestIsExpired(t *testing.T) {
      now := time.Date(2026, 1, 1, 12, 0, 0, 0, time.UTC)
      if !IsExpired(func() time.Time { return now }, now.Add(-time.Second)) {
        t.Fatal("past deadline should be expired")
      }
      if IsExpired(func() time.Time { return now }, now.Add(time.Second)) {
        t.Fatal("future deadline should not be expired")
      }
    }
  `,
  parallelSum: text`
    package drill

    import "testing"

    func TestParallelSum(t *testing.T) {
      got := ParallelSum([]int{1, 2, 3, 4, 5, 6}, 3)
      if got != 21 {
        t.Fatalf("sum = %d", got)
      }
      if got := ParallelSum([]int{1, 2}, 0); got != 3 {
        t.Fatalf("zero workers should still work, got %d", got)
      }
    }
  `,
  fanIn: text`
    package drill

    import (
      "sort"
      "testing"
      "time"
    )

    func TestFanIn(t *testing.T) {
      a := make(chan int, 2)
      b := make(chan int, 2)
      a <- 1; a <- 3; close(a)
      b <- 2; b <- 4; close(b)
      out := FanIn(a, b)
      var got []int
      for v := range out {
        got = append(got, v)
      }
      sort.Ints(got)
      if len(got) != 4 || got[0] != 1 || got[3] != 4 {
        t.Fatalf("got %#v", got)
      }
      select {
      case _, ok := <-out:
        if ok { t.Fatal("output should be closed") }
      case <-time.After(time.Second):
        t.Fatal("fan-in did not close")
      }
    }
  `,
  waitString: text`
    package drill

    import (
      "testing"
      "time"
    )

    func TestWaitForString(t *testing.T) {
      ch := make(chan string, 1)
      ch <- "ready"
      got, ok := WaitForString(ch, time.Second)
      if !ok || got != "ready" {
        t.Fatalf("got %q ok=%v", got, ok)
      }
      _, ok = WaitForString(make(chan string), 10*time.Millisecond)
      if ok {
        t.Fatal("timeout should return ok=false")
      }
    }
  `,
  workerPool: text`
    package drill

    import (
      "reflect"
      "testing"
    )

    func TestProcessJobs(t *testing.T) {
      got := ProcessJobs([]int{1, 2, 3, 4}, 2, func(v int) int { return v * v })
      want := []int{1, 4, 9, 16}
      if !reflect.DeepEqual(got, want) {
        t.Fatalf("got %#v, want %#v", got, want)
      }
    }
  `,
  stream: text`
    package drill

    import (
      "context"
      "testing"
      "time"
    )

    func TestStreamNumbersStopsOnCancel(t *testing.T) {
      ctx, cancel := context.WithCancel(context.Background())
      out := StreamNumbers(ctx, 100)
      if <-out != 0 || <-out != 1 {
        t.Fatal("stream did not start at zero")
      }
      cancel()
      select {
      case _, ok := <-out:
        if ok {
          t.Fatal("stream should close after cancellation")
        }
      case <-time.After(time.Second):
        t.Fatal("stream did not close")
      }
    }
  `,
  fetch: text`
    package drill

    import (
      "context"
      "errors"
      "testing"
      "time"
    )

    func TestFetchWithContext(t *testing.T) {
      ctx, cancel := context.WithTimeout(context.Background(), 10*time.Millisecond)
      defer cancel()
      _, err := FetchWithContext(ctx, func() (string, error) {
        time.Sleep(50 * time.Millisecond)
        return "late", nil
      })
      if !errors.Is(err, context.DeadlineExceeded) {
        t.Fatalf("expected deadline, got %v", err)
      }
    }
  `,
  cache: text`
    package drill

    import "testing"

    func TestCacheGet(t *testing.T) {
      c := NewCache()
      calls := 0
      got := c.Get("a", func() string { calls++; return "one" })
      got = c.Get("a", func() string { calls++; return "two" })
      if got != "one" || calls != 1 {
        t.Fatalf("got %q calls=%d", got, calls)
      }
    }
  `,
  atomicCounter: text`
    package drill

    import (
      "sync"
      "testing"
    )

    func TestAtomicCounter(t *testing.T) {
      var c AtomicCounter
      var wg sync.WaitGroup
      for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
          defer wg.Done()
          c.Inc()
        }()
      }
      wg.Wait()
      if got := c.Value(); got != 100 {
        t.Fatalf("value = %d", got)
      }
    }
  `,
  decodeUser: text`
    package drill

    import (
      "strings"
      "testing"
    )

    func TestDecodeUser(t *testing.T) {
      got, err := DecodeUser(strings.NewReader(` + "`" + `{"name":"Ada","age":36}` + "`" + `))
      if err != nil || got.Name != "Ada" || got.Age != 36 {
        t.Fatalf("got %#v err %v", got, err)
      }
      if _, err := DecodeUser(strings.NewReader(` + "`" + `{"name":"Ada","age":36,"extra":true}` + "`" + `)); err == nil {
        t.Fatal("unknown fields should fail")
      }
    }
  `,
  greetHandler: text`
    package drill

    import (
      "net/http"
      "net/http/httptest"
      "testing"
    )

    func TestGreetHandler(t *testing.T) {
      req := httptest.NewRequest(http.MethodGet, "/?name=Ada", nil)
      rec := httptest.NewRecorder()
      GreetHandler(rec, req)
      if rec.Code != http.StatusOK {
        t.Fatalf("status = %d", rec.Code)
      }
      if rec.Body.String() != "hello Ada\\n" {
        t.Fatalf("body = %q", rec.Body.String())
      }
    }
  `,
  middleware: text`
    package drill

    import (
      "net/http"
      "net/http/httptest"
      "testing"
    )

    func TestWithHeader(t *testing.T) {
      next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusNoContent)
      })
      rec := httptest.NewRecorder()
      WithHeader(next, "X-Trace", "abc").ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/", nil))
      if rec.Header().Get("X-Trace") != "abc" {
        t.Fatalf("missing header: %#v", rec.Header())
      }
      if rec.Code != http.StatusNoContent {
        t.Fatalf("status = %d", rec.Code)
      }
    }
  `,
  flags: text`
    package drill

    import "testing"

    func TestParseOptions(t *testing.T) {
      got, err := ParseOptions([]string{"-port", "9090", "-env", "prod", "-debug"})
      if err != nil {
        t.Fatal(err)
      }
      if got.Port != 9090 || got.Env != "prod" || !got.Debug {
        t.Fatalf("got %#v", got)
      }
    }
  `,
  fileConfig: text`
    package drill

    import (
      "os"
      "path/filepath"
      "testing"
    )

    func TestReadConfig(t *testing.T) {
      path := filepath.Join(t.TempDir(), "app.env")
      if err := os.WriteFile(path, []byte("PORT=8080\\n# comment\\nENV=dev\\n"), 0644); err != nil {
        t.Fatal(err)
      }
      got, err := ReadConfig(path)
      if err != nil {
        t.Fatal(err)
      }
      if got["PORT"] != "8080" || got["ENV"] != "dev" {
        t.Fatalf("got %#v", got)
      }
    }
  `,
  set: text`
    package drill

    import "testing"

    func TestSet(t *testing.T) {
      s := NewSet[string]()
      s.Add("go")
      s.Add("go")
      s.Add("react")
      if !s.Has("go") || s.Len() != 2 {
        t.Fatalf("set failed: %#v", s)
      }
      s.Delete("go")
      if s.Has("go") {
        t.Fatal("delete failed")
      }
    }
  `,
  mapFilter: text`
    package drill

    import (
      "reflect"
      "testing"
    )

    func TestMapFilter(t *testing.T) {
      evens := FilterSlice([]int{1, 2, 3, 4}, func(v int) bool { return v%2 == 0 })
      labels := MapSlice(evens, func(v int) string { return "n" + string(rune('0'+v)) })
      if !reflect.DeepEqual(labels, []string{"n2", "n4"}) {
        t.Fatalf("got %#v", labels)
      }
    }
  `,
  registration: text`
    package drill

    import "testing"

    type memoryRepo struct{ users map[string]User }
    func (m *memoryRepo) FindByEmail(email string) (User, bool) { u, ok := m.users[email]; return u, ok }
    func (m *memoryRepo) Save(user User) error { m.users[user.Email] = user; return nil }

    func TestRegistrationService(t *testing.T) {
      repo := &memoryRepo{users: map[string]User{}}
      svc := RegistrationService{Repo: repo}
      user, err := svc.Register("  ADA@EXAMPLE.COM ")
      if err != nil {
        t.Fatal(err)
      }
      if user.Email != "ada@example.com" {
        t.Fatalf("email = %q", user.Email)
      }
      if _, err := svc.Register("ada@example.com"); err == nil {
        t.Fatal("duplicate registration should fail")
      }
    }
  `,
  buildIndex: text`
    package drill

    import (
      "reflect"
      "testing"
    )

    func TestBuildIndex(t *testing.T) {
      got := BuildIndex([]string{"Go go react", "React testing"})
      if !reflect.DeepEqual(got["go"], []int{0}) {
        t.Fatalf("go index = %#v", got["go"])
      }
      if !reflect.DeepEqual(got["react"], []int{0, 1}) {
        t.Fatalf("react index = %#v", got["react"])
      }
    }

    func BenchmarkBuildIndex(b *testing.B) {
      docs := []string{"Go services use tests", "React apps use tests", "Go and React share APIs"}
      for i := 0; i < b.N; i++ {
        _ = BuildIndex(docs)
      }
    }
  `,
};

const goExercises = [
  goExercise({
    id: "go/foundation/001-zero-values",
    title: "Zero Values and Normalized Structs",
    track: "go",
    topic: "foundation",
    focus: "zero values, explicit initialization, and basic string normalization in Go",
    task: "Implement `NormalizeSignup` so it trims and lowercases email, clamps negative ages to zero, preserves the newsletter flag, and sets the default source to `organic`.",
    objectives: ["Recognize useful zero values", "Initialize a struct intentionally", "Normalize small pieces of input"],
    tags: ["go", "foundation", "structs", "zero-values"],
    starter: text`
      package drill

      type Signup struct {
        Email      string
        Age        int
        Newsletter bool
        Source     string
      }

      func NormalizeSignup(email string, age int, wantsNewsletter bool) Signup {
        // TODO: normalize the input and return a populated Signup.
        return Signup{}
      }
    `,
    solution: text`
      package drill

      import "strings"

      type Signup struct {
        Email      string
        Age        int
        Newsletter bool
        Source     string
      }

      func NormalizeSignup(email string, age int, wantsNewsletter bool) Signup {
        if age < 0 {
          age = 0
        }
        return Signup{
          Email: strings.ToLower(strings.TrimSpace(email)),
          Age: age,
          Newsletter: wantsNewsletter,
          Source: "organic",
        }
      }
    `,
    test: goTests.zeroValues,
  }),
  goExercise({
    id: "go/foundation/002-control-flow",
    title: "Control Flow for Shipping Bands",
    track: "go",
    topic: "foundation",
    focus: "if statements, boundary checks, and table-driven branching rules",
    task: "Implement `ShippingBand`. Non-positive weights are invalid. Up to 100 grams is `letter`, up to 1000 is `parcel`, and anything larger is `freight`. Append `-express` when expedited is true.",
    objectives: ["Practice ordered conditionals", "Handle boundary values", "Keep branching readable"],
    tags: ["go", "foundation", "control-flow"],
    starter: text`
      package drill

      func ShippingBand(weightGrams int, expedited bool) string {
        // TODO: classify the shipment.
        return ""
      }
    `,
    solution: text`
      package drill

      func ShippingBand(weightGrams int, expedited bool) string {
        if weightGrams <= 0 {
          return "invalid"
        }
        band := "freight"
        if weightGrams <= 100 {
          band = "letter"
        } else if weightGrams <= 1000 {
          band = "parcel"
        }
        if expedited {
          return band + "-express"
        }
        return band
      }
    `,
    test: goTests.shippingBand,
  }),
  goExercise({
    id: "go/foundation/003-functions-multiple-returns",
    title: "Multiple Return Values",
    track: "go",
    topic: "foundation",
    focus: "multiple return values and named results for small parsing functions",
    task: "Implement `SplitName`. Trim whitespace, require at least two words, return all words except the last as the first name, and return the last word as the last name.",
    objectives: ["Use multiple return values", "Return an explicit success boolean", "Handle whitespace with standard library helpers"],
    tags: ["go", "foundation", "functions"],
    starter: text`
      package drill

      func SplitName(full string) (first string, last string, ok bool) {
        // TODO: split a full name into first and last parts.
        return "", "", false
      }
    `,
    solution: text`
      package drill

      import "strings"

      func SplitName(full string) (first string, last string, ok bool) {
        parts := strings.Fields(full)
        if len(parts) < 2 {
          return "", "", false
        }
        return strings.Join(parts[:len(parts)-1], " "), parts[len(parts)-1], true
      }
    `,
    test: goTests.splitName,
  }),
  goExercise({
    id: "go/foundation/004-pointers-mutation",
    title: "Pointers and Intentional Mutation",
    track: "go",
    topic: "foundation",
    focus: "pointer receivers, nil checks, and explicit mutation of shared state",
    task: "Implement `Withdraw`. It should reject nil accounts, non-positive amounts, and overdrafts. On success it mutates the account balance and returns true.",
    objectives: ["Use pointers for mutation", "Protect nil inputs", "Separate validation from state changes"],
    tags: ["go", "foundation", "pointers"],
    starter: text`
      package drill

      type Account struct {
        BalanceCents int
      }

      func Withdraw(account *Account, amountCents int) bool {
        // TODO: validate and mutate the account.
        return false
      }
    `,
    solution: text`
      package drill

      type Account struct {
        BalanceCents int
      }

      func Withdraw(account *Account, amountCents int) bool {
        if account == nil || amountCents <= 0 || account.BalanceCents < amountCents {
          return false
        }
        account.BalanceCents -= amountCents
        return true
      }
    `,
    test: goTests.withdraw,
  }),
  goExercise({
    id: "go/foundation/005-slices-dedupe",
    title: "Slices and Stable De-Duplication",
    track: "go",
    topic: "foundation",
    focus: "slice growth, append, and preserving order while filtering data",
    task: "Implement `DedupeStable` so it returns a new slice containing each string only once, preserving the first occurrence order.",
    objectives: ["Build a result slice with append", "Use a map as a seen set", "Preserve stable ordering"],
    tags: ["go", "foundation", "slices", "maps"],
    starter: text`
      package drill

      func DedupeStable(values []string) []string {
        // TODO: return unique values in first-seen order.
        return nil
      }
    `,
    solution: text`
      package drill

      func DedupeStable(values []string) []string {
        seen := map[string]bool{}
        out := make([]string, 0, len(values))
        for _, value := range values {
          if seen[value] {
            continue
          }
          seen[value] = true
          out = append(out, value)
        }
        return out
      }
    `,
    test: goTests.dedupe,
  }),
  goExercise({
    id: "go/foundation/006-maps-word-count",
    title: "Maps for Word Counts",
    track: "go",
    topic: "foundation",
    focus: "map initialization, normalization, and counting with Go's zero value",
    task: "Implement `WordCount`. Split on whitespace, lowercase words, trim common punctuation, and count each non-empty word.",
    objectives: ["Use map zero values for counters", "Normalize strings before counting", "Skip empty tokens"],
    tags: ["go", "foundation", "maps", "strings"],
    starter: text`
      package drill

      func WordCount(text string) map[string]int {
        // TODO: count normalized words.
        return nil
      }
    `,
    solution: text`
      package drill

      import "strings"

      func WordCount(text string) map[string]int {
        counts := map[string]int{}
        for _, raw := range strings.Fields(text) {
          word := strings.Trim(strings.ToLower(raw), ".,!?;:\\"'()[]{}")
          if word == "" {
            continue
          }
          counts[word]++
        }
        return counts
      }
    `,
    test: goTests.wordCount,
  }),
  goExercise({
    id: "go/foundation/007-structs-order-total",
    title: "Structs for Small Domain Models",
    track: "go",
    topic: "foundation",
    focus: "struct fields, slices of structs, and simple domain methods",
    task: "Implement `AddItem` and `TotalCents`. Invalid quantities or prices should not be added. Total should multiply quantity by price for every item.",
    objectives: ["Model data with structs", "Attach behavior to domain types", "Reject invalid state at boundaries"],
    tags: ["go", "foundation", "structs", "methods"],
    starter: text`
      package drill

      type LineItem struct {
        Name       string
        Qty        int
        PriceCents int
      }

      type Order struct {
        Items []LineItem
      }

      func (o *Order) AddItem(name string, qty int, priceCents int) {
        // TODO: append valid items.
      }

      func (o Order) TotalCents() int {
        // TODO: calculate the total.
        return 0
      }
    `,
    solution: text`
      package drill

      type LineItem struct {
        Name       string
        Qty        int
        PriceCents int
      }

      type Order struct {
        Items []LineItem
      }

      func (o *Order) AddItem(name string, qty int, priceCents int) {
        if qty <= 0 || priceCents < 0 {
          return
        }
        o.Items = append(o.Items, LineItem{Name: name, Qty: qty, PriceCents: priceCents})
      }

      func (o Order) TotalCents() int {
        total := 0
        for _, item := range o.Items {
          total += item.Qty * item.PriceCents
        }
        return total
      }
    `,
    test: goTests.order,
  }),
  goExercise({
    id: "go/foundation/008-methods-receivers",
    title: "Methods and Receivers",
    track: "go",
    topic: "foundation",
    focus: "value receivers, pointer receivers, and choosing mutation deliberately",
    task: "Implement `Area` with a value receiver and `Scale` with a pointer receiver. Ignore non-positive scale factors.",
    objectives: ["Choose value versus pointer receivers", "Keep mutation explicit", "Protect invalid inputs"],
    tags: ["go", "foundation", "methods"],
    starter: text`
      package drill

      type Window struct {
        Width  int
        Height int
      }

      func (w Window) Area() int {
        // TODO: calculate area.
        return 0
      }

      func (w *Window) Scale(factor int) {
        // TODO: mutate width and height for positive factors.
      }
    `,
    solution: text`
      package drill

      type Window struct {
        Width  int
        Height int
      }

      func (w Window) Area() int {
        return w.Width * w.Height
      }

      func (w *Window) Scale(factor int) {
        if factor <= 0 {
          return
        }
        w.Width *= factor
        w.Height *= factor
      }
    `,
    test: goTests.window,
  }),
  goExercise({
    id: "go/foundation/009-package-api-slugify",
    title: "Small Package API: Slugify",
    track: "go",
    topic: "foundation",
    focus: "exported function names, package-level API shape, and string scanning",
    task: "Implement `Slugify`. Lowercase letters and digits are kept, whitespace and punctuation become single hyphens, and leading or trailing hyphens are removed.",
    objectives: ["Write a small exported API", "Keep package behavior deterministic", "Handle repeated separators"],
    tags: ["go", "foundation", "packages", "strings"],
    starter: text`
      package drill

      func Slugify(title string) string {
        // TODO: convert a title into a URL slug.
        return ""
      }
    `,
    solution: text`
      package drill

      import (
        "strings"
        "unicode"
      )

      func Slugify(title string) string {
        var b strings.Builder
        lastDash := false
        for _, r := range strings.ToLower(title) {
          if unicode.IsLetter(r) || unicode.IsDigit(r) {
            b.WriteRune(r)
            lastDash = false
            continue
          }
          if !lastDash && b.Len() > 0 {
            b.WriteByte('-')
            lastDash = true
          }
        }
        return strings.Trim(b.String(), "-")
      }
    `,
    test: goTests.slug,
  }),
  goExercise({
    id: "go/foundation/010-module-paths",
    title: "Module Path Parsing",
    track: "go",
    topic: "foundation",
    focus: "module path conventions and defensive string parsing",
    task: "Implement `ParseModulePath` for paths shaped like `host/owner/name`. Return ok=false when fewer than three path segments are present.",
    objectives: ["Reason about module path components", "Return structured parse results", "Reject malformed input"],
    tags: ["go", "foundation", "modules", "packages"],
    starter: text`
      package drill

      func ParseModulePath(modulePath string) (host string, owner string, name string, ok bool) {
        // TODO: parse host/owner/name module paths.
        return "", "", "", false
      }
    `,
    solution: text`
      package drill

      import "strings"

      func ParseModulePath(modulePath string) (host string, owner string, name string, ok bool) {
        parts := strings.Split(modulePath, "/")
        if len(parts) < 3 || parts[0] == "" || parts[1] == "" || parts[2] == "" {
          return "", "", "", false
        }
        return parts[0], parts[1], parts[2], true
      }
    `,
    test: goTests.modulePath,
  }),
  goExercise({
    id: "go/idioms/001-error-handling-parse-port",
    title: "Explicit Error Handling",
    track: "go",
    topic: "idioms",
    focus: "returning errors instead of panicking and validating parsed input",
    task: "Implement `ParsePort`. Convert a decimal string to an int and return an error when parsing fails or the port is outside 1..65535.",
    objectives: ["Return errors explicitly", "Validate after parsing", "Avoid panics for user input"],
    tags: ["go", "idioms", "errors"],
    difficulty: "beginner+",
    starter: text`
      package drill

      func ParsePort(raw string) (int, error) {
        // TODO: parse and validate a TCP port.
        return 0, nil
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "strconv"
      )

      func ParsePort(raw string) (int, error) {
        port, err := strconv.Atoi(raw)
        if err != nil {
          return 0, fmt.Errorf("parse port %q: %w", raw, err)
        }
        if port < 1 || port > 65535 {
          return 0, fmt.Errorf("port %d out of range", port)
        }
        return port, nil
      }
    `,
    test: goTests.parsePort,
  }),
  goExercise({
    id: "go/idioms/002-error-wrapping",
    title: "Wrapping Sentinel Errors",
    track: "go",
    topic: "idioms",
    focus: "sentinel errors, wrapping with context, and errors.Is checks",
    task: "Implement `LoadUser`. Return the user name when found. Missing IDs should return an error that wraps `ErrUserNotFound` and includes the missing ID.",
    objectives: ["Use sentinel errors intentionally", "Wrap errors with `%w`", "Keep caller checks possible"],
    tags: ["go", "idioms", "errors", "wrapping"],
    difficulty: "beginner+",
    starter: text`
      package drill

      import "errors"

      var ErrUserNotFound = errors.New("user not found")

      func LoadUser(users map[string]string, id string) (string, error) {
        // TODO: load the user or wrap ErrUserNotFound.
        return "", nil
      }
    `,
    solution: text`
      package drill

      import (
        "errors"
        "fmt"
      )

      var ErrUserNotFound = errors.New("user not found")

      func LoadUser(users map[string]string, id string) (string, error) {
        name, ok := users[id]
        if !ok {
          return "", fmt.Errorf("load user %s: %w", id, ErrUserNotFound)
        }
        return name, nil
      }
    `,
    test: goTests.wrapping,
  }),
  goExercise({
    id: "go/idioms/003-sentinel-errors-queue",
    title: "Sentinel Errors in a Queue",
    track: "go",
    topic: "idioms",
    focus: "sentinel errors and small stateful types with predictable behavior",
    task: "Implement `Push` and `Pop`. `Pop` should remove the oldest item or return `ErrEmpty` when the queue is empty.",
    objectives: ["Define sentinel errors", "Use slices as queues", "Preserve FIFO ordering"],
    tags: ["go", "idioms", "errors", "slices"],
    difficulty: "beginner+",
    starter: text`
      package drill

      import "errors"

      var ErrEmpty = errors.New("queue is empty")

      type Queue struct {
        items []string
      }

      func (q *Queue) Push(value string) {
        // TODO: append to the queue.
      }

      func (q *Queue) Pop() (string, error) {
        // TODO: pop FIFO or return ErrEmpty.
        return "", nil
      }
    `,
    solution: text`
      package drill

      import "errors"

      var ErrEmpty = errors.New("queue is empty")

      type Queue struct {
        items []string
      }

      func (q *Queue) Push(value string) {
        q.items = append(q.items, value)
      }

      func (q *Queue) Pop() (string, error) {
        if len(q.items) == 0 {
          return "", ErrEmpty
        }
        value := q.items[0]
        q.items = q.items[1:]
        return value, nil
      }
    `,
    test: goTests.queue,
  }),
  goExercise({
    id: "go/idioms/004-custom-error-types",
    title: "Custom Error Types",
    track: "go",
    topic: "idioms",
    focus: "custom error structs and errors.As for structured failure details",
    task: "Implement `ValidationError.Error` and `ValidateUsername`. Usernames must be at least three characters and contain only letters, digits, or underscores.",
    objectives: ["Create a structured error type", "Use errors.As-friendly values", "Validate strings without overengineering"],
    tags: ["go", "idioms", "errors", "validation"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type ValidationError struct {
        Field  string
        Reason string
      }

      func (e *ValidationError) Error() string {
        // TODO: include field and reason.
        return ""
      }

      func ValidateUsername(username string) error {
        // TODO: validate username and return *ValidationError on failure.
        return nil
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "unicode"
      )

      type ValidationError struct {
        Field  string
        Reason string
      }

      func (e *ValidationError) Error() string {
        return fmt.Sprintf("%s: %s", e.Field, e.Reason)
      }

      func ValidateUsername(username string) error {
        if len(username) < 3 {
          return &ValidationError{Field: "username", Reason: "must be at least 3 characters"}
        }
        for _, r := range username {
          if !(unicode.IsLetter(r) || unicode.IsDigit(r) || r == '_') {
            return &ValidationError{Field: "username", Reason: "contains invalid character"}
          }
        }
        return nil
      }
    `,
    test: goTests.validation,
  }),
  goExercise({
    id: "go/idioms/005-defer-cleanup",
    title: "Defer for Cleanup",
    track: "go",
    topic: "idioms",
    focus: "defer, cleanup guarantees, and returning the original work error",
    task: "Implement `UseResource`. Open a resource, defer its close once open succeeds, run work, and return the work error if one occurs.",
    objectives: ["Use defer for cleanup", "Avoid leaking resources on errors", "Preserve the most relevant error"],
    tags: ["go", "idioms", "defer", "cleanup"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type Resource struct {
        Closed bool
      }

      func (r *Resource) Close() error {
        r.Closed = true
        return nil
      }

      func UseResource(open func() (*Resource, error), work func(*Resource) error) error {
        // TODO: open, defer close, then run work.
        res, err := open()
        if err != nil {
          return err
        }
        return work(res)
      }
    `,
    solution: text`
      package drill

      type Resource struct {
        Closed bool
      }

      func (r *Resource) Close() error {
        r.Closed = true
        return nil
      }

      func UseResource(open func() (*Resource, error), work func(*Resource) error) error {
        res, err := open()
        if err != nil {
          return err
        }
        defer res.Close()
        return work(res)
      }
    `,
    test: goTests.deferCleanup,
  }),
  goExercise({
    id: "go/idioms/006-small-interfaces-reader",
    title: "Small Interfaces with io.Reader",
    track: "go",
    topic: "idioms",
    focus: "accepting small standard-library interfaces instead of concrete types",
    task: "Implement `ReadAllLimited`. Read from any `io.Reader`, return the content as a string, and return an error if more than limit bytes are available.",
    objectives: ["Depend on behavior, not concrete types", "Use io.Reader effectively", "Protect memory with explicit limits"],
    tags: ["go", "idioms", "interfaces", "io"],
    difficulty: "intermediate",
    starter: text`
      package drill

      import "io"

      func ReadAllLimited(r io.Reader, limit int) (string, error) {
        // TODO: read up to limit bytes and fail if input is too large.
        return "", nil
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "io"
      )

      func ReadAllLimited(r io.Reader, limit int) (string, error) {
        if limit < 0 {
          return "", fmt.Errorf("limit must be non-negative")
        }
        data, err := io.ReadAll(io.LimitReader(r, int64(limit)+1))
        if err != nil {
          return "", err
        }
        if len(data) > limit {
          return "", fmt.Errorf("input exceeds %d bytes", limit)
        }
        return string(data), nil
      }
    `,
    test: goTests.limitedReader,
  }),
  goExercise({
    id: "go/idioms/007-composition-audit-store",
    title: "Composition over Frameworks",
    track: "go",
    topic: "idioms",
    focus: "composing small interfaces to add behavior without inheritance",
    task: "Implement `AuditStore.Save`. It should save through the composed store, then log `saved: <value>` only after a successful save.",
    objectives: ["Compose small interfaces", "Add cross-cutting behavior directly", "Avoid framework-style dependency containers"],
    tags: ["go", "idioms", "composition", "interfaces"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type Store interface {
        Save(value string) error
      }

      type Logger interface {
        Log(line string)
      }

      type AuditStore struct {
        Store  Store
        Logger Logger
      }

      func (a AuditStore) Save(value string) error {
        // TODO: save and log after success.
        return a.Store.Save(value)
      }
    `,
    solution: text`
      package drill

      type Store interface {
        Save(value string) error
      }

      type Logger interface {
        Log(line string)
      }

      type AuditStore struct {
        Store  Store
        Logger Logger
      }

      func (a AuditStore) Save(value string) error {
        if err := a.Store.Save(value); err != nil {
          return err
        }
        if a.Logger != nil {
          a.Logger.Log("saved: " + value)
        }
        return nil
      }
    `,
    test: goTests.auditStore,
  }),
  goExercise({
    id: "go/idioms/008-dependency-injection-service",
    title: "Dependency Injection without a Framework",
    track: "go",
    topic: "idioms",
    focus: "constructor-free dependency injection with small interfaces and plain structs",
    task: "Implement `Welcome`. Validate that the email contains `@`, then use the injected sender to send a welcome message.",
    objectives: ["Inject behavior through interfaces", "Keep services testable", "Validate before side effects"],
    tags: ["go", "idioms", "dependency-injection", "interfaces"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type Sender interface {
        Send(to, body string) error
      }

      type WelcomeService struct {
        Sender Sender
      }

      func (s WelcomeService) Welcome(email string) error {
        // TODO: validate and send a welcome message.
        return nil
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "strings"
      )

      type Sender interface {
        Send(to, body string) error
      }

      type WelcomeService struct {
        Sender Sender
      }

      func (s WelcomeService) Welcome(email string) error {
        if !strings.Contains(email, "@") {
          return fmt.Errorf("invalid email")
        }
        return s.Sender.Send(email, "welcome")
      }
    `,
    test: goTests.welcome,
  }),
  goExercise({
    id: "go/testing/001-table-driven-clamp",
    title: "Table-Driven Tests",
    track: "go",
    topic: "testing",
    focus: "table-driven tests and simple edge-case coverage",
    task: "Implement `Clamp`. Return the value constrained to min and max. If min is greater than max, swap them before clamping.",
    objectives: ["Read table-driven tests", "Cover edge cases compactly", "Implement predictable boundary behavior"],
    tags: ["go", "testing", "table-driven"],
    difficulty: "beginner+",
    starter: text`
      package drill

      func Clamp(value, min, max int) int {
        // TODO: clamp value into the inclusive range.
        return value
      }
    `,
    solution: text`
      package drill

      func Clamp(value, min, max int) int {
        if min > max {
          min, max = max, min
        }
        if value < min {
          return min
        }
        if value > max {
          return max
        }
        return value
      }
    `,
    test: goTests.clamp,
  }),
  goExercise({
    id: "go/testing/002-subtests-csv",
    title: "Subtests for Parser Cases",
    track: "go",
    topic: "testing",
    focus: "subtests and targeted parsing behavior",
    task: "Implement `ParseCSVLine` for comma-separated values with a minimal quoted-field rule: commas inside double quotes are part of the field.",
    objectives: ["Use subtests to isolate parser cases", "Track parser state explicitly", "Return deterministic slices"],
    tags: ["go", "testing", "subtests", "parsing"],
    difficulty: "intermediate",
    starter: text`
      package drill

      func ParseCSVLine(line string) []string {
        // TODO: parse commas while respecting double quotes.
        return nil
      }
    `,
    solution: text`
      package drill

      import "strings"

      func ParseCSVLine(line string) []string {
        var out []string
        var b strings.Builder
        inQuotes := false
        for _, r := range line {
          switch r {
          case '"':
            inQuotes = !inQuotes
          case ',':
            if inQuotes {
              b.WriteRune(r)
            } else {
              out = append(out, b.String())
              b.Reset()
            }
          default:
            b.WriteRune(r)
          }
        }
        out = append(out, b.String())
        return out
      }
    `,
    test: goTests.csv,
  }),
  goExercise({
    id: "go/testing/003-test-helpers-normalize-tags",
    title: "Test Helpers and Normalized Tags",
    track: "go",
    topic: "testing",
    focus: "small pure functions that are easy to test with helper assertions",
    task: "Implement `NormalizeTags`. Trim, lowercase, drop empty tags, and remove duplicates while preserving first occurrence order.",
    objectives: ["Practice helper-friendly pure functions", "Normalize collections", "Keep output stable for assertions"],
    tags: ["go", "testing", "helpers", "slices"],
    difficulty: "beginner+",
    starter: text`
      package drill

      func NormalizeTags(tags []string) []string {
        // TODO: trim, lowercase, drop empty values, and dedupe.
        return nil
      }
    `,
    solution: text`
      package drill

      import "strings"

      func NormalizeTags(tags []string) []string {
        seen := map[string]bool{}
        out := []string{}
        for _, tag := range tags {
          tag = strings.ToLower(strings.TrimSpace(tag))
          if tag == "" || seen[tag] {
            continue
          }
          seen[tag] = true
          out = append(out, tag)
        }
        return out
      }
    `,
    test: goTests.tags,
  }),
  goExercise({
    id: "go/testing/004-golden-files-receipt",
    title: "Golden File Testing",
    track: "go",
    topic: "testing",
    focus: "golden files for stable formatted output",
    task: "Implement `RenderReceipt` so it matches the golden file exactly, including line breaks and total formatting.",
    objectives: ["Use golden files for text output", "Pay attention to exact formatting", "Keep formatting code deterministic"],
    tags: ["go", "testing", "golden-files"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type LineItem struct {
        Name       string
        Qty        int
        PriceCents int
      }

      func RenderReceipt(items []LineItem) string {
        // TODO: render the receipt exactly as testdata/receipt.golden.
        return ""
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "strings"
      )

      type LineItem struct {
        Name       string
        Qty        int
        PriceCents int
      }

      func RenderReceipt(items []LineItem) string {
        var b strings.Builder
        total := 0
        b.WriteString("RECEIPT\\n")
        for _, item := range items {
          lineTotal := item.Qty * item.PriceCents
          total += lineTotal
          fmt.Fprintf(&b, "%s x%d $%.2f\\n", item.Name, item.Qty, float64(lineTotal)/100)
        }
        fmt.Fprintf(&b, "TOTAL $%.2f\\n", float64(total)/100)
        return b.String()
      }
    `,
    test: goTests.receipt,
    extraFiles: {
      "testdata/receipt.golden": "RECEIPT\nBook x2 $24.00\nPen x1 $1.50\nTOTAL $25.50\n",
    },
  }),
  goExercise({
    id: "go/testing/005-benchmarks-string-builder",
    title: "Benchmarks and Allocation Pressure",
    track: "go",
    topic: "testing",
    focus: "benchmarks and string construction choices",
    task: "Implement `ConcatLabels` to join labels with commas and no spaces. The benchmark exists so you can compare simple approaches after correctness passes.",
    objectives: ["Read a Go benchmark", "Use strings.Join for simple joining", "Keep benchmarked code pure"],
    tags: ["go", "testing", "benchmarks", "performance"],
    difficulty: "beginner+",
    starter: text`
      package drill

      func ConcatLabels(labels []string) string {
        // TODO: join labels with commas.
        return ""
      }
    `,
    solution: text`
      package drill

      import "strings"

      func ConcatLabels(labels []string) string {
        return strings.Join(labels, ",")
      }
    `,
    test: goTests.concat,
  }),
  goExercise({
    id: "go/testing/006-fuzzable-key-value-parser",
    title: "Fuzz-Friendly Parser",
    track: "go",
    topic: "testing",
    focus: "parser invariants that can be checked by normal tests and fuzz tests",
    task: "Implement `ParseKeyValue`. Split on the first `=`, require a non-empty key, and return ok=false when the input is malformed.",
    objectives: ["Write parser invariants", "Keep fuzz targets safe", "Return ok booleans for tiny parsers"],
    tags: ["go", "testing", "fuzz", "parsing"],
    difficulty: "intermediate",
    starter: text`
      package drill

      func ParseKeyValue(input string) (key string, value string, ok bool) {
        // TODO: parse key=value using the first equals sign.
        return "", "", false
      }
    `,
    solution: text`
      package drill

      import "strings"

      func ParseKeyValue(input string) (key string, value string, ok bool) {
        before, after, found := strings.Cut(input, "=")
        if !found || before == "" {
          return "", "", false
        }
        return before, after, true
      }
    `,
    test: goTests.keyValue,
  }),
  goExercise({
    id: "go/testing/007-race-detector-safe-counter",
    title: "Race Detector Friendly Counter",
    track: "go",
    topic: "testing",
    focus: "data races, mutexes, and tests that exercise concurrent access",
    task: "Implement `SafeCounter` with `Inc` and `Value`. It must be safe for concurrent goroutines.",
    objectives: ["Protect shared state with a mutex", "Understand what `go test -race` would inspect", "Expose a small concurrent API"],
    tags: ["go", "testing", "race-detector", "mutex"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type SafeCounter struct {
        value int
      }

      func (c *SafeCounter) Inc() {
        // TODO: make increments safe under concurrency.
      }

      func (c *SafeCounter) Value() int {
        // TODO: return the current value safely.
        return c.value
      }
    `,
    solution: text`
      package drill

      import "sync"

      type SafeCounter struct {
        mu    sync.Mutex
        value int
      }

      func (c *SafeCounter) Inc() {
        c.mu.Lock()
        defer c.mu.Unlock()
        c.value++
      }

      func (c *SafeCounter) Value() int {
        c.mu.Lock()
        defer c.mu.Unlock()
        return c.value
      }
    `,
    test: goTests.safeCounter,
  }),
  goExercise({
    id: "go/testing/008-clock-injection",
    title: "Clock Injection for Time Tests",
    track: "go",
    topic: "testing",
    focus: "injecting time dependencies so tests stay deterministic",
    task: "Implement `IsExpired`. Use the injected `now` function instead of calling `time.Now` directly.",
    objectives: ["Inject clocks for deterministic tests", "Compare time values correctly", "Avoid sleeping in unit tests"],
    tags: ["go", "testing", "time", "dependency-injection"],
    difficulty: "beginner+",
    starter: text`
      package drill

      import "time"

      func IsExpired(now func() time.Time, expiresAt time.Time) bool {
        // TODO: compare the injected current time with expiresAt.
        return false
      }
    `,
    solution: text`
      package drill

      import "time"

      func IsExpired(now func() time.Time, expiresAt time.Time) bool {
        return !now().Before(expiresAt)
      }
    `,
    test: goTests.clock,
  }),
  goExercise({
    id: "go/concurrency/001-goroutines-parallel-sum",
    title: "Goroutines for Parallel Sum",
    track: "go",
    topic: "concurrency",
    focus: "goroutines, work partitioning, and collecting results safely",
    task: "Implement `ParallelSum`. Split the input across workers, sum chunks in goroutines, and combine the partial sums. Treat workers less than one as one.",
    objectives: ["Start goroutines deliberately", "Partition slices safely", "Collect results without shared mutation"],
    tags: ["go", "concurrency", "goroutines"],
    difficulty: "intermediate",
    starter: text`
      package drill

      func ParallelSum(nums []int, workers int) int {
        // TODO: sum numbers using worker goroutines.
        return 0
      }
    `,
    solution: text`
      package drill

      func ParallelSum(nums []int, workers int) int {
        if workers < 1 {
          workers = 1
        }
        if workers > len(nums) && len(nums) > 0 {
          workers = len(nums)
        }
        if len(nums) == 0 {
          return 0
        }
        results := make(chan int, workers)
        chunk := (len(nums) + workers - 1) / workers
        launched := 0
        for start := 0; start < len(nums); start += chunk {
          end := start + chunk
          if end > len(nums) {
            end = len(nums)
          }
          launched++
          go func(part []int) {
            sum := 0
            for _, n := range part {
              sum += n
            }
            results <- sum
          }(nums[start:end])
        }
        total := 0
        for i := 0; i < launched; i++ {
          total += <-results
        }
        return total
      }
    `,
    test: goTests.parallelSum,
  }),
  goExercise({
    id: "go/concurrency/002-channels-fan-in",
    title: "Channel Fan-In",
    track: "go",
    topic: "concurrency",
    focus: "channels, goroutines, WaitGroups, and closing output channels",
    task: "Implement `FanIn`. Forward all values from both input channels to one output channel and close the output after both inputs close.",
    objectives: ["Forward channel values", "Close only the channel you own", "Coordinate goroutines with sync.WaitGroup"],
    tags: ["go", "concurrency", "channels"],
    difficulty: "intermediate",
    starter: text`
      package drill

      func FanIn(a, b <-chan int) <-chan int {
        // TODO: merge both channels and close output when done.
        out := make(chan int)
        close(out)
        return out
      }
    `,
    solution: text`
      package drill

      import "sync"

      func FanIn(a, b <-chan int) <-chan int {
        out := make(chan int)
        var wg sync.WaitGroup
        forward := func(ch <-chan int) {
          defer wg.Done()
          for v := range ch {
            out <- v
          }
        }
        wg.Add(2)
        go forward(a)
        go forward(b)
        go func() {
          wg.Wait()
          close(out)
        }()
        return out
      }
    `,
    test: goTests.fanIn,
  }),
  goExercise({
    id: "go/concurrency/003-select-timeout",
    title: "select with Timeout",
    track: "go",
    topic: "concurrency",
    focus: "select statements and timeouts around channel receives",
    task: "Implement `WaitForString`. Return the received value and true, or an empty string and false if the timeout fires first.",
    objectives: ["Use select for competing events", "Use time.After for simple timeouts", "Return timeout state explicitly"],
    tags: ["go", "concurrency", "select", "timeouts"],
    difficulty: "beginner+",
    starter: text`
      package drill

      import "time"

      func WaitForString(ch <-chan string, timeout time.Duration) (string, bool) {
        // TODO: receive from ch or time out.
        return "", false
      }
    `,
    solution: text`
      package drill

      import "time"

      func WaitForString(ch <-chan string, timeout time.Duration) (string, bool) {
        select {
        case value := <-ch:
          return value, true
        case <-time.After(timeout):
          return "", false
        }
      }
    `,
    test: goTests.waitString,
  }),
  goExercise({
    id: "go/concurrency/004-worker-pool-ordering",
    title: "Worker Pool with Ordered Results",
    track: "go",
    topic: "concurrency",
    focus: "worker pools, jobs, results, and preserving caller-visible ordering",
    task: "Implement `ProcessJobs`. Run `fn` across worker goroutines but return results in the same order as the input jobs.",
    objectives: ["Build a small worker pool", "Preserve result order", "Close job channels correctly"],
    tags: ["go", "concurrency", "worker-pool"],
    difficulty: "intermediate+",
    starter: text`
      package drill

      func ProcessJobs(jobs []int, workers int, fn func(int) int) []int {
        // TODO: process jobs concurrently and preserve ordering.
        return nil
      }
    `,
    solution: text`
      package drill

      import "sync"

      type indexedJob struct {
        index int
        value int
      }

      func ProcessJobs(jobs []int, workers int, fn func(int) int) []int {
        if workers < 1 {
          workers = 1
        }
        in := make(chan indexedJob)
        out := make([]int, len(jobs))
        var wg sync.WaitGroup
        for i := 0; i < workers; i++ {
          wg.Add(1)
          go func() {
            defer wg.Done()
            for job := range in {
              out[job.index] = fn(job.value)
            }
          }()
        }
        for i, value := range jobs {
          in <- indexedJob{index: i, value: value}
        }
        close(in)
        wg.Wait()
        return out
      }
    `,
    test: goTests.workerPool,
  }),
  goExercise({
    id: "go/concurrency/005-context-cancellation-stream",
    title: "Context Cancellation in Streams",
    track: "go",
    topic: "concurrency",
    focus: "context cancellation, producer goroutines, and closing channels",
    task: "Implement `StreamNumbers`. Emit integers from zero up to max-1, stop early when the context is canceled, and close the output channel.",
    objectives: ["Respect context cancellation", "Avoid goroutine leaks", "Close producer-owned channels"],
    tags: ["go", "concurrency", "context", "cancellation"],
    difficulty: "intermediate",
    starter: text`
      package drill

      import "context"

      func StreamNumbers(ctx context.Context, max int) <-chan int {
        // TODO: stream numbers until max or cancellation.
        out := make(chan int)
        close(out)
        return out
      }
    `,
    solution: text`
      package drill

      import "context"

      func StreamNumbers(ctx context.Context, max int) <-chan int {
        out := make(chan int)
        go func() {
          defer close(out)
          for i := 0; i < max; i++ {
            select {
            case <-ctx.Done():
              return
            default:
            }
            select {
            case <-ctx.Done():
              return
            case out <- i:
            }
          }
        }()
        return out
      }
    `,
    test: goTests.stream,
  }),
  goExercise({
    id: "go/concurrency/006-context-timeout-fetch",
    title: "Context Timeout Wrapper",
    track: "go",
    topic: "concurrency",
    focus: "context deadlines and racing work against cancellation",
    task: "Implement `FetchWithContext`. Run the provided function and return its result, unless the context is done first.",
    objectives: ["Select on context cancellation", "Propagate context errors", "Wrap blocking work safely enough for tests"],
    tags: ["go", "concurrency", "context", "timeouts"],
    difficulty: "intermediate+",
    starter: text`
      package drill

      import "context"

      func FetchWithContext(ctx context.Context, fetch func() (string, error)) (string, error) {
        // TODO: race fetch against ctx.Done().
        return fetch()
      }
    `,
    solution: text`
      package drill

      import "context"

      type fetchResult struct {
        value string
        err   error
      }

      func FetchWithContext(ctx context.Context, fetch func() (string, error)) (string, error) {
        done := make(chan fetchResult, 1)
        go func() {
          value, err := fetch()
          done <- fetchResult{value: value, err: err}
        }()
        select {
        case result := <-done:
          return result.value, result.err
        case <-ctx.Done():
          return "", ctx.Err()
        }
      }
    `,
    test: goTests.fetch,
  }),
  goExercise({
    id: "go/concurrency/007-mutex-cache",
    title: "Mutex-Protected Cache",
    track: "go",
    topic: "concurrency",
    focus: "mutexes, map protection, and simple lazy loading",
    task: "Implement `NewCache` and `Get`. `Get` should return a cached value when present or call `load`, store the result, and return it.",
    objectives: ["Protect maps with mutexes", "Hide synchronization inside a type", "Avoid repeated work for cached keys"],
    tags: ["go", "concurrency", "mutex", "cache"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type Cache struct {
        values map[string]string
      }

      func NewCache() *Cache {
        // TODO: initialize the cache.
        return &Cache{}
      }

      func (c *Cache) Get(key string, load func() string) string {
        // TODO: return cached value or load and store it.
        return load()
      }
    `,
    solution: text`
      package drill

      import "sync"

      type Cache struct {
        mu     sync.Mutex
        values map[string]string
      }

      func NewCache() *Cache {
        return &Cache{values: map[string]string{}}
      }

      func (c *Cache) Get(key string, load func() string) string {
        c.mu.Lock()
        defer c.mu.Unlock()
        if value, ok := c.values[key]; ok {
          return value
        }
        value := load()
        c.values[key] = value
        return value
      }
    `,
    test: goTests.cache,
  }),
  goExercise({
    id: "go/concurrency/008-atomics-basic-counter",
    title: "Atomic Counter Basics",
    track: "go",
    topic: "concurrency",
    focus: "atomic integers for small lock-free counters",
    task: "Implement `AtomicCounter` with `Inc` and `Value` using the `sync/atomic` package's typed integer.",
    objectives: ["Use typed atomics", "Avoid data races for counters", "Keep atomic APIs small"],
    tags: ["go", "concurrency", "atomics"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type AtomicCounter struct {
        value int64
      }

      func (c *AtomicCounter) Inc() {
        // TODO: increment atomically.
      }

      func (c *AtomicCounter) Value() int64 {
        // TODO: load atomically.
        return c.value
      }
    `,
    solution: text`
      package drill

      import "sync/atomic"

      type AtomicCounter struct {
        value atomic.Int64
      }

      func (c *AtomicCounter) Inc() {
        c.value.Add(1)
      }

      func (c *AtomicCounter) Value() int64 {
        return c.value.Load()
      }
    `,
    test: goTests.atomicCounter,
  }),
  goExercise({
    id: "go/http/001-json-decoder",
    title: "JSON Decoder with Validation",
    track: "go",
    topic: "http",
    focus: "JSON decoding, unknown field rejection, and input validation",
    task: "Implement `DecodeUser`. Decode JSON from the reader, disallow unknown fields, and require a non-empty name and non-negative age.",
    objectives: ["Use json.Decoder", "Reject unknown fields", "Validate decoded structs"],
    tags: ["go", "http", "json"],
    difficulty: "intermediate",
    starter: text`
      package drill

      import "io"

      type User struct {
        Name string \`json:"name"\`
        Age  int    \`json:"age"\`
      }

      func DecodeUser(r io.Reader) (User, error) {
        // TODO: decode JSON, reject unknown fields, and validate.
        return User{}, nil
      }
    `,
    solution: text`
      package drill

      import (
        "encoding/json"
        "fmt"
        "io"
      )

      type User struct {
        Name string \`json:"name"\`
        Age  int    \`json:"age"\`
      }

      func DecodeUser(r io.Reader) (User, error) {
        var user User
        dec := json.NewDecoder(r)
        dec.DisallowUnknownFields()
        if err := dec.Decode(&user); err != nil {
          return User{}, err
        }
        if user.Name == "" {
          return User{}, fmt.Errorf("name is required")
        }
        if user.Age < 0 {
          return User{}, fmt.Errorf("age must be non-negative")
        }
        return user, nil
      }
    `,
    test: goTests.decodeUser,
  }),
  goExercise({
    id: "go/http/002-handler-response",
    title: "HTTP Handler Basics",
    track: "go",
    topic: "http",
    focus: "net/http handlers, query parameters, and deterministic response bodies",
    task: "Implement `GreetHandler`. Read `name` from the query string, default to `guest`, and write `hello <name>\\n` with HTTP 200.",
    objectives: ["Write an http.HandlerFunc", "Use httptest-driven behavior", "Return simple text responses"],
    tags: ["go", "http", "handlers"],
    difficulty: "beginner+",
    starter: text`
      package drill

      import "net/http"

      func GreetHandler(w http.ResponseWriter, r *http.Request) {
        // TODO: write the greeting response.
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "net/http"
      )

      func GreetHandler(w http.ResponseWriter, r *http.Request) {
        name := r.URL.Query().Get("name")
        if name == "" {
          name = "guest"
        }
        fmt.Fprintf(w, "hello %s\\n", name)
      }
    `,
    test: goTests.greetHandler,
  }),
  goExercise({
    id: "go/http/003-middleware-header",
    title: "HTTP Middleware",
    track: "go",
    topic: "http",
    focus: "middleware wrappers and response header behavior",
    task: "Implement `WithHeader`. Return a handler that sets the given header before delegating to the next handler.",
    objectives: ["Wrap http.Handler values", "Set response headers before writing", "Keep middleware composable"],
    tags: ["go", "http", "middleware"],
    difficulty: "intermediate",
    starter: text`
      package drill

      import "net/http"

      func WithHeader(next http.Handler, key, value string) http.Handler {
        // TODO: set the header and delegate to next.
        return next
      }
    `,
    solution: text`
      package drill

      import "net/http"

      func WithHeader(next http.Handler, key, value string) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
          w.Header().Set(key, value)
          next.ServeHTTP(w, r)
        })
      }
    `,
    test: goTests.middleware,
  }),
  goExercise({
    id: "go/cli/001-flagset-options",
    title: "CLI Flags with flag.FlagSet",
    track: "go",
    topic: "cli",
    focus: "parsing CLI flags without global process state",
    task: "Implement `ParseOptions`. Use a new `flag.FlagSet`, support `-port`, `-env`, and `-debug`, and return parse errors.",
    objectives: ["Use flag.FlagSet for testable parsers", "Avoid global flag state", "Return structured options"],
    tags: ["go", "cli", "flags"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type Options struct {
        Port  int
        Env   string
        Debug bool
      }

      func ParseOptions(args []string) (Options, error) {
        // TODO: parse args using flag.NewFlagSet.
        return Options{}, nil
      }
    `,
    solution: text`
      package drill

      import "flag"

      type Options struct {
        Port  int
        Env   string
        Debug bool
      }

      func ParseOptions(args []string) (Options, error) {
        fs := flag.NewFlagSet("drill", flag.ContinueOnError)
        opts := Options{}
        fs.IntVar(&opts.Port, "port", 8080, "port")
        fs.StringVar(&opts.Env, "env", "dev", "environment")
        fs.BoolVar(&opts.Debug, "debug", false, "debug mode")
        if err := fs.Parse(args); err != nil {
          return Options{}, err
        }
        return opts, nil
      }
    `,
    test: goTests.flags,
  }),
  goExercise({
    id: "go/cli/002-file-io-config",
    title: "File I/O for Config",
    track: "go",
    topic: "cli",
    focus: "reading files, scanning lines, and parsing small configuration formats",
    task: "Implement `ReadConfig`. Read `KEY=value` lines, skip blanks and comments beginning with `#`, and return a map.",
    objectives: ["Use os.Open and bufio.Scanner", "Parse simple config safely", "Return file and scanner errors"],
    tags: ["go", "cli", "file-io", "configuration"],
    difficulty: "intermediate",
    starter: text`
      package drill

      func ReadConfig(path string) (map[string]string, error) {
        // TODO: read KEY=value config lines from path.
        return nil, nil
      }
    `,
    solution: text`
      package drill

      import (
        "bufio"
        "os"
        "strings"
      )

      func ReadConfig(path string) (map[string]string, error) {
        f, err := os.Open(path)
        if err != nil {
          return nil, err
        }
        defer f.Close()
        cfg := map[string]string{}
        scanner := bufio.NewScanner(f)
        for scanner.Scan() {
          line := strings.TrimSpace(scanner.Text())
          if line == "" || strings.HasPrefix(line, "#") {
            continue
          }
          key, value, ok := strings.Cut(line, "=")
          if ok {
            cfg[strings.TrimSpace(key)] = strings.TrimSpace(value)
          }
        }
        if err := scanner.Err(); err != nil {
          return nil, err
        }
        return cfg, nil
      }
    `,
    test: goTests.fileConfig,
  }),
  goExercise({
    id: "go/generics/001-generic-set",
    title: "Generic Set",
    track: "go",
    topic: "generics",
    focus: "type parameters, comparable constraints, and reusable collection APIs",
    task: "Implement `Set[T]`, `NewSet`, `Add`, `Delete`, `Has`, and `Len` for comparable values.",
    objectives: ["Use type parameters", "Apply comparable constraints", "Build a small reusable collection"],
    tags: ["go", "generics", "collections"],
    difficulty: "intermediate",
    starter: text`
      package drill

      type Set[T comparable] struct {
        values map[T]struct{}
      }

      func NewSet[T comparable]() *Set[T] {
        // TODO: initialize the set.
        return &Set[T]{}
      }

      func (s *Set[T]) Add(value T) {}
      func (s *Set[T]) Delete(value T) {}
      func (s *Set[T]) Has(value T) bool { return false }
      func (s *Set[T]) Len() int { return 0 }
    `,
    solution: text`
      package drill

      type Set[T comparable] struct {
        values map[T]struct{}
      }

      func NewSet[T comparable]() *Set[T] {
        return &Set[T]{values: map[T]struct{}{}}
      }

      func (s *Set[T]) Add(value T) {
        s.values[value] = struct{}{}
      }

      func (s *Set[T]) Delete(value T) {
        delete(s.values, value)
      }

      func (s *Set[T]) Has(value T) bool {
        _, ok := s.values[value]
        return ok
      }

      func (s *Set[T]) Len() int {
        return len(s.values)
      }
    `,
    test: goTests.set,
  }),
  goExercise({
    id: "go/generics/002-map-filter",
    title: "Generic Map and Filter",
    track: "go",
    topic: "generics",
    focus: "generic functions and preserving slice order across transformations",
    task: "Implement `MapSlice` and `FilterSlice`. Both functions should allocate result slices with sensible capacity and preserve input order.",
    objectives: ["Write generic functions", "Pass functions as parameters", "Preserve collection ordering"],
    tags: ["go", "generics", "slices"],
    difficulty: "intermediate",
    starter: text`
      package drill

      func MapSlice[T any, U any](values []T, fn func(T) U) []U {
        // TODO: map each value.
        return nil
      }

      func FilterSlice[T any](values []T, keep func(T) bool) []T {
        // TODO: keep matching values.
        return nil
      }
    `,
    solution: text`
      package drill

      func MapSlice[T any, U any](values []T, fn func(T) U) []U {
        out := make([]U, 0, len(values))
        for _, value := range values {
          out = append(out, fn(value))
        }
        return out
      }

      func FilterSlice[T any](values []T, keep func(T) bool) []T {
        out := make([]T, 0, len(values))
        for _, value := range values {
          if keep(value) {
            out = append(out, value)
          }
        }
        return out
      }
    `,
    test: goTests.mapFilter,
  }),
  goExercise({
    id: "go/architecture/001-repository-service",
    title: "Repository and Service Boundary",
    track: "go",
    topic: "architecture",
    focus: "clean package boundaries, repository interfaces, and service-level validation",
    task: "Implement `RegistrationService.Register`. Normalize email, reject empty or duplicate emails, create a `User`, save it through the repository, and return the saved user.",
    objectives: ["Separate service policy from storage", "Use narrow repository interfaces", "Keep domain validation close to the use case"],
    tags: ["go", "architecture", "repository", "services"],
    difficulty: "intermediate+",
    starter: text`
      package drill

      type User struct {
        Email string
      }

      type UserRepository interface {
        FindByEmail(email string) (User, bool)
        Save(user User) error
      }

      type RegistrationService struct {
        Repo UserRepository
      }

      func (s RegistrationService) Register(email string) (User, error) {
        // TODO: normalize, reject duplicates, save, and return user.
        return User{}, nil
      }
    `,
    solution: text`
      package drill

      import (
        "fmt"
        "strings"
      )

      type User struct {
        Email string
      }

      type UserRepository interface {
        FindByEmail(email string) (User, bool)
        Save(user User) error
      }

      type RegistrationService struct {
        Repo UserRepository
      }

      func (s RegistrationService) Register(email string) (User, error) {
        normalized := strings.ToLower(strings.TrimSpace(email))
        if normalized == "" {
          return User{}, fmt.Errorf("email is required")
        }
        if _, exists := s.Repo.FindByEmail(normalized); exists {
          return User{}, fmt.Errorf("email already registered")
        }
        user := User{Email: normalized}
        if err := s.Repo.Save(user); err != nil {
          return User{}, err
        }
        return user, nil
      }
    `,
    test: goTests.registration,
  }),
  goExercise({
    id: "go/architecture/002-profiling-index",
    title: "Profiling-Friendly Inverted Index",
    track: "go",
    topic: "architecture",
    focus: "profiling basics, allocation-aware maps, and maintainable API boundaries",
    task: "Implement `BuildIndex`. For each document, lowercase words and map each word to the document indexes it appears in. Do not record the same document index twice for one word.",
    objectives: ["Build an allocation-conscious map", "Use benchmarks to inspect performance later", "Keep API surface small and practical"],
    tags: ["go", "architecture", "profiling", "performance"],
    difficulty: "intermediate+",
    starter: text`
      package drill

      func BuildIndex(docs []string) map[string][]int {
        // TODO: build word -> document indexes.
        return nil
      }
    `,
    solution: text`
      package drill

      import "strings"

      func BuildIndex(docs []string) map[string][]int {
        index := map[string][]int{}
        for docID, doc := range docs {
          seenInDoc := map[string]bool{}
          for _, word := range strings.Fields(strings.ToLower(doc)) {
            if seenInDoc[word] {
              continue
            }
            seenInDoc[word] = true
            index[word] = append(index[word], docID)
          }
        }
        return index
      }
    `,
    test: goTests.buildIndex,
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
    id: "ts-react/typescript-deep-dive/001-conditional-api-data",
    title: "Conditional Types for API Data",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "conditional types that extract success payloads from discriminated API results",
    task: "Implement `DataOf<T>` so it extracts the `data` type from successful API results and returns `never` for failures.",
    objectives: ["Use conditional types", "Extract payload types", "Model success and failure separately"],
    tags: ["typescript", "conditional-types", "api"],
    starter: text`
      export type ApiResult<T> =
        | { ok: true; data: T }
        | { ok: false; error: { message: string } };

      export type DataOf<T> = unknown; // TODO
    `,
    solution: text`
      export type ApiResult<T> =
        | { ok: true; data: T }
        | { ok: false; error: { message: string } };

      export type DataOf<T> = T extends { ok: true; data: infer Data } ? Data : never;
    `,
    test: text`
      import type { ApiResult, DataOf } from "./exercise";
      ${typePrelude}

      type User = { id: string; name: string };
      type _data = Assert<Equal<DataOf<ApiResult<User>>, User>>;
      type _failure = Assert<Equal<DataOf<{ ok: false; error: { message: string } }>, never>>;
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/002-mapped-readonly-except",
    title: "Mapped Types with Readonly Exceptions",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "mapped type modifiers and selective mutability",
    task: "Implement `ReadonlyExcept<T, K>`. Every property should be readonly except the keys in `K`, which remain writable.",
    objectives: ["Use mapped type modifiers", "Compose utility types", "Test mutability at compile time"],
    tags: ["typescript", "mapped-types", "readonly"],
    starter: text`
      export type ReadonlyExcept<T, K extends keyof T> = T; // TODO
    `,
    solution: text`
      export type ReadonlyExcept<T, K extends keyof T> =
        Readonly<Omit<T, K>> & { -readonly [P in K]: T[P] };
    `,
    test: text`
      import type { ReadonlyExcept } from "./exercise";

      type User = { id: string; name: string; role: string };
      declare const user: ReadonlyExcept<User, "name">;

      user.name = "Grace";
      // @ts-expect-error id must be readonly
      user.id = "next";
      // @ts-expect-error role must be readonly
      user.role = "admin";
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/003-template-route-params",
    title: "Template Literal Route Params",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "template literal types and recursive string decomposition",
    task: "Implement `RouteParams<Path>` so `/users/:userId/posts/:postId` becomes `{ userId: string; postId: string }`.",
    objectives: ["Use template literal types", "Build recursive type transforms", "Type route contracts from strings"],
    tags: ["typescript", "template-literal-types", "routing"],
    difficulty: "advanced",
    starter: text`
      export type RouteParams<Path extends string> = {}; // TODO
    `,
    solution: text`
      type SegmentParam<Segment extends string> =
        Segment extends \`:\${infer Name}\` ? { [K in Name]: string } : {};

      export type RouteParams<Path extends string> =
        string extends Path
          ? Record<string, string>
          : Path extends \`\${infer Head}/\${infer Rest}\`
            ? SegmentParam<Head> & RouteParams<Rest>
            : SegmentParam<Path>;
    `,
    test: text`
      import type { RouteParams } from "./exercise";
      ${typePrelude}

      type Params = RouteParams<"/users/:userId/posts/:postId">;
      type _params = Assert<Equal<Params, { userId: string } & { postId: string }>>;
      type _none = Assert<Equal<RouteParams<"/health">, {}>>;
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/004-infer-awaited-deep",
    title: "Recursive infer with AwaitedDeep",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "infer clauses and recursive type unwrapping",
    task: "Implement `AwaitedDeep<T>` so it recursively unwraps nested Promise values.",
    objectives: ["Use `infer` in conditional types", "Write recursive type aliases", "Model async helper output"],
    tags: ["typescript", "infer", "promises"],
    difficulty: "advanced",
    starter: text`
      export type AwaitedDeep<T> = T; // TODO
    `,
    solution: text`
      export type AwaitedDeep<T> =
        T extends PromiseLike<infer Inner> ? AwaitedDeep<Inner> : T;
    `,
    test: text`
      import type { AwaitedDeep } from "./exercise";
      ${typePrelude}

      type _nested = Assert<Equal<AwaitedDeep<Promise<Promise<{ id: string }>>>, { id: string }>>;
      type _plain = Assert<Equal<AwaitedDeep<number>, number>>;
    `,
  }),
  staticExercise({
    id: "ts-react/typescript-deep-dive/005-exhaustive-discriminated-union",
    title: "Exhaustive Discriminated Unions",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "discriminated unions and `never`-based exhaustive checks in reducers",
    task: "Complete the reducer so every action is handled and the default path calls `assertNever(action)`.",
    objectives: ["Use discriminated unions", "Force exhaustive reducer handling", "Keep impossible states visible"],
    tags: ["typescript", "discriminated-unions", "reducers"],
    files: {
      "src/reducer.ts": {
        starter: text`
          export type State = { count: number };
          export type Action =
            | { type: "increment"; by: number }
            | { type: "decrement"; by: number }
            | { type: "reset" };

          export function assertNever(value: never): never {
            throw new Error("Unexpected action: " + JSON.stringify(value));
          }

          export function reducer(state: State, action: Action): State {
            // TODO: handle every action and call assertNever in the default branch.
            if (action.type === "increment") return { count: state.count + action.by };
            return state;
          }
        `,
        solution: text`
          export type State = { count: number };
          export type Action =
            | { type: "increment"; by: number }
            | { type: "decrement"; by: number }
            | { type: "reset" };

          export function assertNever(value: never): never {
            throw new Error("Unexpected action: " + JSON.stringify(value));
          }

          export function reducer(state: State, action: Action): State {
            switch (action.type) {
              case "increment":
                return { count: state.count + action.by };
              case "decrement":
                return { count: state.count - action.by };
              case "reset":
                return { count: 0 };
              default:
                return assertNever(action);
            }
          }
        `,
      },
    },
    checks: [
      { file: "src/reducer.ts", includes: "case \"decrement\"" },
      { file: "src/reducer.ts", includes: "case \"reset\"" },
      { file: "src/reducer.ts", includes: "assertNever(action)" },
    ],
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/006-branded-user-id",
    title: "Branded Primitive IDs",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "branded types that prevent mixing domain identifiers",
    task: "Implement `Brand`, `UserId`, and `makeUserId` so plain strings are not assignable to `UserId` without passing through the constructor.",
    objectives: ["Create branded primitive types", "Prevent accidental ID mixing", "Keep runtime representation simple"],
    tags: ["typescript", "branded-types", "domain-modeling"],
    difficulty: "advanced",
    starter: text`
      export type Brand<T, Name extends string> = T; // TODO
      export type UserId = string; // TODO

      export function makeUserId(value: string): UserId {
        return value;
      }
    `,
    solution: text`
      export type Brand<T, Name extends string> = T & { readonly __brand: Name };
      export type UserId = Brand<string, "UserId">;

      export function makeUserId(value: string): UserId {
        return value as UserId;
      }
    `,
    test: text`
      import { makeUserId } from "./exercise";
      import type { UserId } from "./exercise";

      const id = makeUserId("user_1");
      const asString: string = id;
      const acceptsUserId = (value: UserId) => value;
      acceptsUserId(id);
      // @ts-expect-error plain strings are not UserId values
      acceptsUserId("user_2");
      void asString;
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/007-type-safe-event-map",
    title: "Type-Safe Event Maps",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "keyed event maps and payload inference for emitter APIs",
    task: "Implement `TypedEmitter<M>` so `on` and `emit` infer payload types from the event key.",
    objectives: ["Use keyof constraints", "Infer payloads from event names", "Design typed callback APIs"],
    tags: ["typescript", "event-maps", "interfaces"],
    difficulty: "advanced",
    starter: text`
      export interface TypedEmitter<M> {
        on(event: keyof M, handler: (payload: unknown) => void): void; // TODO
        emit(event: keyof M, payload: unknown): void; // TODO
      }
    `,
    solution: text`
      export interface TypedEmitter<M> {
        on<K extends keyof M>(event: K, handler: (payload: M[K]) => void): void;
        emit<K extends keyof M>(event: K, payload: M[K]): void;
      }
    `,
    test: text`
      import type { TypedEmitter } from "./exercise";

      type Events = {
        "user:created": { id: string };
        "toast": { message: string; level: "info" | "error" };
      };

      declare const bus: TypedEmitter<Events>;
      bus.emit("user:created", { id: "1" });
      bus.on("toast", payload => {
        const level: "info" | "error" = payload.level;
        void level;
      });
      // @ts-expect-error wrong payload
      bus.emit("user:created", { message: "nope" });
      // @ts-expect-error unknown event
      bus.emit("missing", {});
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/008-type-safe-api-client",
    title: "Type-Safe API Client Contracts",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "indexed access types for request and response contracts",
    task: "Implement `RequestFor`, `ResponseFor`, and `Client<E>` from an endpoint map shaped by request and response fields.",
    objectives: ["Use indexed access types", "Model endpoint contracts", "Preserve request-response coupling"],
    tags: ["typescript", "api-client", "indexed-access"],
    difficulty: "advanced",
    starter: text`
      export type EndpointSpec = Record<string, { request: unknown; response: unknown }>;
      export type RequestFor<E extends EndpointSpec, K extends keyof E> = unknown; // TODO
      export type ResponseFor<E extends EndpointSpec, K extends keyof E> = unknown; // TODO
      export type Client<E extends EndpointSpec> = {
        request<K extends keyof E>(key: K, input: unknown): Promise<unknown>; // TODO
      };
    `,
    solution: text`
      export type EndpointSpec = Record<string, { request: unknown; response: unknown }>;
      export type RequestFor<E extends EndpointSpec, K extends keyof E> = E[K]["request"];
      export type ResponseFor<E extends EndpointSpec, K extends keyof E> = E[K]["response"];
      export type Client<E extends EndpointSpec> = {
        request<K extends keyof E>(key: K, input: RequestFor<E, K>): Promise<ResponseFor<E, K>>;
      };
    `,
    test: text`
      import type { Client } from "./exercise";
      ${typePrelude}

      type Endpoints = {
        getUser: { request: { id: string }; response: { name: string } };
        search: { request: { q: string }; response: { ids: string[] } };
      };

      declare const client: Client<Endpoints>;
      const user = client.request("getUser", { id: "1" });
      type _user = Assert<Equal<typeof user, Promise<{ name: string }>>>;
      // @ts-expect-error request shape must match endpoint
      client.request("getUser", { q: "Ada" });
    `,
  }),
  typeExercise({
    id: "ts-react/typescript-deep-dive/009-snake-to-camel",
    title: "Type-Level Snake to Camel",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "recursive template literal transformations for object keys",
    task: "Implement `SnakeToCamel` and `CamelizeKeys<T>` so snake_case object keys become camelCase.",
    objectives: ["Transform string literal types", "Remap object keys", "Apply recursion carefully"],
    tags: ["typescript", "type-level-programming", "mapped-types"],
    difficulty: "advanced",
    starter: text`
      export type SnakeToCamel<S extends string> = S; // TODO
      export type CamelizeKeys<T> = T; // TODO
    `,
    solution: text`
      export type SnakeToCamel<S extends string> =
        S extends \`\${infer Head}_\${infer Tail}\`
          ? \`\${Head}\${Capitalize<SnakeToCamel<Tail>>}\`
          : S;

      export type CamelizeKeys<T> = {
        [K in keyof T as K extends string ? SnakeToCamel<K> : K]: T[K]
      };
    `,
    test: text`
      import type { CamelizeKeys, SnakeToCamel } from "./exercise";
      ${typePrelude}

      type _name = Assert<Equal<SnakeToCamel<"user_profile_id">, "userProfileId">>;
      type _object = Assert<Equal<CamelizeKeys<{ user_id: string; created_at: number }>, { userId: string; createdAt: number }>>;
    `,
  }),
  staticExercise({
    id: "ts-react/typescript-deep-dive/010-tsconfig-strictness",
    title: "tsconfig Strictness Tradeoffs",
    track: "ts-react",
    topic: "typescript-deep-dive",
    focus: "strict compiler options and the tradeoffs they create for application code",
    task: "Tighten the starter `tsconfig.json`. Enable strict mode, exact optional property types, no unchecked indexed access, and no implicit override.",
    objectives: ["Recognize strictness flags", "Understand risk-reducing compiler settings", "Practice config-level checks"],
    tags: ["typescript", "tsconfig", "strictness"],
    files: {
      "tsconfig.json": {
        starter: text`
          {
            "compilerOptions": {
              "target": "ES2020",
              "module": "ESNext",
              "strict": false
            }
          }
        `,
        solution: text`
          {
            "compilerOptions": {
              "target": "ES2020",
              "module": "ESNext",
              "strict": true,
              "exactOptionalPropertyTypes": true,
              "noUncheckedIndexedAccess": true,
              "noImplicitOverride": true
            }
          }
        `,
      },
    },
    checks: [
      { file: "tsconfig.json", includes: "\"strict\": true" },
      { file: "tsconfig.json", includes: "\"exactOptionalPropertyTypes\": true" },
      { file: "tsconfig.json", includes: "\"noUncheckedIndexedAccess\": true" },
      { file: "tsconfig.json", includes: "\"noImplicitOverride\": true" },
    ],
  }),
];

const staticTsDefs = [
  {
    id: "ts-react/react-architecture/001-use-controllable-state",
    title: "Controlled and Uncontrolled Hook API",
    topic: "react-architecture",
    focus: "controlled/uncontrolled React state APIs and stable setter semantics",
    task: "Finish `useControllableState` so controlled values come from props, uncontrolled values live in local state, and changes call `onChange` consistently.",
    objectives: ["Design controlled/uncontrolled APIs", "Avoid duplicate sources of truth", "Stabilize hook return values"],
    tags: ["react", "hooks", "architecture"],
    files: {
      "src/useControllableState.tsx": {
        starter: text`
          import { useCallback, useState } from "react";

          export function useControllableState<T>(options: {
            value?: T;
            defaultValue: T;
            onChange?: (value: T) => void;
          }): [T, (next: T) => void] {
            // TODO: support controlled and uncontrolled modes.
            const [value, setValue] = useState(options.defaultValue);
            return [value, setValue];
          }
        `,
        solution: text`
          import { useCallback, useState } from "react";

          export function useControllableState<T>(options: {
            value?: T;
            defaultValue: T;
            onChange?: (value: T) => void;
          }): [T, (next: T) => void] {
            const isControlled = options.value !== undefined;
            const [internalValue, setInternalValue] = useState(options.defaultValue);
            const currentValue = isControlled ? options.value as T : internalValue;
            const setValue = useCallback((next: T) => {
              if (!isControlled) setInternalValue(next);
              options.onChange?.(next);
            }, [isControlled, options.onChange]);
            return [currentValue, setValue];
          }
        `,
      },
    },
    checks: [
      { file: "src/useControllableState.tsx", includes: "isControlled" },
      { file: "src/useControllableState.tsx", includes: "useCallback" },
      { file: "src/useControllableState.tsx", includes: "options.onChange?.(next)" },
    ],
  },
  {
    id: "ts-react/react-architecture/002-compound-components-context",
    title: "Compound Components with Context",
    topic: "react-architecture",
    focus: "compound component APIs and explicit context contracts",
    task: "Complete the tabs API so `Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, and `Tabs.Panel` share state through a typed context and fail loudly outside the provider.",
    objectives: ["Design compound components", "Create typed context helpers", "Keep provider boundaries explicit"],
    tags: ["react", "compound-components", "context"],
    files: {
      "src/tabs.tsx": {
        starter: text`
          import { createContext, useContext, useState } from "react";

          type TabsContextValue = { value: string; setValue(value: string): void };
          const TabsContext = createContext<TabsContextValue | null>(null);

          function useTabsContext() {
            // TODO: read context and throw outside Tabs.Root.
            return useContext(TabsContext);
          }

          export const Tabs = {
            Root(props: { defaultValue: string; children: React.ReactNode }) {
              const [value, setValue] = useState(props.defaultValue);
              return props.children;
            },
            List(props: { children: React.ReactNode }) { return <div role="tablist">{props.children}</div>; },
            Trigger(props: { value: string; children: React.ReactNode }) { return <button>{props.children}</button>; },
            Panel(props: { value: string; children: React.ReactNode }) { return <div>{props.children}</div>; },
          };
        `,
        solution: text`
          import { createContext, useContext, useMemo, useState } from "react";

          type TabsContextValue = { value: string; setValue(value: string): void };
          const TabsContext = createContext<TabsContextValue | null>(null);

          function useTabsContext() {
            const context = useContext(TabsContext);
            if (!context) throw new Error("Tabs components must be used inside Tabs.Root");
            return context;
          }

          export const Tabs = {
            Root(props: { defaultValue: string; children: React.ReactNode }) {
              const [value, setValue] = useState(props.defaultValue);
              const contextValue = useMemo(() => ({ value, setValue }), [value]);
              return <TabsContext.Provider value={contextValue}>{props.children}</TabsContext.Provider>;
            },
            List(props: { children: React.ReactNode }) { return <div role="tablist">{props.children}</div>; },
            Trigger(props: { value: string; children: React.ReactNode }) {
              const { value, setValue } = useTabsContext();
              return <button role="tab" aria-selected={value === props.value} onClick={() => setValue(props.value)}>{props.children}</button>;
            },
            Panel(props: { value: string; children: React.ReactNode }) {
              const { value } = useTabsContext();
              return value === props.value ? <div role="tabpanel">{props.children}</div> : null;
            },
          };
        `,
      },
    },
    checks: [
      { file: "src/tabs.tsx", includes: "TabsContext.Provider" },
      { file: "src/tabs.tsx", includes: "throw new Error" },
      { file: "src/tabs.tsx", includes: "aria-selected" },
      { file: "src/tabs.tsx", includes: "role=\"tabpanel\"" },
    ],
  },
  {
    id: "ts-react/react-architecture/003-use-sync-external-store",
    title: "External Store Subscription",
    topic: "react-architecture",
    focus: "the external store pattern and React's subscription contract",
    task: "Implement a small external counter store and `useCounterStore` with `useSyncExternalStore`.",
    objectives: ["Use useSyncExternalStore", "Separate mutation from subscription", "Return consistent snapshots"],
    tags: ["react", "external-store", "useSyncExternalStore"],
    files: {
      "src/counterStore.tsx": {
        starter: text`
          import { useState } from "react";

          let count = 0;
          const listeners = new Set<() => void>();

          export const counterStore = {
            getSnapshot: () => count,
            subscribe(listener: () => void) {
              // TODO: register listener and return unsubscribe.
              return () => {};
            },
            increment() {
              count += 1;
            },
          };

          export function useCounterStore() {
            // TODO: use useSyncExternalStore.
            return useState(count)[0];
          }
        `,
        solution: text`
          import { useSyncExternalStore } from "react";

          let count = 0;
          const listeners = new Set<() => void>();

          export const counterStore = {
            getSnapshot: () => count,
            subscribe(listener: () => void) {
              listeners.add(listener);
              return () => listeners.delete(listener);
            },
            increment() {
              count += 1;
              listeners.forEach(listener => listener());
            },
          };

          export function useCounterStore() {
            return useSyncExternalStore(counterStore.subscribe, counterStore.getSnapshot, counterStore.getSnapshot);
          }
        `,
      },
    },
    checks: [
      { file: "src/counterStore.tsx", includes: "useSyncExternalStore" },
      { file: "src/counterStore.tsx", includes: "listeners.add(listener)" },
      { file: "src/counterStore.tsx", includes: "listeners.delete(listener)" },
      { file: "src/counterStore.tsx", includes: "listeners.forEach" },
    ],
  },
  {
    id: "ts-react/react-architecture/004-error-boundary-reset",
    title: "Error Boundary Reset Keys",
    topic: "react-architecture",
    focus: "error boundaries that recover when reset keys change",
    task: "Complete the class error boundary so it captures errors, renders fallback UI, and clears error state when `resetKey` changes.",
    objectives: ["Implement error boundary lifecycle methods", "Support recoverable UI boundaries", "Keep reset behavior explicit"],
    tags: ["react", "error-boundaries"],
    files: {
      "src/ErrorBoundary.tsx": {
        starter: text`
          import { Component, ReactNode } from "react";

          type Props = { resetKey: string; fallback(error: Error): ReactNode; children: ReactNode };
          type State = { error: Error | null };

          export class ErrorBoundary extends Component<Props, State> {
            state: State = { error: null };
            // TODO: capture errors and reset when resetKey changes.
            render() {
              return this.props.children;
            }
          }
        `,
        solution: text`
          import { Component, ReactNode } from "react";

          type Props = { resetKey: string; fallback(error: Error): ReactNode; children: ReactNode };
          type State = { error: Error | null };

          export class ErrorBoundary extends Component<Props, State> {
            state: State = { error: null };
            static getDerivedStateFromError(error: Error): State {
              return { error };
            }
            componentDidUpdate(prevProps: Props) {
              if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
                this.setState({ error: null });
              }
            }
            render() {
              if (this.state.error) return this.props.fallback(this.state.error);
              return this.props.children;
            }
          }
        `,
      },
    },
    checks: [
      { file: "src/ErrorBoundary.tsx", includes: "getDerivedStateFromError" },
      { file: "src/ErrorBoundary.tsx", includes: "componentDidUpdate" },
      { file: "src/ErrorBoundary.tsx", includes: "prevProps.resetKey !== this.props.resetKey" },
      { file: "src/ErrorBoundary.tsx", includes: "fallback(this.state.error)" },
    ],
  },
  {
    id: "ts-react/react-architecture/005-suspense-resource",
    title: "Suspense Resource Contract",
    topic: "react-architecture",
    focus: "Suspense-style resources that throw promises while pending and errors when rejected",
    task: "Complete `createResource`. `read()` should return data, throw the pending promise, or throw the rejection error depending on status.",
    objectives: ["Understand Suspense read contracts", "Model async status transitions", "Separate loading from rendering"],
    tags: ["react", "suspense", "async-ui"],
    files: {
      "src/resource.ts": {
        starter: text`
          export function createResource<T>(load: () => Promise<T>) {
            // TODO: track pending, success, and error states.
            const promise = load();
            return {
              read(): T {
                throw promise;
              },
            };
          }
        `,
        solution: text`
          type Status = "pending" | "success" | "error";

          export function createResource<T>(load: () => Promise<T>) {
            let status: Status = "pending";
            let value: T;
            let error: unknown;
            const promise = load().then(
              result => { status = "success"; value = result; },
              reason => { status = "error"; error = reason; },
            );
            return {
              read(): T {
                if (status === "pending") throw promise;
                if (status === "error") throw error;
                return value;
              },
            };
          }
        `,
      },
    },
    checks: [
      { file: "src/resource.ts", includes: "status === \"pending\"" },
      { file: "src/resource.ts", includes: "status === \"error\"" },
      { file: "src/resource.ts", includes: "throw promise" },
      { file: "src/resource.ts", includes: "return value" },
    ],
  },
  {
    id: "ts-react/react-architecture/006-state-colocation",
    title: "State Colocation Refactor",
    topic: "react-architecture",
    focus: "state colocation and reducing global rerenders in component trees",
    task: "Refactor the dashboard sketch so search text is owned by `SearchBox` and only committed upward through `onCommit`.",
    objectives: ["Colocate transient state", "Reduce parent render pressure", "Expose committed events instead of every keystroke"],
    tags: ["react", "state-colocation", "architecture"],
    files: {
      "src/Dashboard.tsx": {
        starter: text`
          import { useState } from "react";

          export function Dashboard() {
            const [query, setQuery] = useState("");
            // TODO: move transient input state into SearchBox.
            return <SearchBox value={query} onChange={setQuery} />;
          }

          function SearchBox(props: { value: string; onChange(value: string): void }) {
            return <input value={props.value} onChange={event => props.onChange(event.currentTarget.value)} />;
          }
        `,
        solution: text`
          import { useState } from "react";

          export function Dashboard() {
            const [query, setQuery] = useState("");
            return <SearchBox initialValue={query} onCommit={setQuery} />;
          }

          function SearchBox(props: { initialValue: string; onCommit(value: string): void }) {
            const [draft, setDraft] = useState(props.initialValue);
            return (
              <form onSubmit={event => { event.preventDefault(); props.onCommit(draft); }}>
                <input value={draft} onChange={event => setDraft(event.currentTarget.value)} />
              </form>
            );
          }
        `,
      },
    },
    checks: [
      { file: "src/Dashboard.tsx", includes: "initialValue" },
      { file: "src/Dashboard.tsx", includes: "onCommit" },
      { file: "src/Dashboard.tsx", includes: "const [draft, setDraft]" },
      { file: "src/Dashboard.tsx", includes: "preventDefault" },
    ],
  },
  {
    id: "ts-react/react-architecture/007-context-performance-split",
    title: "Split Context for Render Performance",
    topic: "react-architecture",
    focus: "context value identity and splitting state/actions to reduce rerenders",
    task: "Split the settings context into a state context and an actions context with memoized action values.",
    objectives: ["Avoid broad context invalidation", "Memoize provider values", "Design context APIs for repeated use"],
    tags: ["react", "context", "performance"],
    files: {
      "src/settingsContext.tsx": {
        starter: text`
          import { createContext, useContext, useState } from "react";
          type Settings = { theme: "light" | "dark" };
          const SettingsContext = createContext<{ settings: Settings; setTheme(theme: Settings["theme"]): void } | null>(null);
          export function SettingsProvider(props: { children: React.ReactNode }) {
            const [settings, setSettings] = useState<Settings>({ theme: "light" });
            // TODO: split state and actions into separate contexts.
            return <SettingsContext.Provider value={{ settings, setTheme: theme => setSettings({ theme }) }}>{props.children}</SettingsContext.Provider>;
          }
          export const useSettings = () => useContext(SettingsContext);
        `,
        solution: text`
          import { createContext, useContext, useMemo, useState } from "react";
          type Settings = { theme: "light" | "dark" };
          const SettingsStateContext = createContext<Settings | null>(null);
          const SettingsActionsContext = createContext<{ setTheme(theme: Settings["theme"]): void } | null>(null);
          export function SettingsProvider(props: { children: React.ReactNode }) {
            const [settings, setSettings] = useState<Settings>({ theme: "light" });
            const actions = useMemo(() => ({ setTheme: (theme: Settings["theme"]) => setSettings({ theme }) }), []);
            return (
              <SettingsActionsContext.Provider value={actions}>
                <SettingsStateContext.Provider value={settings}>{props.children}</SettingsStateContext.Provider>
              </SettingsActionsContext.Provider>
            );
          }
          export const useSettings = () => useContext(SettingsStateContext);
          export const useSettingsActions = () => useContext(SettingsActionsContext);
        `,
      },
    },
    checks: [
      { file: "src/settingsContext.tsx", includes: "SettingsStateContext" },
      { file: "src/settingsContext.tsx", includes: "SettingsActionsContext" },
      { file: "src/settingsContext.tsx", includes: "useMemo" },
      { file: "src/settingsContext.tsx", includes: "useSettingsActions" },
    ],
  },
  {
    id: "ts-react/performance/001-memoization-dependencies",
    title: "Memoization Dependency Traps",
    topic: "performance",
    focus: "memoization dependencies and avoiding object identity churn",
    task: "Refactor the list filter so `useMemo` depends on primitive values instead of a freshly-created options object.",
    objectives: ["Spot unstable dependencies", "Use memoization only around real work", "Keep dependency arrays honest"],
    tags: ["react", "performance", "memoization"],
    files: {
      "src/filterList.tsx": {
        starter: text`
          import { useMemo } from "react";
          export function FilteredList(props: { items: string[]; query: string; limit: number }) {
            const options = { query: props.query, limit: props.limit };
            // TODO: remove object dependency churn.
            const visible = useMemo(() => props.items.filter(item => item.includes(options.query)).slice(0, options.limit), [props.items, options]);
            return <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>;
          }
        `,
        solution: text`
          import { useMemo } from "react";
          export function FilteredList(props: { items: string[]; query: string; limit: number }) {
            const visible = useMemo(
              () => props.items.filter(item => item.includes(props.query)).slice(0, props.limit),
              [props.items, props.query, props.limit],
            );
            return <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>;
          }
        `,
      },
    },
    checks: [
      { file: "src/filterList.tsx", includes: "[props.items, props.query, props.limit]" },
      { file: "src/filterList.tsx", excludes: "const options = {" },
    ],
  },
  {
    id: "ts-react/performance/002-virtual-window",
    title: "Virtualization Window Calculation",
    topic: "performance",
    focus: "virtualized list math and overscan boundaries",
    task: "Implement `getVisibleRange` so it returns clamped start and end indexes for fixed-height virtualized rows with overscan.",
    objectives: ["Compute visible list windows", "Clamp ranges safely", "Separate rendering math from React components"],
    tags: ["react", "performance", "virtualization"],
    files: {
      "src/windowing.ts": {
        starter: text`
          export function getVisibleRange(input: { scrollTop: number; viewportHeight: number; rowHeight: number; count: number; overscan: number }) {
            // TODO: calculate clamped start and end indexes.
            return { start: 0, end: 0 };
          }
        `,
        solution: text`
          export function getVisibleRange(input: { scrollTop: number; viewportHeight: number; rowHeight: number; count: number; overscan: number }) {
            const firstVisible = Math.floor(input.scrollTop / input.rowHeight);
            const visibleCount = Math.ceil(input.viewportHeight / input.rowHeight);
            const start = Math.max(0, firstVisible - input.overscan);
            const end = Math.min(input.count, firstVisible + visibleCount + input.overscan);
            return { start, end };
          }
        `,
      },
    },
    checks: [
      { file: "src/windowing.ts", includes: "Math.floor" },
      { file: "src/windowing.ts", includes: "Math.ceil" },
      { file: "src/windowing.ts", includes: "Math.max(0" },
      { file: "src/windowing.ts", includes: "Math.min(input.count" },
    ],
  },
  {
    id: "ts-react/performance/003-expensive-selector-cache",
    title: "Expensive Selector Cache",
    topic: "performance",
    focus: "selector memoization and cache invalidation by input identity",
    task: "Implement a selector factory that caches the last input array and query, returning the previous result when both are unchanged.",
    objectives: ["Memoize expensive selectors", "Avoid global stale caches", "Reason about identity and query keys"],
    tags: ["react", "performance", "selectors"],
    files: {
      "src/createFilteredSelector.ts": {
        starter: text`
          export function createFilteredSelector() {
            // TODO: cache by items identity and query.
            return (items: string[], query: string) => items.filter(item => item.includes(query));
          }
        `,
        solution: text`
          export function createFilteredSelector() {
            let lastItems: string[] | null = null;
            let lastQuery = "";
            let lastResult: string[] = [];
            return (items: string[], query: string) => {
              if (items === lastItems && query === lastQuery) return lastResult;
              lastItems = items;
              lastQuery = query;
              lastResult = items.filter(item => item.includes(query));
              return lastResult;
            };
          }
        `,
      },
    },
    checks: [
      { file: "src/createFilteredSelector.ts", includes: "lastItems" },
      { file: "src/createFilteredSelector.ts", includes: "lastQuery" },
      { file: "src/createFilteredSelector.ts", includes: "return lastResult" },
    ],
  },
  {
    id: "ts-react/performance/004-lazy-bundle-splitting",
    title: "Lazy Bundle Splitting",
    topic: "performance",
    focus: "route-level lazy loading and Suspense fallbacks",
    task: "Convert the reports route to a lazy import wrapped in `Suspense` with a stable fallback.",
    objectives: ["Use React.lazy", "Place Suspense boundaries intentionally", "Split bundles at route boundaries"],
    tags: ["react", "performance", "lazy-loading", "bundles"],
    files: {
      "src/routes.tsx": {
        starter: text`
          import ReportsPage from "./ReportsPage";

          export function ReportsRoute() {
            // TODO: lazy-load ReportsPage behind Suspense.
            return <ReportsPage />;
          }
        `,
        solution: text`
          import { lazy, Suspense } from "react";

          const ReportsPage = lazy(() => import("./ReportsPage"));

          export function ReportsRoute() {
            return (
              <Suspense fallback={<div role="status">Loading reports</div>}>
                <ReportsPage />
              </Suspense>
            );
          }
        `,
      },
    },
    checks: [
      { file: "src/routes.tsx", includes: "lazy(() => import" },
      { file: "src/routes.tsx", includes: "Suspense" },
      { file: "src/routes.tsx", includes: "fallback=" },
    ],
  },
  {
    id: "ts-react/performance/005-hydration-mismatch",
    title: "Hydration Mismatch Debugging",
    topic: "performance",
    focus: "SSR hydration stability and avoiding render-time nondeterminism",
    task: "Refactor the component so the server and first client render are deterministic; move `Date.now()` into an effect after hydration.",
    objectives: ["Recognize hydration mismatch sources", "Keep initial render deterministic", "Use effects for client-only values"],
    tags: ["react", "ssr", "hydration"],
    files: {
      "src/HydrationSafeClock.tsx": {
        starter: text`
          export function HydrationSafeClock() {
            // TODO: Date.now during render causes hydration mismatches.
            return <time>{Date.now()}</time>;
          }
        `,
        solution: text`
          import { useEffect, useState } from "react";

          export function HydrationSafeClock() {
            const [timestamp, setTimestamp] = useState<number | null>(null);
            useEffect(() => {
              setTimestamp(Date.now());
            }, []);
            return <time>{timestamp === null ? "pending" : timestamp}</time>;
          }
        `,
      },
    },
    checks: [
      { file: "src/HydrationSafeClock.tsx", includes: "useEffect" },
      { file: "src/HydrationSafeClock.tsx", includes: "useState<number | null>" },
      { file: "src/HydrationSafeClock.tsx", includes: "setTimestamp(Date.now())" },
    ],
  },
  {
    id: "ts-react/testing/001-async-ui-fake-timers",
    title: "Testing Async UI with Fake Timers",
    topic: "testing",
    focus: "fake timers and observable async UI states",
    task: "Complete the Vitest test so it uses fake timers, advances the debounce delay, and asserts the committed search text.",
    objectives: ["Test debounced UI deterministically", "Use fake timers", "Assert user-visible behavior"],
    tags: ["react", "testing", "vitest", "fake-timers"],
    files: {
      "src/search.test.tsx": {
        starter: text`
          import { describe, expect, it, vi } from "vitest";

          describe("SearchBox", () => {
            it("commits after the debounce", async () => {
              // TODO: use vi.useFakeTimers, advanceTimersByTimeAsync, and assert committed text.
              expect(true).toBe(true);
            });
          });
        `,
        solution: text`
          import { describe, expect, it, vi } from "vitest";
          import { render, screen } from "@testing-library/react";
          import userEvent from "@testing-library/user-event";
          import { SearchBox } from "./SearchBox";

          describe("SearchBox", () => {
            it("commits after the debounce", async () => {
              vi.useFakeTimers();
              const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
              render(<SearchBox debounceMs={300} />);
              await user.type(screen.getByRole("searchbox"), "react");
              await vi.advanceTimersByTimeAsync(300);
              expect(screen.getByText("react")).toBeInTheDocument();
              vi.useRealTimers();
            });
          });
        `,
      },
    },
    checks: [
      { file: "src/search.test.tsx", includes: "vi.useFakeTimers()" },
      { file: "src/search.test.tsx", includes: "advanceTimersByTimeAsync" },
      { file: "src/search.test.tsx", includes: "userEvent.setup" },
      { file: "src/search.test.tsx", includes: "getByRole(\"searchbox\")" },
    ],
  },
  {
    id: "ts-react/testing/002-network-mocking",
    title: "Network Mocking Contracts",
    topic: "testing",
    focus: "mocked network handlers and realistic request assertions",
    task: "Write MSW-style handlers for the user search endpoint and assert the UI renders returned users without stubbing component internals.",
    objectives: ["Mock at the network boundary", "Keep tests close to user behavior", "Assert request contract shape"],
    tags: ["react", "testing", "network-mocking", "msw"],
    files: {
      "src/users.test.tsx": {
        starter: text`
          import { describe, expect, it } from "vitest";

          describe("UserSearch", () => {
            it("renders users from the API", async () => {
              // TODO: mock GET /api/users?q=ada at the network boundary.
              expect(true).toBe(true);
            });
          });
        `,
        solution: text`
          import { http, HttpResponse } from "msw";
          import { setupServer } from "msw/node";
          import { describe, expect, it } from "vitest";
          import { render, screen } from "@testing-library/react";
          import { UserSearch } from "./UserSearch";

          const server = setupServer(
            http.get("/api/users", ({ request }) => {
              const q = new URL(request.url).searchParams.get("q");
              if (q !== "ada") return HttpResponse.json([], { status: 400 });
              return HttpResponse.json([{ id: "1", name: "Ada Lovelace" }]);
            }),
          );

          describe("UserSearch", () => {
            it("renders users from the API", async () => {
              server.listen();
              render(<UserSearch initialQuery="ada" />);
              expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
              server.close();
            });
          });
        `,
      },
    },
    checks: [
      { file: "src/users.test.tsx", includes: "setupServer" },
      { file: "src/users.test.tsx", includes: "http.get(\"/api/users\"" },
      { file: "src/users.test.tsx", includes: "searchParams.get(\"q\")" },
      { file: "src/users.test.tsx", includes: "findByText(\"Ada Lovelace\")" },
    ],
  },
  {
    id: "ts-react/testing/003-custom-hook-act-cleanup",
    title: "Testing Custom Hooks",
    topic: "testing",
    focus: "hook tests that use act and verify cleanup behavior",
    task: "Complete the hook test so it renders the hook, updates it through `act`, unmounts, and verifies the subscription cleanup ran.",
    objectives: ["Use renderHook", "Wrap state changes in act", "Verify cleanup explicitly"],
    tags: ["react", "testing", "custom-hooks"],
    files: {
      "src/useSubscription.test.tsx": {
        starter: text`
          import { describe, expect, it } from "vitest";

          describe("useSubscription", () => {
            it("cleans up subscriptions", () => {
              // TODO: renderHook, act, unmount, and assert unsubscribe.
              expect(true).toBe(true);
            });
          });
        `,
        solution: text`
          import { act, renderHook } from "@testing-library/react";
          import { describe, expect, it, vi } from "vitest";
          import { useSubscription } from "./useSubscription";

          describe("useSubscription", () => {
            it("cleans up subscriptions", () => {
              const unsubscribe = vi.fn();
              const subscribe = vi.fn(() => unsubscribe);
              const { result, unmount } = renderHook(() => useSubscription(subscribe));
              act(() => result.current.refresh());
              unmount();
              expect(subscribe).toHaveBeenCalled();
              expect(unsubscribe).toHaveBeenCalledTimes(1);
            });
          });
        `,
      },
    },
    checks: [
      { file: "src/useSubscription.test.tsx", includes: "renderHook" },
      { file: "src/useSubscription.test.tsx", includes: "act(()" },
      { file: "src/useSubscription.test.tsx", includes: "unmount()" },
      { file: "src/useSubscription.test.tsx", includes: "toHaveBeenCalledTimes(1)" },
    ],
  },
  {
    id: "ts-react/testing/004-accessibility-flow",
    title: "Accessibility-Oriented Flow Test",
    topic: "testing",
    focus: "testing complex UI through roles, names, and focus behavior",
    task: "Complete the dialog test using role/name queries. Open the dialog, assert focus moves inside, close with Escape, and assert focus returns.",
    objectives: ["Prefer role-based queries", "Test keyboard behavior", "Assert focus management"],
    tags: ["react", "testing", "accessibility"],
    files: {
      "src/dialog.test.tsx": {
        starter: text`
          import { describe, expect, it } from "vitest";

          describe("SettingsDialog", () => {
            it("supports keyboard open and close", async () => {
              // TODO: use getByRole, user.keyboard, and focus assertions.
              expect(true).toBe(true);
            });
          });
        `,
        solution: text`
          import { render, screen } from "@testing-library/react";
          import userEvent from "@testing-library/user-event";
          import { describe, expect, it } from "vitest";
          import { SettingsDialog } from "./SettingsDialog";

          describe("SettingsDialog", () => {
            it("supports keyboard open and close", async () => {
              const user = userEvent.setup();
              render(<SettingsDialog />);
              const trigger = screen.getByRole("button", { name: /settings/i });
              await user.click(trigger);
              const dialog = screen.getByRole("dialog", { name: /settings/i });
              expect(dialog).toHaveFocus();
              await user.keyboard("{Escape}");
              expect(trigger).toHaveFocus();
            });
          });
        `,
      },
    },
    checks: [
      { file: "src/dialog.test.tsx", includes: "getByRole(\"button\"" },
      { file: "src/dialog.test.tsx", includes: "getByRole(\"dialog\"" },
      { file: "src/dialog.test.tsx", includes: "user.keyboard(\"{Escape}\")" },
      { file: "src/dialog.test.tsx", includes: "toHaveFocus()" },
    ],
  },
  {
    id: "ts-react/webpack/001-code-splitting",
    title: "Webpack Code Splitting",
    topic: "webpack",
    focus: "webpack splitChunks configuration and stable runtime chunks",
    task: "Update the webpack config so vendor code is split, runtime is single, and chunk filenames include content hashes.",
    objectives: ["Configure splitChunks", "Understand runtimeChunk", "Use cache-friendly output names"],
    tags: ["webpack", "bundlers", "code-splitting"],
    files: {
      "webpack.config.js": {
        starter: text`
          module.exports = {
            mode: "production",
            entry: "./src/index.tsx",
            output: { filename: "bundle.js" },
            // TODO: add production-grade splitting.
          };
        `,
        solution: text`
          module.exports = {
            mode: "production",
            entry: "./src/index.tsx",
            output: {
              filename: "[name].[contenthash].js",
              chunkFilename: "[name].[contenthash].js",
              clean: true,
            },
            optimization: {
              runtimeChunk: "single",
              splitChunks: {
                chunks: "all",
                cacheGroups: {
                  vendor: {
                    test: /[\\\\/]node_modules[\\\\/]/,
                    name: "vendors",
                    chunks: "all",
                  },
                },
              },
            },
          };
        `,
      },
    },
    checks: [
      { file: "webpack.config.js", includes: "splitChunks" },
      { file: "webpack.config.js", includes: "runtimeChunk: \"single\"" },
      { file: "webpack.config.js", includes: "[contenthash]" },
      { file: "webpack.config.js", includes: "node_modules" },
    ],
  },
  {
    id: "ts-react/webpack/002-loader-plugin-order",
    title: "Webpack Loader and Plugin Order",
    topic: "webpack",
    focus: "loader ordering and plugin responsibilities in webpack builds",
    task: "Fix the config so TypeScript runs through Babel after `ts-loader`, CSS uses `style-loader` before `css-loader`, and `DefinePlugin` injects a compile-time flag.",
    objectives: ["Reason about loader execution order", "Separate loaders from plugins", "Inject env flags safely"],
    tags: ["webpack", "loaders", "plugins"],
    files: {
      "webpack.config.js": {
        starter: text`
          const webpack = require("webpack");
          module.exports = {
            module: { rules: [] },
            plugins: [
              // TODO: inject __DEV__.
            ],
          };
        `,
        solution: text`
          const webpack = require("webpack");
          module.exports = {
            module: {
              rules: [
                { test: /\\.tsx?$/, use: ["babel-loader", "ts-loader"], exclude: /node_modules/ },
                { test: /\\.css$/, use: ["style-loader", "css-loader"] },
              ],
            },
            plugins: [
              new webpack.DefinePlugin({ __DEV__: JSON.stringify(process.env.NODE_ENV !== "production") }),
            ],
          };
        `,
      },
    },
    checks: [
      { file: "webpack.config.js", includes: "\"babel-loader\", \"ts-loader\"" },
      { file: "webpack.config.js", includes: "\"style-loader\", \"css-loader\"" },
      { file: "webpack.config.js", includes: "DefinePlugin" },
      { file: "webpack.config.js", includes: "__DEV__" },
    ],
  },
  {
    id: "ts-react/rspack/001-react-refresh",
    title: "Rspack React Refresh Config",
    topic: "rspack",
    focus: "Rspack development config for React fast refresh and TypeScript",
    task: "Complete the Rspack config with React refresh in development, TypeScript/TSX support, and a dev server history fallback.",
    objectives: ["Map webpack concepts to Rspack", "Configure React refresh", "Support SPA dev server fallback"],
    tags: ["rspack", "bundlers", "react-refresh"],
    files: {
      "rspack.config.js": {
        starter: text`
          const { defineConfig } = require("@rspack/cli");
          module.exports = defineConfig({
            // TODO: add React development tooling.
          });
        `,
        solution: text`
          const { defineConfig } = require("@rspack/cli");
          const ReactRefreshPlugin = require("@rspack/plugin-react-refresh");
          const isDev = process.env.NODE_ENV !== "production";
          module.exports = defineConfig({
            mode: isDev ? "development" : "production",
            module: {
              rules: [{ test: /\\.tsx?$/, loader: "builtin:swc-loader", options: { jsc: { parser: { syntax: "typescript", tsx: true }, transform: { react: { runtime: "automatic", refresh: isDev } } } } }],
            },
            plugins: [isDev && new ReactRefreshPlugin()].filter(Boolean),
            devServer: { historyApiFallback: true },
          });
        `,
      },
    },
    checks: [
      { file: "rspack.config.js", includes: "ReactRefreshPlugin" },
      { file: "rspack.config.js", includes: "builtin:swc-loader" },
      { file: "rspack.config.js", includes: "historyApiFallback: true" },
      { file: "rspack.config.js", includes: "refresh: isDev" },
    ],
  },
  {
    id: "ts-react/bundlers/001-vite-env-proxy",
    title: "Vite Env and Dev Proxy",
    topic: "bundlers",
    focus: "Vite config for env prefixes, aliases, sourcemaps, and dev proxying",
    task: "Complete `vite.config.ts` with the React plugin, `@` alias, strict env prefix, production sourcemaps, and `/api` proxy.",
    objectives: ["Configure Vite for app ergonomics", "Understand env exposure", "Proxy local API calls"],
    tags: ["vite", "bundlers", "dev-server"],
    files: {
      "vite.config.ts": {
        starter: text`
          import { defineConfig } from "vite";

          export default defineConfig({
            // TODO: add React plugin, alias, envPrefix, sourcemap, and proxy.
          });
        `,
        solution: text`
          import react from "@vitejs/plugin-react";
          import { defineConfig } from "vite";
          import { fileURLToPath, URL } from "node:url";

          export default defineConfig({
            plugins: [react()],
            envPrefix: "APP_",
            resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
            build: { sourcemap: true },
            server: { proxy: { "/api": "http://localhost:3000" } },
          });
        `,
      },
    },
    checks: [
      { file: "vite.config.ts", includes: "react()" },
      { file: "vite.config.ts", includes: "envPrefix: \"APP_\"" },
      { file: "vite.config.ts", includes: "\"@\"" },
      { file: "vite.config.ts", includes: "sourcemap: true" },
      { file: "vite.config.ts", includes: "\"/api\"" },
    ],
  },
  {
    id: "ts-react/bundlers/002-tree-shaking-side-effects",
    title: "Tree Shaking and Side Effects",
    topic: "bundlers",
    focus: "package sideEffects metadata and import shapes that preserve tree shaking",
    task: "Fix package metadata and imports so only CSS is marked side-effectful and components are imported from ESM entrypoints.",
    objectives: ["Use sideEffects correctly", "Avoid barrel imports that hide costs", "Reason about tree-shakable package design"],
    tags: ["bundlers", "tree-shaking", "package-json"],
    files: {
      "package.json": {
        starter: text`
          {
            "name": "@acme/ui",
            "main": "dist/index.cjs",
            "sideEffects": true
          }
        `,
        solution: text`
          {
            "name": "@acme/ui",
            "type": "module",
            "exports": {
              ".": {
                "types": "./dist/index.d.ts",
                "import": "./dist/index.js"
              }
            },
            "sideEffects": [
              "**/*.css"
            ]
          }
        `,
      },
      "src/consumer.ts": {
        starter: "import { Button } from \"@acme/ui/all\";\n// TODO: import from the tree-shakable package entry.\nvoid Button;\n",
        solution: "import { Button } from \"@acme/ui\";\nvoid Button;\n",
      },
    },
    checks: [
      { file: "package.json", includes: "\"sideEffects\": [" },
      { file: "package.json", includes: "\"**/*.css\"" },
      { file: "package.json", includes: "\"exports\"" },
      { file: "src/consumer.ts", includes: "from \"@acme/ui\"" },
      { file: "src/consumer.ts", excludes: "@acme/ui/all" },
    ],
  },
  {
    id: "ts-react/microfrontends/001-module-federation-host",
    title: "Module Federation Host Contract",
    topic: "microfrontends",
    focus: "host-side module federation configuration and remote contracts",
    task: "Complete the host config with `ModuleFederationPlugin`, a named remote, exposed shared dependencies, and singleton React.",
    objectives: ["Configure federation hosts", "Declare remote entry contracts", "Share React safely"],
    tags: ["microfrontends", "module-federation", "webpack"],
    files: {
      "webpack.config.js": {
        starter: text`
          const { ModuleFederationPlugin } = require("webpack").container;
          module.exports = {
            plugins: [
              // TODO: configure host remotes and shared React.
            ],
          };
        `,
        solution: text`
          const { ModuleFederationPlugin } = require("webpack").container;
          module.exports = {
            plugins: [
              new ModuleFederationPlugin({
                name: "shell",
                remotes: {
                  reports: "reports@https://cdn.example.com/reports/remoteEntry.js",
                },
                shared: {
                  react: { singleton: true, requiredVersion: "^18.2.0" },
                  "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
                },
              }),
            ],
          };
        `,
      },
    },
    checks: [
      { file: "webpack.config.js", includes: "new ModuleFederationPlugin" },
      { file: "webpack.config.js", includes: "remotes" },
      { file: "webpack.config.js", includes: "reports@" },
      { file: "webpack.config.js", includes: "singleton: true" },
    ],
  },
  {
    id: "ts-react/microfrontends/002-shared-version-mismatch",
    title: "Shared Dependency Version Mismatch",
    topic: "microfrontends",
    focus: "singleton shared dependencies and strict version constraints",
    task: "Adjust the shared config so React and React DOM are singletons with strict version checks and required versions sourced from package metadata.",
    objectives: ["Reason about shared dependency contracts", "Avoid duplicate React", "Surface version mismatches early"],
    tags: ["microfrontends", "module-federation", "shared-dependencies"],
    files: {
      "federation.shared.js": {
        starter: text`
          const deps = require("./package.json").dependencies;
          module.exports = {
            react: deps.react,
            "react-dom": deps["react-dom"],
            // TODO: make shared config strict and singleton.
          };
        `,
        solution: text`
          const deps = require("./package.json").dependencies;
          module.exports = {
            react: { singleton: true, strictVersion: true, requiredVersion: deps.react },
            "react-dom": { singleton: true, strictVersion: true, requiredVersion: deps["react-dom"] },
          };
        `,
      },
    },
    checks: [
      { file: "federation.shared.js", includes: "singleton: true" },
      { file: "federation.shared.js", includes: "strictVersion: true" },
      { file: "federation.shared.js", includes: "requiredVersion: deps.react" },
      { file: "federation.shared.js", includes: "requiredVersion: deps[\"react-dom\"]" },
    ],
  },
  {
    id: "ts-react/microfrontends/003-runtime-remote-fallback",
    title: "Runtime Remote Fallback UI",
    topic: "microfrontends",
    focus: "runtime remote loading and resilient fallback behavior",
    task: "Implement `loadRemoteWidget` so remote loading failures return a local fallback component instead of breaking the host route.",
    objectives: ["Handle remote runtime failures", "Keep host UI resilient", "Type remote component contracts"],
    tags: ["microfrontends", "runtime-loading", "fallback-ui"],
    files: {
      "src/loadRemoteWidget.tsx": {
        starter: text`
          export async function loadRemoteWidget() {
            // TODO: import the remote and return a fallback component on failure.
            return import("reports/Widget");
          }
        `,
        solution: text`
          import type { ComponentType } from "react";

          type WidgetModule = { default: ComponentType<{ accountId: string }> };
          const FallbackWidget: ComponentType<{ accountId: string }> = () => <section role="status">Reports unavailable</section>;

          export async function loadRemoteWidget(): Promise<WidgetModule> {
            try {
              return await import("reports/Widget") as WidgetModule;
            } catch {
              return { default: FallbackWidget };
            }
          }
        `,
      },
    },
    checks: [
      { file: "src/loadRemoteWidget.tsx", includes: "try {" },
      { file: "src/loadRemoteWidget.tsx", includes: "catch" },
      { file: "src/loadRemoteWidget.tsx", includes: "FallbackWidget" },
      { file: "src/loadRemoteWidget.tsx", includes: "ComponentType" },
    ],
  },
  {
    id: "ts-react/microfrontends/004-type-safe-remote-declarations",
    title: "Type-Safe Remote Declarations",
    topic: "microfrontends",
    focus: "ambient declarations for remote modules and host-side prop contracts",
    task: "Add an ambient module declaration for `reports/Widget` with a typed default React component.",
    objectives: ["Type remote modules", "Protect host/remote prop contracts", "Make deployment boundaries explicit"],
    tags: ["microfrontends", "typescript", "module-declarations"],
    files: {
      "src/remotes.d.ts": {
        starter: text`
          // TODO: declare the reports/Widget remote module.
        `,
        solution: text`
          declare module "reports/Widget" {
            import type { ComponentType } from "react";
            const Widget: ComponentType<{ accountId: string; onRefresh?: () => void }>;
            export default Widget;
          }
        `,
      },
    },
    checks: [
      { file: "src/remotes.d.ts", includes: "declare module \"reports/Widget\"" },
      { file: "src/remotes.d.ts", includes: "ComponentType" },
      { file: "src/remotes.d.ts", includes: "accountId: string" },
      { file: "src/remotes.d.ts", includes: "onRefresh?" },
    ],
  },
  {
    id: "ts-react/monorepo/001-pnpm-workspace-boundaries",
    title: "pnpm Workspace Boundaries",
    topic: "monorepo",
    focus: "workspace package boundaries and explicit dependency ownership",
    task: "Complete the workspace and package metadata so app imports `@acme/ui` through workspace protocol and packages expose only public entrypoints.",
    objectives: ["Use pnpm workspace globs", "Declare workspace dependencies", "Protect package API surfaces"],
    tags: ["monorepo", "pnpm", "package-boundaries"],
    files: {
      "pnpm-workspace.yaml": {
        starter: "packages: []\n# TODO: include apps and packages workspaces.\n",
        solution: "packages:\n  - \"apps/*\"\n  - \"packages/*\"\n",
      },
      "apps/web/package.json": {
        starter: "{\n  \"name\": \"web\",\n  \"dependencies\": {}\n}\n",
        solution: "{\n  \"name\": \"web\",\n  \"dependencies\": {\n    \"@acme/ui\": \"workspace:*\"\n  }\n}\n",
      },
      "packages/ui/package.json": {
        starter: "{\n  \"name\": \"@acme/ui\"\n}\n",
        solution: "{\n  \"name\": \"@acme/ui\",\n  \"exports\": {\n    \".\": {\n      \"types\": \"./dist/index.d.ts\",\n      \"import\": \"./dist/index.js\"\n    }\n  }\n}\n",
      },
    },
    checks: [
      { file: "pnpm-workspace.yaml", includes: "apps/*" },
      { file: "pnpm-workspace.yaml", includes: "packages/*" },
      { file: "apps/web/package.json", includes: "\"@acme/ui\": \"workspace:*\"" },
      { file: "packages/ui/package.json", includes: "\"exports\"" },
    ],
  },
  {
    id: "ts-react/monorepo/002-tsconfig-references",
    title: "TypeScript Project References",
    topic: "monorepo",
    focus: "project references, build ordering, and package-level compiler boundaries",
    task: "Configure references so `apps/web` depends on `packages/ui` and both projects are composite builds.",
    objectives: ["Use tsconfig references", "Enable composite package builds", "Make build order explicit"],
    tags: ["monorepo", "typescript", "project-references"],
    files: {
      "tsconfig.json": {
        starter: "{\n  \"files\": []\n}\n",
        solution: "{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"packages/ui\" },\n    { \"path\": \"apps/web\" }\n  ]\n}\n",
      },
      "apps/web/tsconfig.json": {
        starter: "{\n  \"compilerOptions\": {}\n}\n",
        solution: "{\n  \"compilerOptions\": { \"composite\": true },\n  \"references\": [\n    { \"path\": \"../../packages/ui\" }\n  ]\n}\n",
      },
      "packages/ui/tsconfig.json": {
        starter: "{\n  \"compilerOptions\": {}\n}\n",
        solution: "{\n  \"compilerOptions\": { \"composite\": true, \"declaration\": true }\n}\n",
      },
    },
    checks: [
      { file: "tsconfig.json", includes: "\"references\"" },
      { file: "apps/web/tsconfig.json", includes: "../../packages/ui" },
      { file: "apps/web/tsconfig.json", includes: "\"composite\": true" },
      { file: "packages/ui/tsconfig.json", includes: "\"declaration\": true" },
    ],
  },
  {
    id: "ts-react/design-systems/001-polymorphic-button-api",
    title: "Polymorphic Design-System Button API",
    topic: "design-systems",
    focus: "design-system component APIs, polymorphic props, and invalid state prevention",
    task: "Finish the polymorphic Button types so `as`, variant props, and native element props compose without allowing invalid variant values.",
    objectives: ["Design ergonomic component APIs", "Preserve element-specific props", "Constrain visual variants"],
    tags: ["react", "design-systems", "polymorphic-components"],
    files: {
      "src/Button.tsx": {
        starter: text`
          import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

          type Variant = string; // TODO: restrict variants.
          type ButtonOwnProps<C extends ElementType> = {
            as?: C;
            variant?: Variant;
            children: ReactNode;
          };
          export type ButtonProps<C extends ElementType> = ButtonOwnProps<C>;
          export function Button<C extends ElementType = "button">(props: ButtonProps<C>) {
            const Component = props.as ?? "button";
            return <Component>{props.children}</Component>;
          }
        `,
        solution: text`
          import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

          type Variant = "primary" | "secondary" | "danger";
          type ButtonOwnProps<C extends ElementType> = {
            as?: C;
            variant?: Variant;
            children: ReactNode;
          };
          export type ButtonProps<C extends ElementType> =
            ButtonOwnProps<C> &
            Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C>>;
          export function Button<C extends ElementType = "button">({ as, variant = "primary", children, ...rest }: ButtonProps<C>) {
            const Component = as ?? "button";
            return <Component data-variant={variant} {...rest}>{children}</Component>;
          }
        `,
      },
    },
    checks: [
      { file: "src/Button.tsx", includes: "\"primary\" | \"secondary\" | \"danger\"" },
      { file: "src/Button.tsx", includes: "ComponentPropsWithoutRef" },
      { file: "src/Button.tsx", includes: "Omit<" },
      { file: "src/Button.tsx", includes: "data-variant" },
    ],
  },
];

tsExercises.push(...staticTsDefs.map(staticExercise));

function metadataFor(ex) {
  const dir = ex.id;
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
    prerequisites: ex.prerequisites,
  };
}

async function writeGoExercise(ex) {
  const dir = ex.id;
  await writeJSON(`${dir}/exercise.json`, metadataFor(ex));
  await write(`${dir}/THEORY.md`, theoryFor(ex));
  await write(`${dir}/TASK.md`, taskFor(ex));
  await write(`${dir}/HINTS.md`, hintsFor(ex));
  for (const side of ["starter", "solution"]) {
    await write(`${dir}/${side}/go.mod`, `module drill\n\ngo 1.22\n`);
    await write(`${dir}/${side}/exercise.go`, ex[side]);
    await write(`${dir}/${side}/exercise_test.go`, ex.test);
    for (const [rel, body] of Object.entries(ex.extraFiles ?? {})) {
      await write(`${dir}/${side}/${rel}`, body);
    }
  }
}

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
      if (/TODO|throw new Error\\(["']TODO["']\\)|return null as any/.test(body)) {
        failures.push(check.file + " still contains starter TODO markers");
      }
      if (check.includes && !body.includes(check.includes)) {
        failures.push(check.file + " must include: " + check.includes);
      }
      if (check.excludes && body.includes(check.excludes)) {
        failures.push(check.file + " must not include: " + check.excludes);
      }
    }

    if (failures.length) {
      console.error(failures.map(f => "- " + f).join("\\n"));
      process.exit(1);
    }
    console.log("static checks passed");
  `.trimStart();
}

async function writeTsExercise(ex) {
  const dir = ex.id;
  await writeJSON(`${dir}/exercise.json`, metadataFor(ex));
  await write(`${dir}/THEORY.md`, theoryFor(ex));
  await write(`${dir}/TASK.md`, taskFor(ex));
  await write(`${dir}/HINTS.md`, hintsFor(ex));
  if (ex.kind === "type") {
    for (const side of ["starter", "solution"]) {
      await write(`${dir}/${side}/tsconfig.json`, text`
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
      await write(`${dir}/${side}/src/exercise.ts`, ex[side]);
      await write(`${dir}/${side}/src/exercise.test-d.ts`, ex.test);
    }
  } else {
    for (const side of ["starter", "solution"]) {
      for (const [rel, variants] of Object.entries(ex.files)) {
        await write(`${dir}/${side}/${rel}`, variants[side]);
      }
    }
    await write(`${dir}/tests/check.mjs`, staticChecker(ex.checks));
  }
}

function runnerSource() {
  return text`
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
      ].join("\\n"));
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
        console.log(\`\${meta.id.padEnd(58)} \${meta.difficulty.padEnd(14)} \${String(meta.estimated_minutes).padStart(3)}m  \${meta.title}\`);
      }
      console.log(\`\\n\${exercises.length} drills\`);
      process.exit(0);
    }

    if (cmd === "check") {
      if (!target) {
        usage();
        process.exit(1);
      }
      const matches = exercises.filter(({ meta }) => meta.id === target || meta.id.startsWith(target + "/") || meta.id.startsWith(target));
      if (matches.length === 0) {
        console.error(\`No drills match \${target}\`);
        process.exit(1);
      }
      let failures = 0;
      for (const ex of matches) {
        const command = mode === "solution" ? ex.meta.solution_check_command : ex.meta.check_command;
        const cwd = path.join(ex.dir, mode === "solution" ? ex.meta.solution_path : ex.meta.starter_path);
        console.log(\`\\n==> \${ex.meta.id} [\${mode}] :: \${command}\`);
        const code = await run(command, cwd);
        if (code !== 0) failures++;
      }
      if (failures) {
        console.error(\`\\n\${failures} drill check(s) failed\`);
        process.exit(1);
      }
      console.log(\`\\nAll \${matches.length} drill check(s) passed\`);
      process.exit(0);
    }

    console.error(\`Unknown command: \${cmd}\`);
    usage();
    process.exit(1);
  `;
}

function verifierSource() {
  return text`
    #!/usr/bin/env node
    import { spawn } from "node:child_process";
    import { existsSync, mkdirSync, writeFileSync } from "node:fs";
    import { readdir, readFile } from "node:fs/promises";
    import path from "node:path";
    import { fileURLToPath } from "node:url";

    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
    const trackRoots = ["go", "ts-react", "shell-tools"];
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
      return text.trim().split(/\\s+/).filter(Boolean).length;
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
        if (!(key in meta)) report.failures.push({ id: meta.id ?? file, phase: "metadata", error: \`missing \${key}\` });
      }
      for (const rel of [meta.theory_file, meta.task_file, "HINTS.md", meta.starter_path, meta.solution_path]) {
        if (rel && !existsSync(path.join(dir, rel))) {
          report.failures.push({ id: meta.id, phase: "files", error: \`missing \${rel}\` });
        }
      }
      if (meta.theory_file && existsSync(path.join(dir, meta.theory_file))) {
        const count = wordCount(await readFile(path.join(dir, meta.theory_file), "utf8"));
        if (count < 100 || count > 250) {
          report.failures.push({ id: meta.id, phase: "theory", error: \`theory word count \${count}, expected 100..250\` });
        }
      }
      if (meta.task_file && existsSync(path.join(dir, meta.task_file))) {
        const task = await readFile(path.join(dir, meta.task_file), "utf8");
        const badTaskLine = task.split("\\n").findIndex(line => /^ {4}(#{1,6} |- |\`\`\`)/.test(line));
        if (badTaskLine !== -1) {
          report.failures.push({ id: meta.id, phase: "task-format", error: \`indented markdown control line at \${meta.task_file}:\${badTaskLine + 1}\` });
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
    report.totals.failures = report.failures.length;
    writeFileSync(path.join(root, "tools", "verify-report.json"), JSON.stringify(report, null, 2) + "\\n");

    if (report.failures.length) {
      console.error(\`Verification failed with \${report.failures.length} issue(s). See tools/verify-report.json.\`);
      for (const failure of report.failures.slice(0, 20)) {
        console.error(\`- \${failure.id} [\${failure.phase}]: \${String(failure.error).split("\\n")[0]}\`);
      }
      process.exit(1);
    }

    console.log(\`Verified \${report.totals.exercises} drills: \${report.totals.go} Go, \${report.totals.tsReact} TS/React, \${report.totals.shellTools} shell-tools.\`);
    if (checkStarters) console.log("Starter checks were run and failed as expected.");
  `;
}

function packageJSON() {
  return {
    name: "programming-drill-system",
    version: "1.0.0",
    private: true,
    type: "module",
    packageManager: "pnpm@11.4.0",
    scripts: {
      "drill:list": "node tools/drill-runner.mjs list",
      "drill:check": "node tools/drill-runner.mjs check",
      "drill:check:go": "node tools/drill-runner.mjs check go --solution",
      "drill:check:ts": "node tools/drill-runner.mjs check ts-react --solution",
      "drill:check:shell": "node tools/drill-runner.mjs check shell-tools --solution",
      "drill:verify": "node tools/verify-drills.mjs",
      "drill:verify:starters": "node tools/verify-drills.mjs --check-starters"
    }
  };
}

function readme() {
  return text`
    # Programming Drill System

    This repository is a self-contained drill pack for practical Go foundations and advanced TypeScript/React engineering. It is not a tutorial-only repo: every drill has brief theory, a focused task, starter code with TODOs, automated checks, progressive hints, and a reference solution used by the verifier.

    Current size: 143 drills total, with 61 Go drills, 58 TypeScript/React drills, and 24 shell-tools drills.

    ## Setup
    - Required locally: Go 1.22+ and Node 20+.
    - Required for shell-tools drills: \`rg\`, GNU \`sed\`, GNU \`awk\`, \`jq\`, GNU \`xargs\`, and \`sqlite3\`.
    - Recommended: pnpm. This workspace uses pnpm scripts but has no required runtime install for the generated checkers.
    - Optional for extending React runtime tests: add Vitest, React Testing Library, and React type packages when you want to turn static drills into executable app tests.

    ## Commands
    - List drills: \`pnpm drill:list\`
    - Check one starter: \`pnpm drill:check go/foundation/001-zero-values\`
    - Check one reference solution: \`pnpm drill:check ts-react/webpack/001-code-splitting --solution\`
    - Verify all reference solutions and metadata: \`pnpm drill:verify\`
    - Verify starters are intentionally incomplete: \`pnpm drill:verify:starters\`
    - Run all Go reference checks: \`pnpm drill:check:go\`
    - Run all TS/React reference checks: \`pnpm drill:check:ts\`
    - Run all shell-tools reference checks: \`pnpm drill:check:shell\`

    Inside a Go exercise you can also run \`go test ./...\`. Inside a type-level TS exercise you can run \`tsc -p .\`. Inside a static TS/React or shell-tools exercise you can run \`node ../tests/check.mjs .\`. If your pnpm installation tries to auto-install before running scripts, use \`pnpm_config_verify_deps_before_run=false pnpm drill:list\` or call the runner directly with \`node tools/drill-runner.mjs list\`.

    ## How To Practice
    Pick one exercise, open its \`TASK.md\`, read \`THEORY.md\`, then edit files only under \`starter/\`. Run the root check command until it passes. Use \`HINTS.md\` progressively when stuck. Avoid reading \`solution/\` until after you finish or deliberately want to compare approaches.

    ## Recommended Study Path
    Start Go in order: \`go/foundation\`, \`go/idioms\`, \`go/testing\`, \`go/concurrency\`, then the practical HTTP, CLI, generics, and architecture drills. Start TS/React with \`typescript-deep-dive\`, then React architecture, performance, testing, bundlers, microfrontends, monorepo, and design-systems. Start shell-tools with \`shell-tools/rg\`, then \`sed\`, \`awk\`, \`jq\`, \`xargs\`, and \`sqlite3\`.

    ## How Tracks Differ
    Go drills are mostly executable packages with Go unit tests, table-driven tests, benchmarks, fuzz targets, concurrency tests, and standard-library APIs. TS/React drills assume you already know ordinary React and TypeScript. Many use compile-time type tests or static engineering checks for architecture, bundler, federation, and test-code tasks where installing a full app would add noise. Shell-tools drills use local fixtures and exact-output command checks for practical \`rg\`, \`sed\`, \`awk\`, \`jq\`, \`xargs\`, and \`sqlite3\` pipelines.

    ## Troubleshooting
    If \`pnpm drill:verify\` fails, open \`tools/verify-report.json\` for the exact drill and phase. If \`tsc\` is missing, install TypeScript locally or use a Node version that has access to \`tsc\`. If a starter check fails, that is expected until you implement the TODOs. If a solution check fails, the drill library itself is broken and should be fixed before practicing that exercise.
  `;
}

function agents() {
  return text`
    # AGENTS.md

    ## Project Goals
    Build and maintain a serious local programming drill system for Go foundations and advanced TypeScript/React engineering. Drills must be practical, focused, automatically checked, and usable without cloud services.

    ## Folder Layout
    - \`go/\`: Go drill tracks from foundation through architecture.
    - \`ts-react/\`: advanced TypeScript, React architecture, performance, testing, bundlers, microfrontends, monorepo, and design-system drills.
    - \`shell-tools/\`: command-line drills for \`rg\`, \`sed\`, \`awk\`, \`jq\`, \`xargs\`, and \`sqlite3\`.
    - \`tools/\`: drill runner, verifier, generated reports, and authoring helpers.
    - \`docs/\`: roadmaps and authoring/checking documentation.
    - Root docs: \`README.md\`, \`backlog.md\`, and \`TOMORROW.md\`.

    ## Authoring Rules
    Every exercise needs \`exercise.json\`, \`THEORY.md\` with 100-250 words, \`TASK.md\`, \`HINTS.md\`, \`starter/\`, \`solution/\`, and at least one automated checker. Starter code must contain TODOs and must not pass all checks. Reference solutions must pass.

    ## Commands
    - \`pnpm drill:list\`
    - \`pnpm drill:check <id>\`
    - \`pnpm drill:check <id> --solution\`
    - \`pnpm drill:verify\`
    - \`pnpm drill:verify:starters\`
    - \`pnpm drill:check:shell\`

    ## Validation Requirements
    The verifier checks metadata shape, required files, theory length, checker presence, and all reference solution commands. It writes \`tools/verify-report.json\` and exits nonzero on broken drills.

    ## Privacy and Safety Notes
    The drills are local-only. Do not add paid APIs, cloud dependencies, telemetry, or secrets. Keep sample endpoints fake and deterministic.

    ## Definition of Done
    A drill is done when its starter is incomplete, its solution passes, its task and theory are clear, its metadata is valid, and \`pnpm drill:verify\` remains green.
  `;
}

function docs() {
  return {
    "docs/go-roadmap.md": text`
      # Go Roadmap

      Work through Go in order. The foundation drills build basic syntax, data modeling, slices, maps, structs, methods, packages, and module path reasoning. The idioms track then introduces explicit errors, wrapping, sentinel errors, custom error types, defer, interfaces, composition, and dependency injection without frameworks.

      The testing track is intentionally early. Go teams rely heavily on fast unit tests, table-driven cases, subtests, helpers, golden files, benchmarks, fuzz targets, and race-detector awareness. After that, the concurrency drills cover goroutines, channels, select, worker pools, context cancellation, timeouts, mutexes, atomics, and leak avoidance.

      Finish with practical Go: JSON, HTTP handlers, middleware, CLI flags, file I/O, generics, repository/service boundaries, and profiling-friendly APIs. After a drill passes, spend a few minutes simplifying your solution before comparing with the reference.
    `,
    "docs/ts-react-roadmap.md": text`
      # TS/React Roadmap

      This track assumes professional frontend experience. Start with the TypeScript deep dive drills: conditional types, mapped modifiers, template literal types, infer, exhaustive unions, branded types, event maps, API clients, type-level transformations, and strict tsconfig choices.

      Move to React architecture after that. The exercises focus on reusable hooks, controlled/uncontrolled APIs, compound components, context performance, external stores, error boundaries, Suspense-style resources, and state colocation. Performance drills cover memoization traps, virtualization math, selector caching, lazy route splitting, and hydration mismatch debugging.

      The testing and tooling sections are practical senior-engineering drills: fake timers, network mocking, hook cleanup, accessibility behavior, webpack, Rspack, Vite, tree shaking, module federation, shared dependency contracts, runtime remote fallbacks, monorepo project references, workspace boundaries, and design-system API design.
    `,
    "docs/shell-tools-roadmap.md": text`
      # Shell Tools Roadmap

      This track practices practical command-line data work with exact-output checks. Start with \`shell-tools/rg\` to build fast code-search habits: line-number TODO audits, file listing, PCRE2 captures, and machine-readable search output.

      Move to \`sed\` for careful stream edits: config cleanup, secret redaction, marker-range extraction, and mechanical import rewrites. Then use \`awk\` for row-oriented reports: grouped totals, status buckets, averages, and latest-record selection.

      The \`jq\` drills focus on structured JSON work instead of brittle text parsing: selection, dependency listings, grouped reductions, and CI-friendly schema gates. The \`xargs\` drills cover null-safe filenames, batching, placeholders, and parallel workers. Finish with \`sqlite3\` for local SQL workflows: filtered selects, joins, window functions, and JSON extraction.

      For each drill, inspect the fixture files, edit \`starter/task.sh\` or \`starter/query.sql\`, and run \`node tools/drill-runner.mjs check <id>\`.
    `,
    "docs/how-checking-works.md": text`
      # How Checking Works

      The root runner discovers every \`exercise.json\` under \`go/\`, \`ts-react/\`, and \`shell-tools/\`. A starter check runs \`check_command\` from the exercise's \`starter/\` directory. A reference check runs \`solution_check_command\` from \`solution/\`.

      Go drills use \`go test ./...\` inside an isolated module. Type-level TypeScript drills use \`tsc -p .\` with compile-time assertions. Architecture and tooling drills use local Node checkers in \`tests/check.mjs\` to inspect the intended source/config files for required engineering decisions. Shell-tools drills use local fixtures plus \`tests/check.mjs\` to execute \`task.sh\` or \`query.sql\` wrappers and compare exact stdout.

      \`pnpm drill:verify\` scans metadata, required files, theory word counts, checker presence, and all reference solutions. \`pnpm drill:verify:starters\` additionally checks that starters fail, which protects against accidentally solved starter code.
    `,
    "docs/how-to-add-new-exercises.md": text`
      # How To Add New Exercises

      Create a directory under the relevant track, for example \`go/http/004-router-methods\` or \`ts-react/performance/006-profiler-regression\`. Add \`exercise.json\`, \`THEORY.md\`, \`TASK.md\`, \`HINTS.md\`, \`starter/\`, and \`solution/\`.

      Metadata must include id, title, language, track, topic, difficulty, estimated_minutes, tags, theory_file, task_file, starter_path, solution_path, check_command, solution_check_command, and prerequisites. Theory must be 100-250 words. The starter should compile when practical but fail tests or checks. The solution must pass.

      Prefer one or two learning objectives per drill. Add tests that describe behavior clearly instead of checking implementation details, except for tooling/config drills where the implementation is the behavior. Run \`pnpm drill:verify:starters\` before considering the exercise complete.
    `,
  };
}

function backlog() {
  return text`
    # Backlog

    ## Completed
    - Created project skeleton, docs, metadata schema, runner, and verifier.
    - Authored 61 Go drills across foundation, idioms, testing, concurrency, HTTP, CLI, generics, and architecture.
    - Authored 58 TS/React drills across advanced TypeScript, React architecture, performance, testing, webpack, Rspack, Vite/bundlers, microfrontends, monorepo, and design systems.
    - Authored 24 shell-tools drills across \`rg\`, \`sed\`, \`awk\`, \`jq\`, \`xargs\`, and \`sqlite3\`.
    - Added reference solutions and automated checks for every drill.
    - Added \`tools/generate-extra-drills.mjs\` to keep the expansion reproducible.
    - Added \`tools/generate-shell-drills.mjs\` and made \`shell-tools/\` a first-class runner/verifier track.
    - Ran \`node tools/verify-drills.mjs\`: all 143 reference solutions passed.
    - Ran \`node tools/verify-drills.mjs --check-starters\`: all starters failed as expected.

    ## Validation Notes
    - Plain \`pnpm drill:list\` attempted a pnpm auto-install preflight in this sandbox and failed on pnpm's store SQLite file.
    - \`pnpm_config_verify_deps_before_run=false pnpm drill:list\` works.
    - Direct Node commands work: \`node tools/drill-runner.mjs list\` and \`node tools/verify-drills.mjs\`.

    ## Future Improvements
    - Add more real React runtime tests once dependencies are installed.
    - Add Go HTTP router and graceful shutdown drills.
    - Add Playwright-based UI flow drills.
    - Add bundle-analysis artifacts for webpack/Rspack/Vite exercises.
    - Add spaced-repetition study schedules based on completed drills.
  `;
}

function tomorrow() {
  return text`
    # TOMORROW

    1. Run \`pnpm drill:list\` to scan the 143-drill library. If pnpm tries to auto-install first, use \`pnpm_config_verify_deps_before_run=false pnpm drill:list\` or \`node tools/drill-runner.mjs list\`.
    2. Start with \`go/foundation/001-zero-values\` if you want Go fundamentals.
    3. Start with \`ts-react/typescript-deep-dive/001-conditional-api-data\` if you want advanced TS/React.
    4. For each drill, read \`THEORY.md\`, then \`TASK.md\`, edit only \`starter/\`, and run \`pnpm drill:check <id>\`.
    5. Use \`HINTS.md\` before opening \`solution/\`.
    6. Start with \`shell-tools/rg/001-todo-audit\` if you want command-line search and data-processing practice.
    7. Run \`pnpm drill:verify\` when you want to confirm the reference library is still healthy.

    Recommended first overnight set:
    - Go: foundation 001-006, idioms 001-003, testing 001.
    - TS/React: TypeScript deep dive 001-004, React architecture 001, performance 001.
    - Shell tools: rg 001-002, sed 001, awk 001, jq 001, xargs 001, sqlite3 001.
  `;
}

async function main() {
  await writeJSON("package.json", packageJSON());
  await write(".gitignore", text`
    .cache/
    node_modules/
  `);
  await write(".npmrc", text`
    verify-deps-before-run=false
    manage-package-manager-versions=false
  `);
  await write("pnpm-lock.yaml", text`
    lockfileVersion: '9.0'

    settings:
      autoInstallPeers: true
      excludeLinksFromLockfile: false

    importers:

      .: {}
  `);
  await write("README.md", readme());
  await write("AGENTS.md", agents());
  await write("backlog.md", backlog());
  await write("TOMORROW.md", tomorrow());
  for (const [rel, body] of Object.entries(docs())) await write(rel, body);
  await write("tools/drill-runner.mjs", runnerSource());
  await write("tools/verify-drills.mjs", verifierSource());
  await writeJSON("tools/metadata-schema.example.json", {
    id: "go/foundation/001-example",
    title: "Example Drill",
    language: "go",
    track: "go",
    topic: "foundation",
    difficulty: "beginner",
    estimated_minutes: 20,
    tags: ["go"],
    theory_file: "THEORY.md",
    task_file: "TASK.md",
    starter_path: "starter",
    solution_path: "solution",
    check_command: "go test ./...",
    solution_check_command: "go test ./...",
    prerequisites: []
  });
  for (const ex of goExercises) await writeGoExercise(ex);
  for (const ex of tsExercises) await writeTsExercise(ex);
  console.log(`generated ${goExercises.length} Go drills and ${tsExercises.length} TS/React drills`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
