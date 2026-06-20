export type Exact<Shape, Value> = Value; // TODO
export type AppConfig = { mode: "dev" | "prod"; port: number };
export function defineConfig<T extends AppConfig>(config: T): T {
  return config;
}
