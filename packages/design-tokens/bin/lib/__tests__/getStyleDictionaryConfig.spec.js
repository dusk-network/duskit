import { beforeEach, describe, expect, it, vi } from "vitest";
import { getStyleDictionaryConfig } from "../getStyleDictionaryConfig";

// Hoisted mocks for platform functions
const mockCss = vi.hoisted(() => vi.fn());
const mockJs = vi.hoisted(() => vi.fn());

vi.mock("./platforms/index.js", () => ({
  css: mockCss,
  js: mockJs,
}));

describe("getStyleDictionaryConfig", () => {
  const baseParams = {
    filename: "tokens",
    include: ["include.json"],
    options: {
      buildPath: "dist/",
      prefix: "prefix-",
      theme: "dark",
      themed: true,
    },
    source: ["source.json"],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCss.mockImplementation(() => "css-platform");
    mockJs.mockImplementation(() => "js-platform");
  });

  it("creates basic configuration structure", () => {
    const config = getStyleDictionaryConfig(
      baseParams.filename,
      baseParams.source,
      baseParams.include,
      baseParams.options
    );

    expect(config).toEqual({
      include: baseParams.include,
      log: {
        errors: {
          brokenReferences: "throw",
        },
        verbosity: "verbose",
        warnings: "warn",
      },
      platforms: {
        css: {
          buildPath: "dist/",
          files: [
            {
              destination: "css/tokens.css",
              format: "css/variables",
              options: {
                showFileHeader: false,
              },
            },
          ],
          options: {
            basePxFontSize: 16,
            themeOverrides: {
              theme: "dark",
            },
          },
          prefix: "prefix-",
          preprocessors: ["themeOverrides"],
          transformGroup: "css",
        },
        js: {
          buildPath: "dist/",
          files: [
            {
              destination: "js/tokens.js",
              format: "javascript/esm",
              options: {
                showFileHeader: false,
              },
            },
          ],
          options: {
            basePxFontSize: 16,
            themeOverrides: {
              theme: "dark",
            },
          },
          prefix: "prefix-",
          preprocessors: ["themeOverrides"],
          transformGroup: "js",
        },
      },
      source: ["source.json"],
    });
  });
});
