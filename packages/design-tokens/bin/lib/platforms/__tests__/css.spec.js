import { describe, expect, it } from "vitest";
import { css } from "../css";

describe("css platform initializer", () => {
  it("creates minimal config with required parameters", () => {
    const config = css("variables.css", "prefix-", "build/");

    expect(config).toEqual({
      buildPath: "build/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
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
      transformGroup: "css",
    });
  });

  it("merges custom format options", () => {
    const config = css("theme.css", "", "dist/", {
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
    const config = css("output.css", "pr-", "build/", {
      theme: ["light", "dark"],
    });

    // @ts-ignore
    expect(config.options.themeOverrides).toEqual({
      theme: ["light", "dark"],
    });
  });

  it("handles empty prefix correctly", () => {
    const config = css("vars.css", "", "dist/");
    expect(config.prefix).toBe("");
  });

  it("maintains default basePxFontSize", () => {
    const config = css("vars.css", "p-", "dist/");
    // @ts-ignore
    expect(config.options.basePxFontSize).toBe(16);
  });

  it("always includes themeOverrides preprocessor", () => {
    const config = css("vars.css", "", "");
    expect(config.preprocessors).toEqual(["themeOverrides"]);
  });

  it("always uses css transformGroup", () => {
    const config = css("vars.css", "", "");
    expect(config.transformGroup).toBe("css");
  });

  it("combines multiple options correctly", () => {
    const config = css("theme.css", "tw-", "dist/tokens/", {
      options: {
        border: "1px",
        outputReferences: true,
      },
      theme: "dark",
    });

    expect(config).toMatchObject({
      buildPath: "dist/tokens/",
      files: [
        {
          destination: "theme.css",
          options: {
            border: "1px",
            outputReferences: true,
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
      prefix: "tw-",
    });
  });
});
