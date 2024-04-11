# @duskit/workshop

[![Duskit CI](https://github.com/dusk-network/duskit/actions/workflows/ci.yml/badge.svg)](https://github.com/dusk-network/duskit/actions/workflows/ci.yml)

Storybook for [@duskit/components](../../packages/components/README.md)

## TOC

- [Dev environment](#dev-environment)
- [Packages](#packages)
- [NPM scripts](#npm-scripts)

## Dev environment

The dev environment assumes that you have at least Node.js v20.x installed. The LTS version is 20.12.1 at the time of writing.

This package is part of the [Duskit](https://github.com/dusk-network/duskit/) monorepo.
Please refer to the [main README](../../README.md) for monorepo usage, changeset management and installation of dependencies.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## NPM scripts

- `npm run build` - builds the [Histoire](https://histoire.dev/) app
- `npm run checks` - runs all health checks (formatting and linting)
- `npm run clean` - deletes the `node_modules` folder
- `npm run dev` - runs the [Histoire](https://histoire.dev/) app in dev mode
- `npm run format` - fixes the formatting in all files
- `npm run format:check` - performs the formatting check
- `npm run lint` - performs the linting check
- `npm run lint:fix` - fixes, where possible, linting errors
- `npm run preview` - runs a preview of the built [Histoire](https://histoire.dev/) app on port 4567

<p align="right"><a href="#toc">[back to TOC]</a></p>
