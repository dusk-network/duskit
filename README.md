# Duskit

[![Duskit CI](https://github.com/dusk-network/duskit/actions/workflows/ci.yml/badge.svg)](https://github.com/dusk-network/duskit/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@duskit/array.svg?label=%40duskit%2Farray)](https://www.npmjs.com/package/@duskit/array)
[![NPM version](https://img.shields.io/npm/v/@duskit/components.svg?label=%40duskit%2Fcomponents)](https://www.npmjs.com/package/@duskit/components)
[![NPM version](https://img.shields.io/npm/v/@duskit/css.svg?label=%40duskit%2Fcss)](https://www.npmjs.com/package/@duskit/css)
[![NPM version](https://img.shields.io/npm/v/@duskit/date.svg?label=%40duskit%2Fdate)](https://www.npmjs.com/package/@duskit/date)
[![NPM version](https://img.shields.io/npm/v/@duskit/encoding.svg?label=%40duskit%2Fencoding)](https://www.npmjs.com/package/@duskit/encoding)
[![NPM version](https://img.shields.io/npm/v/@duskit/error.svg?label=%40duskit%2Ferror)](https://www.npmjs.com/package/@duskit/error)
[![NPM version](https://img.shields.io/npm/v/@duskit/http.svg?label=%40duskit%2Fhttp)](https://www.npmjs.com/package/@duskit/http)
[![NPM version](https://img.shields.io/npm/v/@duskit/icons.svg?label=%40duskit%2Ficons)](https://www.npmjs.com/package/@duskit/icons)
[![NPM version](https://img.shields.io/npm/v/@duskit/math.svg?label=%40duskit%2Fmath)](https://www.npmjs.com/package/@duskit/math)
[![NPM version](https://img.shields.io/npm/v/@duskit/promise.svg?label=%40duskit%2Fpromise)](https://www.npmjs.com/package/@duskit/promise)
[![NPM version](https://img.shields.io/npm/v/@duskit/string.svg?label=%40duskit%2Fstring)](https://www.npmjs.com/package/@duskit/string)
[![NPM version](https://img.shields.io/npm/v/@duskit/svelte-actions.svg?label=%40duskit%2Fsvelte-actions)](https://www.npmjs.com/package/@duskit/svelte-actions)
[![NPM version](https://img.shields.io/npm/v/@duskit/svelte-stores.svg?label=%40duskit%2Fsvelte-stores)](https://www.npmjs.com/package/@duskit/svelte-stores)
[![NPM version](https://img.shields.io/npm/v/@duskit/test-helpers.svg?label=%40duskit%2Ftest-helpers)](https://www.npmjs.com/package/@duskit/test-helpers)

Duskit (Dusk Kit) contains Svelte components and JS utilities that can help you quickly build a Dusk web app.

The interactive documentation and visual playground for all components is available on our public [Storybook](https://dusk-network.github.io/duskit/).

## TOC

- [Dev environment](#dev-environment)
  - [Installing dependencies](#installing-dependencies)
- [Packages](#packages)
- [NPM scripts](#npm-scripts)

## Dev environment

The dev environment assumes that you have at least Node.js v22.15.0 installed. The LTS version is 22.15.0 at the time of writing.

Duskit is a monorepo managed with [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) and [Turbo](https://turbo.build/).

### Installing dependencies

Run `npm install` from the root folder to get the necessary dependencies for all packages in the monorepo.

All additional dependencies must be installed with the `--save-exact` flag.

To install an additional dependency for all packages in the monorepo use the `--workspaces` flag.
Example for a fictional dev dependency called "foo-bar":

```bash
npm install foo-bar --save-dev --save-exact --workspaces
```

To install the same additional dependency for a single package, like the `http` one for example:

```bash
npm install foo-bar --save-dev --save-exact --workspace=packages/http
```

Alternatively you can move to a package root and install the dependency from there as usual.
`npm` is smart enough to understand that the package is a workspace in a monorepo.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## Packages

- [@duskit/array](packages/array/README.md)
- [@duskit/components](packages/components/README.md)
- [@duskit/css](packages/css/README.md)
- [@duskit/date](packages/date/README.md)
- [@duskit/encoding](packages/encoding/README.md)
- [@duskit/error](packages/error/README.md)
- [@duskit/http](packages/http/README.md)
- [@duskit/icons](packages/icons/README.md)
- [@duskit/math](packages/math/README.md)
- [@duskit/promise](packages/promise/README.md)
- [@duskit/string](packages/string/README.md)
- [@duskit/svelte-actions](packages/svelte-actions/README.md)
- [@duskit/svelte-stores](packages/svelte-stores/README.md)
- [@duskit/test-helpers](packages/test-helpers/README.md)

<p align="right"><a href="#toc">[back to TOC]</a></p>

## NPM scripts

All [terminal commands](#npm-scripts) listed here assume that you are positioned in root folder of the repository.
Commands executed from the root folder take advantage of [Turbo's caching](https://turbo.build/repo/docs/core-concepts/caching).
To run a command skipping the cache read (not the writing), add the `--force` flag.
For example for the `checks` task:

```bash
npm run checks -- --force
```

The following commands act on all packages in the monorepo, where applicable.
If you want instead to run a command for a single package you can add a [filter](https://turbo.build/repo/docs/core-concepts/monorepos/filtering):

```bash
npm test -- --filter http
```

This executes tests only for the [@duskit/http](packages/http/README.md) package.

Alternatively you can move to the package's folder and run the appropriate command from there.
Refer to the package's README to see which commands are available.

**N.B.** the `changeset`, `release` and `version-packages` scripts are commands related to the whole monorepo and cannot be run from a single package.

- `npm run build` - runs all build tasks (tokens + Storybook)
- `npm run build:storybook` - builds a static Storybook into `apps/storybook/storybook-static`
- `npm run build:tokens` - builds the design tokens
- `npm run changeset` - shows an interactive shell to [create][changeset-add] a new changeset entry
- `npm run checks` - runs all health checks (formatting, linting, type checking, tests)
- `npm run clean` - runs the `clean` script for all packages (currently removes all `coverage`, `docs` and `node_modules` folders)
- `npm run docs` - generates HTML documentation for all `@duskit` in the `docs` folder
- `npm run dev` - runs the dev tasks (including Storybook)
- `npm run dev:storybook` - runs Storybook only
- `npm run format` - fixes the formatting in all files
- `npm run format:check` - performs the formatting check
- `npm run lint` - performs the linting check
- `npm run lint:fix` - fixes, where possible, linting errors
- `npm run release` - [publishes][changeset-publish] a new release
- `npm run test` - runs the test suite
- `npm run test:coverage` - runs the test suite and generates the code coverage report in the `coverage` folder of each package
- `npm run test:watch` - runs the test suite in watch mode
- `npm run typecheck` - runs the type checker
- `npm run typecheck:watch` - runs the type checker in watch mode
- `npm run version` - [updates][changeset-version] versions and dependencies of packages and creates the changelogs

<p align="right"><a href="#toc">[back to TOC]</a></p>

[changeset-add]: https://github.com/changesets/changesets/blob/main/docs/command-line-options.md#add
[changeset-publish]: https://github.com/changesets/changesets/blob/main/docs/command-line-options.md#publish
[changeset-version]: https://github.com/changesets/changesets/blob/main/docs/command-line-options.md#version
