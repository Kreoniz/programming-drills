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
