# @duskit/components

[![Duskit CI](https://github.com/dusk-network/duskit/actions/workflows/ci.yml/badge.svg)](https://github.com/dusk-network/duskit/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@duskit/components.svg)](https://www.npmjs.com/package/@duskit/components)

Svelte components to build a Dusk web application.

## TOC

- [Dev environment](#dev-environment)
- [Installation and usage](#installation-and-usage)
- [Packages](#packages)
- [NPM scripts](#npm-scripts)

## Dev environment

The dev environment assumes that you have at least Node.js v22.15.0 installed. The LTS version is 22.15.0 at the time of writing.

This package is part of the [Duskit](https://github.com/dusk-network/duskit/) monorepo.
Please refer to the [main README](../../README.md) for monorepo usage, changeset management and installation of dependencies.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## Installation and usage

Install it with your favourite package manager:

```bash
npm install @duskit/components --save
```

### Peer Requirements

This package relies on the consumer application hosting the core execution runtime and the styling framework.

- **Svelte:** fully compatible with both **Svelte v4** and **Svelte v5** (`^4.2.0 || ^5.0.0`).
- **`@duskit/css` (optional):** the components are structurally encapsulated and function independently, but installing `@duskit/css` is highly recommended to automatically inherit the official theme, semantic tokens, and interaction physics of the Dusk design language.

### Usage

Import the components you need in your Svelte files:

```svelte
<script>
  import { Button } from "@duskit/components";
</script>

<Button text="Hi there" />
```

This package doesn't include a prebuilt output, and lets the consumer application do the job.

This works well in out usual setup (SvelteKit), but causes issues in Vitest: components imported from `node_modules` won't be compiled in the testing environment.

The easy solution is to inline this dependency in tests, but after that other `@duskit` libraries used by this one aren't correctly imported.

To avoid these issues, make sure to inline all `@duskit` packages in your test configuration::

```js
// example vite.config.js

import { defineConfig } from "vite";

export default defineConfig(() => ({
  // ... your config

  test: {
    server: {
      deps: {
        inline: [/@duskit\/.*/],
      },
    },
  },
}));
```

<p align="right"><a href="#toc">[back to TOC]</a></p>

## NPM scripts

- `npm run checks` - runs all health checks (formatting, linting, type checking, tests)
- `npm run clean` - removes the `coverage` and `node_modules` folders
- `npm run format` - fixes the formatting in all files
- `npm run format:check` - performs the formatting check
- `npm run lint` - performs the linting checks (code and styles)
- `npm run lint:code` - performs the linting checks for the code only
- `npm run lint:fix` - fixes, where possible, linting errors
- `npm run lint:styles` - performs the linting checks for the styles only
- `npm run test` - runs the test suite
- `npm run test:coverage` - runs the test suite and generates the code coverage report in the `coverage` folder
- `npm run test:watch` - runs the test suite in watch mode
- `npm run typecheck` - runs the type checker
- `npm run typecheck:watch` - runs the type checker in watch mode

<p align="right"><a href="#toc">[back to TOC]</a></p>
