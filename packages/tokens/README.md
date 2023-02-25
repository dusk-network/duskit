# Dusk UI Kit - Styles

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/dusk-ui-kit/?path=/story/components-atoms-wizard)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/dusk-ui-kit/docs/components/atoms/wizard)

## Installation

_*Note* this package is already set-up and configured in the `dusk-ui-boilerplate`_

```bash
npm i -D @dusk-network/tokens
```

## Usage with SvelteKit

```svelte
// svelte.config.js

import dusk from "@dusk-network/tokens/plugin/index.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    vite: () => ({
      plugins: [
        virtualExamplePlugin(),
        virtualMetaPlugin(),
        dusk({
          cssPath: "./node_modules/@dusk-network/tokens/tailwind.css",
        }),
      ],
    }),
  },
};
```
