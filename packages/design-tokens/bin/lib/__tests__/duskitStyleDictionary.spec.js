import { describe, expect, it, vi } from "vitest";
import { themeOverrides } from "../preprocessors/themeOverrides.js";
import DuskitStyleDictionary from "../duskitStyleDictionary.js";

const mockRegisterPreprocessor = vi.hoisted(() => vi.fn());
const mockSDConstructor = vi.hoisted(() =>
  vi.fn(() => ({
    registerPreprocessor: mockRegisterPreprocessor,
  }))
);

vi.mock("style-dictionary", () => ({
  default: mockSDConstructor,
}));

describe("DuskitStyleDictionary", () => {
  // Create a type-safe way to access mock calls
  const getFirstCallConfig = () => {
    const calls = mockSDConstructor.mock.calls;
    if (calls.length === 0) {
      throw new Error("StyleDictionary constructor was not called");
    }

    const firstCall = calls[0];
    if (!firstCall || firstCall.length === 0) {
      throw new Error("First call to StyleDictionary has no arguments");
    }

    // @ts-ignore
    return firstCall[0];
  };

  const getFirstInstance = () => {
    const results = mockSDConstructor.mock.results;
    if (results.length === 0) {
      throw new Error("No StyleDictionary instance created");
    }

    return results[0].value;
  };

  it("creates Style Dictionary instance with correct configuration", () => {
    expect(mockSDConstructor).toHaveBeenCalledWith({
      log: {
        verbosity: "default",
      },
    });
  });

  it("registers the themeOverrides preprocessor", () => {
    expect(mockRegisterPreprocessor).toHaveBeenCalledWith(themeOverrides);
  });

  it("exports the initialized Style Dictionary instance", () => {
    const instance = getFirstInstance();
    expect(DuskitStyleDictionary).toBe(instance);
  });

  it("has the correct log verbosity level", () => {
    const config = getFirstCallConfig();
    // @ts-ignore
    expect(config.log.verbosity).toBe("default");
  });

  it("doesn't register any unexpected preprocessors", () => {
    expect(mockRegisterPreprocessor).toHaveBeenCalledTimes(1);
  });
});
