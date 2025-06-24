import { afterEach, describe, expect, it, vi } from "vitest";

describe("typography build function", () => {
  /**
   * @type {import("vitest").MockInstance<{ (...data: any[]): void; (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; }>}
   */
  let consoleErrorSpy;

  afterEach(() => {
    if (consoleErrorSpy) consoleErrorSpy.mockRestore();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("builds typography tokens successfully", async () => {
    const mockBuildAllPlatforms = vi.fn().mockResolvedValue(undefined);
    const mockExtend = vi
      .fn()
      .mockResolvedValue({ buildAllPlatforms: mockBuildAllPlatforms });
    const mockGetStyleDictionaryConfig = vi.fn().mockReturnValue({});

    vi.doMock("../../lib/duskitStyleDictionary.js", () => ({
      default: {
        extend: mockExtend,
      },
    }));

    vi.doMock("../../lib/getStyleDictionaryConfig.js", () => ({
      getStyleDictionaryConfig: mockGetStyleDictionaryConfig,
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../typography");
    const buildOptions = {
      buildPath: "dist/",
      prefix: "prefix-",
    };
    await build(buildOptions);

    expect(mockExtend).toHaveBeenCalledTimes(1);
    expect(mockBuildAllPlatforms).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(mockGetStyleDictionaryConfig).toHaveBeenCalledWith(
      "base/typography",
      ["src/tokens/base/typography.json"],
      [],
      buildOptions
    );
  });

  it("handles errors during build", async () => {
    const mockError = new Error("Typography build failed");
    const mockGetStyleDictionaryConfig = vi.fn().mockReturnValue({});
    const mockExtend = vi.fn().mockImplementation(() => {
      throw mockError;
    });

    vi.doMock("../../lib/duskitStyleDictionary.js", () => ({
      default: {
        extend: mockExtend,
      },
    }));

    vi.doMock("../../lib/getStyleDictionaryConfig.js", () => ({
      getStyleDictionaryConfig: mockGetStyleDictionaryConfig,
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../typography");

    await build({
      buildPath: "dist/",
      prefix: "prefix-",
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error building typography:",
      mockError
    );
  });

  it("passes correct options to config generator", async () => {
    const mockGetStyleDictionaryConfig = vi.fn().mockReturnValue({});

    vi.doMock("../../lib/duskitStyleDictionary.js", () => ({
      default: {
        extend: vi.fn().mockResolvedValue({
          buildAllPlatforms: vi.fn().mockResolvedValue(undefined),
        }),
      },
    }));

    vi.doMock("../../lib/getStyleDictionaryConfig.js", () => ({
      getStyleDictionaryConfig: mockGetStyleDictionaryConfig,
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../typography");
    const buildOptions = {
      buildPath: "custom-dist/",
      prefix: "custom-",
      theme: "dark",
    };

    await build(buildOptions);

    expect(mockGetStyleDictionaryConfig).toHaveBeenCalledWith(
      "base/typography",
      ["src/tokens/base/typography.json"],
      [],
      buildOptions
    );
  });

  it("handles minimal build options", async () => {
    const mockBuildAllPlatforms = vi.fn().mockResolvedValue(undefined);
    const mockExtend = vi
      .fn()
      .mockResolvedValue({ buildAllPlatforms: mockBuildAllPlatforms });
    const mockGetStyleDictionaryConfig = vi.fn().mockReturnValue({});

    vi.doMock("../../lib/duskitStyleDictionary.js", () => ({
      default: {
        extend: mockExtend,
      },
    }));

    vi.doMock("../../lib/getStyleDictionaryConfig.js", () => ({
      getStyleDictionaryConfig: mockGetStyleDictionaryConfig,
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../typography");

    await build({
      buildPath: "",
    });

    expect(mockExtend).toHaveBeenCalledTimes(1);
    expect(mockBuildAllPlatforms).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(mockGetStyleDictionaryConfig).toHaveBeenCalledWith(
      "base/typography",
      ["src/tokens/base/typography.json"],
      [],
      {
        buildPath: "",
      }
    );
  });
});
