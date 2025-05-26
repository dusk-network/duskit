# @duskit/design-tokens

[![Duskit CI](https://github.com/dusk-network/duskit/actions/workflows/ci.yml/badge.svg)](https://github.com/dusk-network/duskit/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@duskit/design-tokens.svg)](https://www.npmjs.com/package/@duskit/design-tokens)

Design tokens for styling Dusk apps.

## TOC

- [Dev environment](#dev-environment)
- [Installation and usage](#installation-and-usage)
- [Packages](#packages)
- [NPM scripts](#npm-scripts)

## Dev environment

This package is part of the [Duskit](https://github.com/dusk-network/duskit/) monorepo.
Please refer to the [main README](../../README.md) for monorepo usage, changeset management and installation of dependencies.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## Installation and usage

```bash
npm install @duskit/design-tokens --save
```

Use the design tokens in your CSS files:

```html
<link rel="stylesheet" href="@duskit/js/functional/themes/light.css" />
```

```css
@import url("@duskit/js/functional/themes/light.css");
main {
  background-color: var(--background-color);
  color: var(--on-background-color);
}
```

<p align="right"><a href="#toc">[back to TOC]</a></p>

## NPM scripts

- `npm run build` - builds the tokens into platform files
- `npm run checks` - runs all health checks (formatting)
- `npm run clean` - removes the `node_modules` folder
- `npm run format` - fixes the formatting in all files
- `npm run format:check` - performs the formatting check

<p align="right"><a href="#toc">[back to TOC]</a></p>
