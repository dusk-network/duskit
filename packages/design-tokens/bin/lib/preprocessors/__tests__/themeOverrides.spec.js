import { describe, expect, it } from "vitest";
import { themeOverrides } from "../themeOverrides";

describe("themeOverrides preprocessor", () => {
  /**
   *
   * @param {object} overrides
   * @returns
   */
  const mockToken = (overrides = {}) => ({
    $value: "original",
    name: "token1",
    ...overrides,
  });

  /**
   *
   * @param {*} options
   * @returns
   */
  const getConfig = (options = {}) => ({
    options: {
      themeOverrides: {
        theme: "light",
        ...options,
      },
    },
  });

  it("returns original token when no theme overrides exist", () => {
    const tokens = [mockToken()];
    const config = getConfig();
    // @ts-ignore
    const result = themeOverrides.preprocessor(tokens, config);
    // @ts-ignore
    expect(result[0].$value).toBe("original");
  });

  it("applies current theme override when present", () => {
    const tokens = [
      mockToken({
        $extensions: {
          "org.duskit.overrides": {
            light: "light-value",
          },
        },
      }),
    ];
    const config = getConfig({ theme: "light" });
    // @ts-ignore
    const result = themeOverrides.preprocessor(tokens, config);
    // @ts-ignore
    expect(result[0].$value).toBe("light-value");
  });

  it("applies fallback theme when current theme missing", () => {
    const tokens = [
      mockToken({
        $extensions: {
          "org.duskit.overrides": {
            dark: "dark-value",
          },
        },
      }),
    ];
    const config = getConfig({ theme: ["light", "dark"] });
    // @ts-ignore
    const result = themeOverrides.preprocessor(tokens, config);
    // @ts-ignore
    expect(result[0].$value).toBe("dark-value");
  });

  it("uses custom extensionProp and valueProp", () => {
    const tokens = [
      mockToken({
        $extensions: {
          custom: {
            light: { customValue: "custom" },
          },
        },
      }),
    ];
    const config = getConfig({
      extensionProp: "custom",
      valueProp: "customValue",
    });
    // @ts-ignore
    const result = themeOverrides.preprocessor(tokens, config);
    // @ts-ignore
    expect(result[0].customValue).toBe("custom");
  });

  it("handles array themes correctly", () => {
    const tokens = [
      mockToken({
        $extensions: {
          "org.duskit.overrides": {
            dark: "dark-value",
          },
        },
      }),
    ];
    const config = getConfig({ theme: ["light", "dark"] });
    // @ts-ignore
    const result = themeOverrides.preprocessor(tokens, config);
    // @ts-ignore
    expect(result[0].$value).toBe("dark-value");
  });
});
