# @duskit/icons

[![Duskit CI](https://github.com/dusk-network/duskit/actions/workflows/ci.yml/badge.svg)](https://github.com/dusk-network/duskit/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@duskit/icons.svg)](https://www.npmjs.com/package/@duskit/icons)

SVG paths for common Dusk icons, exported as strings.

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
npm install @duskit/icons --save
```

Import and use the icons you need:

```svelte
<script>
  import { logo } from "@duskit/icons";
  import { Icon } from "@duskit/components";
</script>

<Icon path={logo} />
```

<p align="right"><a href="#toc">[back to TOC]</a></p>

## NPM scripts

- `npm run checks` - runs all health checks (formatting and linting)
- `npm run clean` - removes the `node_modules` folder
- `npm run format` - fixes the formatting in all files
- `npm run format:check` - performs the formatting check
- `npm run lint` - performs the linting check
- `npm run lint:fix` - fixes, where possible, linting errors

<p align="right"><a href="#toc">[back to TOC]</a></p>
