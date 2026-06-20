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
