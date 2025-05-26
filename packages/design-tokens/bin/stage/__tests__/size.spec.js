import { afterEach, describe, expect, it, vi } from "vitest";

describe("size build function", () => {
  /**
   * @type {import("vitest").MockInstance<{ (...data: any[]): void; (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; }>}
   */
  let consoleErrorSpy;

  afterEach(() => {
    if (consoleErrorSpy) consoleErrorSpy.mockRestore();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("builds size tokens successfully", async () => {
    vi.doMock("fast-glob", () => ({
      default: {
        sync: vi
          .fn()
          .mockReturnValue([
            "src/tokens/functional/size/file1.json",
            "src/tokens/functional/size/file2.json",
          ]),
      },
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

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../size");

    await build({
      buildPath: "dist/",
      prefix: "prefix-",
    });

    expect(mockExtend).toHaveBeenCalledTimes(3);
    expect(mockBuildAllPlatforms).toHaveBeenCalledTimes(3);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("handles errors during file processing", async () => {
    vi.doMock("fast-glob", () => ({
      default: {
        sync: vi
          .fn()
          .mockReturnValue([
            "src/tokens/functional/size/file1.json",
            "src/tokens/functional/size/file2.json",
          ]),
      },
    }));

    const mockError = new Error("File processing failed");
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

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../size");

    await build({
      buildPath: "dist/",
      prefix: "prefix-",
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error building size:",
      mockError
    );
    expect(mockExtend).toHaveBeenCalledTimes(1);
  });

  it("handles errors during base build", async () => {
    vi.doMock("fast-glob", () => ({
      default: {
        sync: vi
          .fn()
          .mockReturnValue(["src/tokens/functional/size/file1.json"]),
      },
    }));

    const mockError = new Error("Base build failed");
    const mockExtend = vi
      .fn()
      .mockResolvedValueOnce({
        buildAllPlatforms: vi.fn().mockResolvedValue(undefined),
      })
      .mockImplementation(() => {
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

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../size");

    await build({
      buildPath: "dist/",
      prefix: "prefix-",
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error building size:",
      mockError
    );
    expect(mockExtend).toHaveBeenCalledTimes(2);
  });

  it("handles no files found", async () => {
    vi.doMock("fast-glob", () => ({
      default: {
        sync: vi.fn().mockReturnValue([]),
      },
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

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { build } = await import("../size");

    await build({
      buildPath: "dist/",
      prefix: "prefix-",
    });

    expect(mockExtend).toHaveBeenCalledTimes(1);
    expect(mockBuildAllPlatforms).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
