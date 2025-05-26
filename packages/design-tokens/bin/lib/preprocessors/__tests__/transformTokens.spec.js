import { describe, expect, it } from "vitest";
import { transformTokens } from "../transformTokens";

describe("transformTokens", () => {
  it("applies transform to token objects with $value property", () => {
    const token = { $value: "red", name: "color" };
    const transform = (/** @type {any} */ t) => ({ ...t, transformed: true });
    const result = transformTokens(token, transform);
    expect(result).toEqual({ ...token, transformed: true });
  });

  it("applies transform to token objects with value property", () => {
    const token = { name: "size", value: "10px" };
    const transform = (/** @type {any} */ t) => ({ ...t, processed: true });
    const result = transformTokens(token, transform);
    expect(result).toEqual({ ...token, processed: true });
  });

  it("doesn't process non-token objects", () => {
    const input = {
      metadata: { version: "1.0" },
      tokens: {
        color: { $value: "red" },
      },
    };

    const transform = (/** @type {any} */ token) => ({
      ...token,
      processed: true,
    });

    const result = transformTokens(input, transform);

    expect(result).toEqual({
      metadata: { version: "1.0" },
      tokens: {
        color: { $value: "red", processed: true },
      },
    });
  });
});
