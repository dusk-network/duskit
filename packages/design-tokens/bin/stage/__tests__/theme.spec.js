import { afterEach, describe, expect, it, vi } from "vitest";

describe("theme build function", () => {
  /**
   * @type {import("vitest").MockInstance<{ (...data: any[]): void; (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; }>}
   */
  let consoleErrorSpy;

  afterEach(() => {
    if (consoleErrorSpy) consoleErrorSpy.mockRestore();
    vi.resetModules();
    vi.clearAllMocks();
  });

  const mockThemes = [
    {
      filename: "light",
      include: ["src/tokens/base/**/*.json"],
      source: ["src/tokens/themes/light.json"],
      theme: "light",
    },
    {
      filename: "dark",
      include: ["src/tokens/base/**/*.json"],
      source: ["src/tokens/themes/dark.json"],
      theme: "dark",
    },
  ];

  it("builds all themes successfully", async () => {
    vi.doMock("../../themes.config.js", () => ({
      themes: mockThemes,
    }));

    const mockBuildAllPlatforms = vi.fn().mockResolvedValue(undefined);
    const mockExtend = vi
      .fn()
      .mockResolvedValue({ buildAllPlatforms: mockBuildAllPlatforms });

    vi.doMock("../../lib/duskitStyleDictionary.js", () => ({
      default: {
        extend: mockExtend,
      },
    }));

    vi.doMock("../../lib/getStyleDictionaryConfig.js", () => ({
      getStyleDictionaryConfig: vi.fn().mockReturnValue({}),
    }));

    vi.doMock("../../lib/getFallbackTheme.js", () => ({
      getFallbackTheme: vi
        .fn()
        .mockImplementation((theme) => (theme === "light" ? "light" : "dark")),
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../theme");

    await build({
      buildPath: "dist/",
      prefix: "prefix-",
    });

    expect(mockExtend).toHaveBeenCalledTimes(mockThemes.length);
    expect(mockBuildAllPlatforms).toHaveBeenCalledTimes(mockThemes.length);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("handles errors during theme build", async () => {
    vi.doMock("../../themes.config.js", () => ({
      themes: mockThemes,
    }));

    const mockError = new Error("Theme build failed");

    const mockExtend = vi
      .fn()
      .mockImplementationOnce(() => {
        throw mockError;
      })
      .mockResolvedValueOnce({
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

    vi.doMock("../../lib/getFallbackTheme.js", () => ({
      getFallbackTheme: vi
        .fn()
        .mockImplementation((theme) => (theme === "light" ? "light" : "dark")),
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../theme");

    await build({
      buildPath: "dist/",
      prefix: "prefix-",
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error building theme:",
      mockError
    );

    // Only the first theme should be attempted before the error
    expect(mockExtend).toHaveBeenCalledTimes(1);
  });

  it("passes correct theme options to config generator", async () => {
    vi.doMock("../../themes.config.js", () => ({
      themes: mockThemes,
    }));

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

    vi.doMock("../../lib/getFallbackTheme.js", () => ({
      getFallbackTheme: vi
        .fn()
        .mockImplementation((theme) => (theme === "light" ? "light" : "dark")),
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../theme");

    await build({
      buildPath: "dist/",
      prefix: "prefix-",
    });

    expect(mockGetStyleDictionaryConfig).toHaveBeenNthCalledWith(
      1,
      "functional/themes/light",
      mockThemes[0].source,
      mockThemes[0].include,
      {
        buildPath: "dist/",
        prefix: "prefix-",
        theme: ["light", "light"],
        themed: true,
      }
    );

    expect(mockGetStyleDictionaryConfig).toHaveBeenNthCalledWith(
      2,
      "functional/themes/dark",
      mockThemes[1].source,
      mockThemes[1].include,
      {
        buildPath: "dist/",
        prefix: "prefix-",
        theme: ["dark", "dark"],
        themed: true,
      }
    );
  });

  it("handles empty themes configuration", async () => {
    vi.doMock("../../themes.config.js", () => ({
      themes: [],
    }));

    const mockExtend = vi.fn();

    vi.doMock("../../lib/duskitStyleDictionary.js", () => ({
      default: {
        extend: mockExtend,
      },
    }));

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../theme");

    await build({
      buildPath: "dist/",
      prefix: "prefix-",
    });

    expect(mockExtend).not.toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
