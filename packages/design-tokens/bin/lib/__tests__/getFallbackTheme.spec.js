import { describe, expect, it } from "vitest";
import { getFallbackTheme } from "../getFallbackTheme"; // Update import path

describe("getFallbackTheme", () => {
  it("returns 'light' for light-themed strings", () => {
    expect(getFallbackTheme("light")).toBe("light");
    expect(getFallbackTheme("light-theme")).toBe("light");
    expect(getFallbackTheme("light_mode")).toBe("light");
    expect(getFallbackTheme("light123")).toBe("light");
    expect(getFallbackTheme("LIGHT")).toBe("light");
    expect(getFallbackTheme("Light")).toBe("light");
  });

  it("returns 'dark' for non-light strings", () => {
    expect(getFallbackTheme("dark")).toBe("dark");
    expect(getFallbackTheme("dark-theme")).toBe("dark");
    expect(getFallbackTheme("night")).toBe("dark");
    expect(getFallbackTheme("dark_mode")).toBe("dark");
    expect(getFallbackTheme("dim")).toBe("dark");
    expect(getFallbackTheme("anything")).toBe("dark");
  });

  it("handles edge cases and special characters", () => {
    expect(getFallbackTheme(" light")).toBe("light");
    expect(getFallbackTheme("light ")).toBe("light");
    expect(getFallbackTheme("lite")).toBe("dark");
    expect(getFallbackTheme("123light")).toBe("dark");
    expect(getFallbackTheme("🕶️")).toBe("dark");
    expect(getFallbackTheme("🌞")).toBe("dark");
    expect(getFallbackTheme("")).toBeUndefined();
  });

  it("handles different string casing", () => {
    expect(getFallbackTheme("LIGHT")).toBe("light");
    expect(getFallbackTheme("Light")).toBe("light");
    expect(getFallbackTheme("lIgHt")).toBe("light");
    expect(getFallbackTheme("DARK")).toBe("dark");
    expect(getFallbackTheme("Dark")).toBe("dark");
  });
});
