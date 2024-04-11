# @duskit/design-tokens

[![Duskit CI](https://github.com/dusk-network/duskit/actions/workflows/ci.yml/badge.svg)](https://github.com/dusk-network/duskit/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@duskit/design-tokens.svg)](https://www.npmjs.com/package/@duskit/design-tokens)

Design tokens for styling Dusk web applications.

## TOC

- [Dev environment](#dev-environment)
- [Installation and usage](#installation-and-usage)
- [Packages](#packages)
- [NPM scripts](#npm-scripts)

## Dev environment

The dev environment assumes that you have at least Node.js v20.x installed. The LTS version is 20.12.1 at the time of writing.

This package is part of the [Duskit](https://github.com/dusk-network/duskit/) monorepo.
Please refer to the [main README](../../README.md) for monorepo usage, changeset management and installation of dependencies.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## Installation and usage

Install it with your favourite package manager:

```bash
npm install @duskit/design-tokens --save
```

Import the main theme in your main JS file (entry point):

```js
import "@duskit/design-tokens/src/themes/dusk/theme.css";
```

Use the design tokens in your CSS files:

```css
main {
  background-color: var(--background-color);
  color: var(--on-background-color);
}
```

<p align="right"><a href="#toc">[back to TOC]</a></p>

## NPM scripts

- `npm run checks` - runs all health checks (formatting)
- `npm run clean` - removes the `node_modules` folder
- `npm run format` - fixes the formatting in all files
- `npm run format:check` - performs the formatting check

<p align="right"><a href="#toc">[back to TOC]</a></p>
