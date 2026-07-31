# @duskit/http

[![Duskit CI](https://github.com/dusk-network/duskit/actions/workflows/ci.yml/badge.svg)](https://github.com/dusk-network/duskit/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@duskit/http.svg)](https://www.npmjs.com/package/@duskit/http)

Functions for http formatting and manipulation.

## TOC

- [Dev environment](#dev-environment)
- [Installation and usage](#installation-and-usage)
- [NPM scripts](#npm-scripts)

## Dev environment

The dev environment assumes that you have at least Node.js v20.x installed. The LTS version is 20.12.1 at the time of writing.

This package is part of the [Duskit](https://github.com/dusk-network/duskit/) monorepo.
Please refer to the [main README](../../README.md) for monorepo usage, changeset management and installation of dependencies.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## Installation and usage

Install it with your favourite package manager:

```bash
npm install @duskit/http --save
```

Import the functions you need:

```js
import { failureToRejection } from "@duskit/http";

const response = new Response("", { status: 404 });

failureToRejection(response); // => Promise { <state>: "rejected", <reason>: Error }
```

`HttpTransport` accepts a custom `fetch` implementation. This is useful for
framework-provided request functions and isolated tests:

```js
const transport = new HttpTransport({
  baseURL: "https://api.example.com",
  fetch: event.fetch,
});
```

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
