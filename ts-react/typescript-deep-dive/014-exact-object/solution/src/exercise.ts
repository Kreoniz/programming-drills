export type Exact<Shape, Value> =
  Value extends Shape
    ? Exclude<keyof Value, keyof Shape> extends never ? Value : never
    : never;
export type AppConfig = { mode: "dev" | "prod"; port: number };
export function defineConfig<T extends AppConfig>(config: Exact<AppConfig, T>): T {
  return config;
}
