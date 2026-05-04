# @duskit/css

[![Duskit CI](https://github.com/dusk-network/duskit/actions/workflows/ci.yml/badge.svg)](https://github.com/dusk-network/duskit/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/@duskit/css.svg)](https://www.npmjs.com/package/@duskit/css)

Framework-agnostic CSS architecture and global design tokens for Dusk web applications.

This package currently operates as a hybrid: part strict design system, part architectural philosophy, and part pragmatic, drop-in CSS framework for Dusk web applications. It balances the mathematical rigor of a strictly governed architecture with the temporary, calculated compromises required for immediate production utility.

## TOC

- [Dev environment](#dev-environment)
- [Installation and usage](#installation-and-usage)
- [NPM scripts](#npm-scripts)
- [Architecture & Design System](#architecture--design-system)

## Dev environment

The dev environment assumes that you have at least Node.js v22.15.0 installed. The LTS version is 24.15.0 at the time of writing.

This package is part of the [Duskit](https://github.com/dusk-network/duskit/) monorepo.
Please refer to the [main README](../../README.md) for monorepo usage, changeset management and installation of dependencies.

<p align="right"><a href="#toc">[back to TOC]</a></p>

## Installation and usage

Install it with your favourite package manager:

```bash
npm install @duskit/css --save
```

This package exposes a single CSS file that includes the full Duskit styling stack: design tokens, reset rules, component styles, and utilities.

Depending on your bundler and application setup, you can import it in two ways:

### Option A: Import via JavaScript / Component Framework (Recommended)

If you are using a modern bundler (like Vite, Webpack, or Turbopack), the most robust approach is to import the CSS directly into your application's root file. The bundler will automatically process, optimize, and include the stylesheet in your application's build pipeline.

```js
// e.g., in your root +layout.svelte, main.ts, or App.jsx
import "@duskit/css/main.css";
```

### Option B: Import via CSS

If your application already relies on a main global CSS file processed by a build tool (e.g., via PostCSS or Vite's CSS pipeline), you can keep your style imports centralized there.

```css
/* src/app.css */
@import "@duskit/css/main.css";

/* Your custom application styles follow... */
```

> **Warning:** Only use `@import` if your CSS is processed by a build tool. Using native `@import` in an unbundled static CSS file will trigger sequential network requests (waterfall effect), significantly degrading the performance of your application.

### Cascade Order

To ensure that the design system's rules act as the foundational "base" layer, always import `@duskit/css/main.css` as the **very first** styling entry in your application.

Avoid mixing statically linked local stylesheets (via `<link />` tags in your base `index.html` or `app.html`) with bundler-managed CSS imports unless you fully control their loading order. Doing so bypasses the bundler's orchestration and can lead to unexpected cascade behavior, where your local styles might be incorrectly overridden by the design system.

### Direct Browser Usage (Not Recommended)

While you can technically include the stylesheet directly via a `<link>` tag pointing to a CDN or a local path, this approach bypasses your bundler's CSS pipeline and optimization. It is generally discouraged for modern component-driven applications.

```html
<link rel="stylesheet" href="https://unpkg.com/@duskit/css/main.css" />
```

<p align="right"><a href="#toc">[back to TOC]</a></p>

## NPM scripts

This package comes with several npm scripts to help you maintain code quality, formatting, and linting.

- `npm run checks`: runs all health checks (formatting, linting, type checking, tests)
- `npm run clean`: removes the `node_modules` directory.
- `npm run format`: formats all supported files in the package using Prettier.
- `npm run format:check`: checks if files are properly formatted with Prettier without making any changes.
- `npm run lint`: performs the linting checks (code and styles)
- `npm run lint:code`: performs the linting checks for the code only
- `npm run lint:styles` - performs the linting checks for the styles only
- `npm run lint:fix`: fixes, where possible, linting errors
- `npm run test:watch` - runs the test suite in watch mode
- `npm run typecheck` - runs the type checker
- `npm run typecheck:watch` - runs the type checker in watch mode

<p align="right"><a href="#toc">[back to TOC]</a></p>

## Architecture & Design System

This package is not just a collection of styles, but a strictly governed design system based on a Strict Inheritance model. It enforces a rigorous layered architecture that prevents code decay by strictly separating semantic design intent from physical UI anatomy, isolating global theme definitions from component APIs to ensure a predictable, theme-agnostic, and mathematically testable ecosystem.

Before contributing to or consuming this package for new UI development, you **must** read the architectural guidelines:

**[Read the full CSS Architecture Manifesto](./ARCHITECTURE.md)**

<p align="right"><a href="#toc">[back to TOC]</a></p>
