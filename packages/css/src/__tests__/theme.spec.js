import { describe, expect, it } from "vitest";
import { readFile } from "fs/promises";
import Color from "colorjs.io";

import {
  CSS_NAMED_COLORS,
  CSS_VAR_NAME_PATTERN,
  contrastRules,
  isAllowedColorValue,
  parseCSSToDictionary,
  resolveToken,
} from "./helpers";

describe("Test helpers", () => {
  const mockCss = `
    :root {
      --action-primary-color: var(--color-white);
      --color-black: black;
      --color-white: white;
      margin: 0;
    }

    .button {
      color: var(--action-primary-color);
    }

    :root.dark {
      --action-primary-color: var(--color-black);
      --color-black: white;
      --color-white: black;
    }
  `;

  describe("isAllowedColorValue", () => {
    it("should return false for a partial variable reference within a composite value", () => {
      expect(isAllowedColorValue("1px solid var(--color-primary)")).toBe(false);
      expect(isAllowedColorValue("var(--color-a) var(--color-b)")).toBe(false);
    });

    it("should return false for hex, rgb, hsl, or random strings", () => {
      expect(isAllowedColorValue("#ffffff")).toBe(false);
      expect(isAllowedColorValue("fakecolor")).toBe(false);
      expect(isAllowedColorValue("rgb(0, 0, 0)")).toBe(false);
    });

    it("should return true for a valid W3C named color in any case", () => {
      expect(isAllowedColorValue("black")).toBe(true);
      expect(isAllowedColorValue("DarkMagenta")).toBe(true);
    });

    it("should return true for an exact CSS variable reference", () => {
      expect(isAllowedColorValue("var(--color-primary)")).toBe(true);
    });
  });

  describe("parseCSSToDictionary", () => {
    it("should extract all selectors and declarations without domain prejudice", () => {
      const result = parseCSSToDictionary(mockCss);
      const expected = {
        ".button": {
          color: "var(--action-primary-color)",
        },
        ":root": {
          "--action-primary-color": "var(--color-white)",
          "--color-black": "black",
          "--color-white": "white",
          margin: "0",
        },
        ":root.dark": {
          "--action-primary-color": "var(--color-black)",
          "--color-black": "white",
          "--color-white": "black",
        },
      };

      expect(result).toStrictEqual(expected);
    });

    it("should return an empty dictionary when parsing an empty valid string", () => {
      expect(parseCSSToDictionary("")).toStrictEqual({});
      expect(parseCSSToDictionary("   \n  ")).toStrictEqual({});
    });

    it("should throw an error when the CSS string is not valid", () => {
      expect(() =>
        parseCSSToDictionary("just random garbage syntax")
      ).toThrow();
    });
  });

  describe("resolveToken", () => {
    it("should resolve the value of a token to its raw value", () => {
      const localDict = { "--a": "#8f0000", "--b": "var(--a)" };

      expect(resolveToken("--b", localDict)).toBe("#8f0000");
    });

    it("should return the raw value when no CSS variable is referenced", () => {
      const localDict = { "--a": "black" };

      expect(resolveToken("--a", localDict)).toBe("black");
    });

    it("should successfully resolve a deeply nested token", () => {
      const localDict = {
        "--a": "var(--b)",
        "--b": "var(--c)",
        "--c": "white",
      };

      expect(resolveToken("--a", localDict)).toBe("white");
    });

    it("should resolve composite values containing a single variable", () => {
      const localDict = {
        "--border": "1px solid var(--color-black)",
        "--color-black": "#000",
      };

      expect(resolveToken("--border", localDict)).toBe("1px solid #000");
    });

    it("should resolve composite values containing multiple variables", () => {
      const localDict = {
        "--base-padding": "1rem",
        "--multiplier": "2",
        "--total-padding": "calc(var(--base-padding) * var(--multiplier))",
      };

      expect(resolveToken("--total-padding", localDict)).toBe("calc(1rem * 2)");
    });

    it("should throw a fatal error when encountering an undefined token", () => {
      const localDict = { "--a": "var(--b)" };

      expect(() => resolveToken("--a", localDict)).toThrow(
        "Token not found: --b"
      );
    });

    it("should throw a fatal error on circular dependency", () => {
      const localDict = { "--a": "var(--b)", "--b": "var(--a)" };

      expect(() => resolveToken("--a", localDict)).toThrow(
        "Circular dependency detected: --a -> --b -> --a"
      );
    });
  });
});

describe("Theme consistency", async () => {
  /** @param {string} selector */
  const getColorTokens = (selector) =>
    Object.keys(theme[selector])
      .filter((prop) => prop.endsWith("-color"))
      .sort();

  const rawThemeCss = await readFile("./src/1-theme/theme.css", "utf-8");
  const theme = parseCSSToDictionary(rawThemeCss);
  const selectors = Object.keys(theme);
  const declarations = selectors.flatMap((selector) =>
    Object.keys(theme[selector]).map((prop) => ({
      prop,
      selector,
      value: theme[selector][prop].trim(),
    }))
  );

  describe("Architectural rules for selectors", () => {
    const allowedSelectorPattern = /^:root(\.[a-zA-Z0-9_-]+)?$/;

    it.each(selectors)(
      "should only contain allowed root selectors (%s)",
      (selector) => {
        expect(
          allowedSelectorPattern.test(selector),
          `Invalid selector found: "${selector}". Only :root or :root.something are allowed.`
        ).toBe(true);
      }
    );
  });

  describe("Architectural rules for properties and basic structural integrity", () => {
    it("should enforce property format and structural integrity for all declarations", () => {
      for (const { prop, selector, value } of declarations) {
        expect(
          CSS_VAR_NAME_PATTERN.test(prop),
          `Invalid property found in ${selector}: "${prop}". Must match the \`/^--[\\w-]+$/\` pattern.`
        ).toBe(true);

        expect(
          value.length,
          `Token ${prop} in ${selector} is empty.`
        ).toBeGreaterThan(0);

        expect(
          value.endsWith(";"),
          `Token ${prop} in ${selector} contains a trailing semicolon.`
        ).toBe(false);
      }
    });

    it("should reject the use of physical directional coordinates in property names", () => {
      // Matches -top-, -bottom-, -left-, -right-, -height- anywhere after the prefix, or at the very end.
      // 'width' is explicitly omitted from this blacklist.
      // While 'height' is banned to prevent rigid vertical bounds,
      // 'width' remains mathematically necessary and semantically correct
      // for structural properties like '--border-width' or '--focus-ring-width'.
      const physicalCoordinatesPattern =
        /-(top|bottom|left|right|height)(?:-|$)/;

      for (const { prop, selector } of declarations) {
        expect(
          physicalCoordinatesPattern.test(prop),
          `Architectural violation in \`${selector}\`: \`${prop}\` uses physical coordinates. Use logical properties or size instead.`
        ).toBe(false);
      }
    });

    it("should enforce pure integer values without units for `z-index` tokens", () => {
      const integerPattern = /^-?\d+$/;
      const zTokens = declarations.filter((declaration) =>
        declaration.prop.startsWith("--z-")
      );

      expect(zTokens.length, "Missin `z-index` tokens.").toBeGreaterThan(0);

      for (const { prop, selector, value } of zTokens) {
        expect(
          integerPattern.test(value),
          `Architectural violation in \`${selector}\`: \`${prop}\` has an invalid value ("${value}"). \`z-index\` tokens must be unitless integers.`
        ).toBe(true);
      }

      expect.assertions(zTokens.length + 1);
    });

    it("should ensure all theme variants implement the exact same color tokens", () => {
      const [baseSelector, ...remainingSelectors] = selectors;

      // Fail gracefully if the file is completely empty
      expect(baseSelector).toBeDefined();

      const baseColorTokens = getColorTokens(baseSelector);

      for (const selector of remainingSelectors) {
        const variantColorTokens = getColorTokens(selector);

        expect(
          variantColorTokens,
          `Theme variant "${selector}" does not match the color tokens of "${baseSelector}".`
        ).toStrictEqual(baseColorTokens);
      }
    });

    it.each(selectors)(
      "should allow only named colors or CSS variables as values for color tokens in `%s`",
      (selector) => {
        for (const colorToken of getColorTokens(selector)) {
          const value = theme[selector][colorToken].trim();

          expect(
            isAllowedColorValue(value),
            `Architectural violation in \`${selector}\`: \`${colorToken}\` has an invalid value ("${value}"). Only CSS variables and named colors are allowed`
          ).toBe(true);
        }
      }
    );
  });

  describe("Contrast and Accessibility", async () => {
    const rawColorsCss = await readFile(
      "./src/0-primitives/colors.css",
      "utf-8"
    );
    const colorPrimitives = parseCSSToDictionary(rawColorsCss)[":root"];

    describe("Color primitives integrity", () => {
      it("should enforce strict syntax for raw colors, forbidding alpha channels and named colors", () => {
        const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

        for (const [prop, value] of Object.entries(colorPrimitives)) {
          const isHex = hexPattern.test(value);
          const isValidCSSFunction =
            value.startsWith("rgb(") || value.startsWith("hsl(");
          const hasAlpha =
            value.includes("/") ||
            value.includes("hsla") ||
            value.includes("rgba");
          const isNamedColor = CSS_NAMED_COLORS.has(value.toLowerCase());

          expect(
            isNamedColor,
            `Architectural violation: Primitive \`${prop}\` uses named color "${value}". Use raw physical coordinates (Hex/RGB/HSL) in the primitives layer.`
          ).toBe(false);

          expect(
            isHex || (isValidCSSFunction && !hasAlpha),
            `Architectural violation: Primitive \`${prop}\` has invalid value "${value}". Only 3/6-digit hex, rgb(), and hsl() without alpha are allowed.`
          ).toBe(true);
        }
      });
    });

    describe("Text over background (WCAG 2.1)", () => {
      it.each(selectors)(
        "should ensure all text tokens (`--on-*`) have a contrast ratio of at least 4.5:1 against their background in `%s`",
        (selector) => {
          const themeTokens = theme[selector];

          // Create the unified context for resolution without mutating the original AST
          const resolutionContext = {
            ...colorPrimitives,
            ...themeTokens,
          };

          const textTokens = Object.keys(themeTokens).filter((prop) =>
            prop.startsWith("--on-")
          );

          for (const textToken of textTokens) {
            const bgToken = textToken.replace("--on-", "--");

            // Implicit architectural check: ensure the background token actually exists
            expect(
              themeTokens[bgToken],
              `Architectural violation in \`${selector}\`: Background token \`${bgToken}\` is missing for text token \`${textToken}\`.`
            ).toBeDefined();

            const textRawColor = resolveToken(textToken, resolutionContext);
            const bgRawColor = resolveToken(bgToken, resolutionContext);
            const colorText = new Color(textRawColor);
            const colorBg = new Color(bgRawColor);
            const contrastRatio = colorBg.contrast(colorText, "WCAG21");

            expect(
              contrastRatio,
              `Accessibility violation in \`${selector}\`: Contrast between \`${textToken}\` (${textRawColor}) and ` +
                `\`${bgToken}\` (${bgRawColor}) is too low (${contrastRatio.toFixed(2)}:1). Expected at least 4.5:1.`
            ).toBeGreaterThanOrEqual(4.5);
          }
        }
      );
    });

    describe.each(Object.entries(contrastRules))(
      "Category: %s",
      (category, rules) => {
        const testCases = [];

        // build a flat array of test cases
        for (const selector of selectors) {
          for (const rule of rules) {
            for (const token of rule.tokens) {
              // eslint-disable-next-line max-depth
              for (const target of rule.testAgainst) {
                testCases.push({ rule, selector, target, token });
              }
            }
          }
        }

        it.each(testCases)(
          "[$selector] `$token` vs `$target`",
          ({ rule, selector, target, token }) => {
            const themeTokens = theme[selector];

            // Create the unified context for resolution without mutating the original AST
            const resolutionContext = {
              ...colorPrimitives,
              ...themeTokens,
            };

            // Architectural checks
            expect(
              themeTokens[token],
              `Architectural violation in \`${selector}\`: Token \`${token}\` defined in rule "${rule.description}" is missing.`
            ).toBeDefined();

            expect(
              themeTokens[target],
              `Architectural violation in \`${selector}\`: Target token \`${target}\` defined in rule "${rule.description}" is missing.`
            ).toBeDefined();

            const rawColorA = resolveToken(token, resolutionContext);
            const rawColorB = resolveToken(target, resolutionContext);
            const colorA = new Color(rawColorA);
            const colorB = new Color(rawColorB);

            let actualValue;
            let expectedValue;

            if (rule.algorithm === "DeltaE2000") {
              actualValue = colorA.deltaE2000(colorB);
              expectedValue = rule.minimumDistance;
            } else {
              actualValue = Math.abs(colorA.contrast(colorB, rule.algorithm));
              expectedValue = rule.minimumRatio;
            }

            expect(
              actualValue,
              `Accessibility violation in \`${selector}\`: ${rule.description}\n` +
                `Failed between \`${token}\` (${rawColorA}) and \`${target}\` (${rawColorB}).\n` +
                `Expected ${rule.algorithm} >= ${expectedValue}, got ${actualValue.toFixed(2)}.`
            ).toBeGreaterThanOrEqual(expectedValue);
          }
        );
      }
    );
  });
});
