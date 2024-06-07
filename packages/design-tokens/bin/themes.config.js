const globals = [
  `src/skins/dusk/tokens/base/typography/typography.json`,
  `src/skins/dusk/tokens/base/size/size.json`,
  `src/skins/dusk/tokens/functional/motion/loading.json`,
  `src/skins/dusk/tokens/functional/motion/patterns.json`,
  `src/skins/dusk/tokens/functional/size/border.json`,
  `src/skins/dusk/tokens/functional/size/breakpoints.json`,
  `src/skins/dusk/tokens/functional/size/viewports.json`,
];

export const themes = [
  {
    filename: 'light',
    source: [
      `src/skins/dusk/tokens/functional/border/light/light.json`,
      `src/skins/dusk/tokens/functional/color/light/light.json`,

    ],
    include: [
      ...globals,
      `src/skins/dusk/tokens/base/color/light/light.json`,
      `src/skins/dusk/tokens/functional/color/light/light-primitives.json`
    ],
  },
  {
    filename: 'dark',
    source: [
      `src/skins/dusk/tokens/functional/border/dark/dark.json`,
      `src/skins/dusk/tokens/functional/color/dark/dark.json`,

    ],
    include: [
      ...globals,
      `src/skins/dusk/tokens/base/color/dark/dark.json`,
      `src/skins/dusk/tokens/functional/color/dark/dark-primitives.json`
    ],
  }
]
