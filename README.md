# Duskit

Duskit (Dusk Kit) contains Svelte components and JS utilities that can help you quickly build a Dusk web app.

## TOC

- [Dev environment](#dev-environment)
  - [Installing dependencies](#installing-dependencies)
- [Packages](#packages)
- [NPM scripts](#npm-scripts)

## Dev environment

The dev environment assumes that you have at least Node.js v20.x installed. The LTS version is 20.12.1 at the time of writing.

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

- [@duskit/workshop](apps/workshop/README.md)
- [@duskit/components](packages/components/README.md)
- [@duskit/currency](packages/currency/README.md)
- [@duskit/design-tokens](packages/design-tokens/README.md)
- [@duskit/error](packages/error/README.md)
- [@duskit/http](packages/http/README.md)
- [@duskit/icons](packages/icons/README.md)
- [@duskit/string](packages/string/README.md)
- [@duskit/test-helpers](packages/test-helpers/README.md)

<p align="right"><a href="#toc">[back to TOC]</a></p>

## NPM scripts

All [terminal commands](#npm-scripts) listed here assume that you are positioned in root folder of the repository.
Commands executed from the root folder take advantage of [Turbo's caching](https://turbo.build/repo/docs/core-concepts/caching).

The following commands act on all packages in the monorepo, where applicable.
If you want instead to run a command for a single package you can add a [filter](https://turbo.build/repo/docs/core-concepts/monorepos/filtering):

```bash
npm test -- --filter http
```

This executes tests only for the [@duskit/http](packages/http/README.md) package.

Alternatively you can move to the package's folder and run the appropriate command from there.
Refer to the package's README to see which commands are available.

**N.B.** the `changeset`, `release` and `version-packages` scripts are commands related to the whole monorepo and cannot be run from a single package.

- `npm run build` - builds the [Histoire](https://histoire.dev/) app
- `npm run changeset` - shows an interactive shell to [create][changeset-add] a new changeset entry
- `npm run checks` - runs all health checks (formatting, linting, type checking, tests)
- `npm run clean` - runs the `clean` script for all packages (currently removes all `coverage` and `node_modules` folders)
- `npm run dev` - runs the [Histoire](https://histoire.dev/) app in dev mode
- `npm run format:check` - performs the formatting check
- `npm run format` - fixes the formatting in all files
- `npm run lint` - performs the linting check
- `npm run lint:fix` - fixes, where possible, linting errors
- `npm run release` - [publishes][changeset-publish] a new release
- `npm run test` - runs the test suite
- `npm run test:coverage` - runs the test suite and generates the code coverage report in the `coverage` folder of each package
- `npm run test:watch` - runs the test suite in watch mode
- `npm run typecheck` - runs the type checker
- `npm run typecheck:watch` - runs the type checker in watch mode
- `npm run version-packages` - [updates][changeset-version] versions and dependencies of packages and creates the changelogs

<p align="right"><a href="#toc">[back to TOC]</a></p>

[changeset-add]: https://github.com/changesets/changesets/blob/main/docs/command-line-options.md#add
[changeset-publish]: https://github.com/changesets/changesets/blob/main/docs/command-line-options.md#publish
[changeset-version]: https://github.com/changesets/changesets/blob/main/docs/command-line-options.md#version
