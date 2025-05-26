import { afterEach, describe, expect, it, vi } from "vitest";

describe("build function", () => {
  /**
   * @type {import("vitest").MockInstance<{ (...data: any[]): void; (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; }>}
   */
  let consoleErrorSpy;

  afterEach(() => {
    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore();
    }
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("handles errors during build", async () => {
    const mockError = new Error("Build failed");
    const mockExtend = vi.fn().mockImplementation(() => {
      throw mockError;
    });

    vi.doMock("../../lib/duskitStyleDictionary.js", () => ({
      default: {
        extend: mockExtend,
      },
    }));

    vi.doMock("../../lib/getStyleDictionaryConfig.js", () => ({
      getStyleDictionaryConfig: vi.fn().mockReturnValue({}),
    }));

    vi.doMock("../../lib/platforms/index.js", () => ({
      css: vi.fn(),
      js: vi.fn(),
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../motion");

    await build({
      buildPath: "",
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error building motion:",
      mockError
    );
  });

  it("completes successfully", async () => {
    const mockExtend = vi.fn().mockResolvedValue({
      buildAllPlatforms: vi.fn().mockResolvedValue(undefined),
    });

    vi.doMock("../../lib/duskitStyleDictionary.js", () => ({
      default: {
        extend: mockExtend,
      },
    }));

    vi.doMock("../../lib/getStyleDictionaryConfig.js", () => ({
      getStyleDictionaryConfig: vi.fn().mockReturnValue({}),
    }));

    vi.doMock("../../lib/platforms/index.js", () => ({
      css: vi.fn(),
      js: vi.fn(),
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../motion");

    await build({
      buildPath: "",
    });

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
