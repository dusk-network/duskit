import { describe, expect, it } from "vitest";
import { js } from "../js";

describe("js platform initializer", () => {
  it("creates minimal config with required parameters", () => {
    const config = js("tokens.js", "prefix-", "build/");

    expect(config).toEqual({
      buildPath: "build/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/esm",
          options: {
            showFileHeader: false,
          },
        },
      ],
      options: {
        basePxFontSize: 16,
        themeOverrides: {
          theme: undefined,
        },
      },
      prefix: "prefix-",
      preprocessors: ["themeOverrides"],
      transformGroup: "js",
    });
  });

  it("merges custom format options", () => {
    const config = js("theme.js", "", "dist/", {
      options: {
        outputReferences: true,
        showFileHeader: true,
      },
    });

    // @ts-ignore
    expect(config.files[0].options).toEqual({
      outputReferences: true,
      showFileHeader: true,
    });
  });

  it("passes theme option to themeOverrides", () => {
    const config = js("tokens.js", "js-", "build/", {
      theme: "dark",
    });

    // @ts-ignore
    expect(config.options.themeOverrides).toEqual({
      theme: "dark",
    });
  });

  it("handles empty prefix correctly", () => {
    const config = js("tokens.js", "", "dist/");
    expect(config.prefix).toBe("");
  });

  it("uses js transformGroup", () => {
    const config = js("tokens.js", "", "dist/");
    expect(config.transformGroup).toBe("js");
  });

  it("maintains default basePxFontSize", () => {
    const config = js("tokens.js", "", "dist/");
    // @ts-ignore
    expect(config.options.basePxFontSize).toBe(16);
  });

  it("always includes themeOverrides preprocessor", () => {
    const config = js("tokens.js", "", "");
    expect(config.preprocessors).toEqual(["themeOverrides"]);
  });

  it("combines multiple options correctly", () => {
    const config = js("theme.js", "ui-", "dist/js/", {
      options: {
        module: "es6",
        outputReferences: true,
      },
      theme: ["light", "dark"],
    });

    expect(config).toMatchObject({
      buildPath: "dist/js/",
      files: [
        {
          destination: "theme.js",
          format: "javascript/esm",
          options: {
            module: "es6",
            outputReferences: true,
            showFileHeader: false,
          },
        },
      ],
      options: {
        basePxFontSize: 16,
        themeOverrides: {
          theme: ["light", "dark"],
        },
      },
      prefix: "ui-",
      transformGroup: "js",
    });
  });

  it("handles undefined options gracefully", () => {
    const config = js("tokens.js", "p-", "build/", undefined);

    // @ts-ignore
    expect(config.files[0].options).toEqual({
      showFileHeader: false,
    });
    // @ts-ignore
    expect(config.options.themeOverrides).toEqual({
      theme: undefined,
    });
  });

  it("uses correct file extension in destination", () => {
    const config = js("colors.js", "", "dist/");
    // @ts-ignore
    expect(config.files[0].destination).toBe("colors.js");
  });
});
