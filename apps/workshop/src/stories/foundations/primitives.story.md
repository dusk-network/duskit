---
group: "foundations"
icon: "mdi:atom"
title: "Primitives"
---

# Primitives

> Primitives are fundamental pieces of implemented code that provide apps with Duskit's design tokens.

## Overview

We use StyleDictionary to manage the interface between Figma and our supported platform's UI. StyleDictionary will format the design tokens into many platform specific formats that can be imported. Duskit is currently only using the CSS primitives in it's component implementation.

## CSS

Duskit design tokens are available to consume as CSS variables.

### Installation

```
npm install @dusk-network/design-tokens
```

### Usage

```css
@import "@dusk-network/design-tokens/css/fonts.css";
@import "@dusk-network/design-tokens/css/variables.css";
```

### Theming

Duskit design token primitives are used to set less specific variables whose value depends on whether the document root has a `dark` class. If the `dark` class is present, Duskit components apply primitives to variables for use in dark mode, light mode is the default theme.

```html
<body class="dark"></body>
```

### Variables

...

## Available Themes

- Light
- Dark
