export const themes = [
  {
    filename: "light",
    include: [`src/tokens/base/color/light.json`],
    source: [
      `src/tokens/functional/border.json`,
      `src/tokens/functional/color/*.json`,
    ],
    theme: "light",
  },
  {
    filename: "dark",
    include: [`src/tokens/base/color/dark.json`],
    source: [
      `src/tokens/functional/border.json`,
      `src/tokens/functional/color/*.json`,
    ],
    theme: "dark",
  },
];
