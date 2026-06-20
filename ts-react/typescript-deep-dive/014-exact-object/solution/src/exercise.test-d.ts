import { defineConfig } from "./exercise";

defineConfig({ mode: "dev", port: 3000 });
// @ts-expect-error extra keys should be rejected
defineConfig({ mode: "dev", port: 3000, debug: true });
// @ts-expect-error mode is restricted
defineConfig({ mode: "test", port: 3000 });
