# @duskit/svelte-stores

[![Duskit CI](https://github.com/dusk-network/duskit/actions/workflows/ci.yml/badge.svg)](https://github.com/dusk-network/duskit/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@duskit/svelte-stores.svg)](https://www.npmjs.com/package/@duskit/svelte-stores)

Svelte stores and helpers.

## TOC

- [Dev environment](#dev-environment)
- [Installation and usage](#installation-and-usage)
- [Persisted stores](#persisted-stores)
- [NPM scripts](#npm-scripts)

## Dev environment

The dev environment assumes that you have at least Node.js v22.15.0 installed. The LTS version is 22.15.0 at the time of writing.

This package is part of the [Duskit](https://github.com/dusk-network/duskit/) monorepo.
Please refer to the [main README](../../README.md) for monorepo usage, changeset management and installation of dependencies.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## Installation and usage

Install it with your favourite package manager:

```bash
npm install @duskit/svelte-stores --save
```

<p align="right"><a href="#toc">[back to TOC]</a></p>

## Persisted stores

`createPersistedStore` uses `localStorage` by default. Supply a synchronous
Web Storage implementation when the data should live elsewhere:

```js
const store = createPersistedStore("draft", initialDraft, {
  getStorage: () => window.sessionStorage,
});
```

Stored values must have the same runtime type as the initial value. Use
`validate` when the store accepts a more specific shape or an intentional
alternative type such as `null`:

```ts
type Selection = { id: string };

const initialSelection: Selection | null = getInitialSelection();
const store = createPersistedStore<Selection | null>(
  "selection",
  initialSelection,
  {
    validate: (value): value is Selection | null =>
      value === null ||
      (typeof value === "object" &&
        value !== null &&
        "id" in value &&
        typeof value.id === "string"),
  }
);
```

Storage is resolved when the store is created, so importing the package during
server-side rendering does not access browser globals. Asynchronous storage is
not supported.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## NPM scripts

- `npm run checks` - runs all health checks (formatting, linting, type checking, tests)
- `npm run clean` - removes the `coverage`, `docs` and `node_modules` folders
- `npm run docs` - generates the HTML documentation in the `docs` folder
- `npm run format` - fixes the formatting in all files
- `npm run format:check` - performs the formatting check
- `npm run lint` - performs the linting check
- `npm run lint:fix` - fixes, where possible, linting errors
- `npm run test` - runs the test suite
- `npm run test:coverage` - runs the test suite and generates the code coverage report in the `coverage` folder
- `npm run test:watch` - runs the test suite in watch mode
- `npm run typecheck` - runs the type checker
- `npm run typecheck:watch` - runs the type checker in watch mode

<p align="right"><a href="#toc">[back to TOC]</a></p>
