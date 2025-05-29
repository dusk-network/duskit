---
group: "foundations"
icon: "mdi:palette"
title: "Color System"
---

# Color System

> Color is at the foundation of Dusk's visual language.

## Overview

### Color Modes

When designing components for Duskit, both light and dark color modes must be considered as all Duskit components support both light and dark mode. See [Figma guidelines](./figma.story.md) for more information about using design tokens.

## Color design tokens

Duskit delivers colors in the form of design tokens. Design tokens are a layer of abstraction that allows for better maintainability, consistency and theming. Within Duskit, design tokens are represented as CSS variables for code and Figma variables for design. For a full reference table of all available design tokens, see the color [CSS variables page](./figma.story.md).

As an example of how color tokens work, when `bgColor-default` is referenced for a background color, the value of that token will automatically change depending on the theme.

## Design token categories

**Base** color tokens are the lowest level tokens and map directly to a raw value. They are only to be used as a reference for functional and component/pattern tokens. Base color tokens don't respect color modes and should never be used directly in code or design

Example: `Color-Brand-Cornflower-5`

**Functional** color tokens represent global UI patterns such as text, borders, shadows, and backgrounds. These are the most commonly used design tokens throughout all of Dusk/Duskit. Functional color tokens reference base color tokens under the hood, and respect color modes.

Example: `Bg-Button-Hover`

## Neutral Colors

Shades of gray used for text, borders, backgrounds, and shadows.

### Foreground

Foreground tokens use the `fgColor` property and are used for text and icons.
...

### Background

Background tokens use the `bgColor` property and are used for backgrounds and fills.
...

### Border

Border tokens use the `borderColor` property and are used for borders and dividers.
...

### Shadow

Shadow tokens use the `shadow` property and are used for shadows and elevation.
...

## Semantic colors

Semantic colors are typically used to communicate status, action, or emphasis. Each semantic color is tied to a [state](#stateful-colors) with a specific meaning. Color tokens are available for foreground, background, and border. Background and border colors have both a `muted` and `emphasis` option.

### Muted

Muted background and border colors are often combined to draw attention to a specific piece of content with a subtle emphasis.

### Emphasis

Emphasis background colors provide a stronger emphasis for UI elements and are always combined with `fgColor-onEmphasis` tokens for text and icons.

### Semantic foreground

Foreground semantic colors provide contrast against `muted` and default background colors and should be used for text and icons.

## Stateful Colors

| Colors                                                                                                                                    | Roles     | Usage                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------- | :-------- | :---------------------------------------------------------------- |
| <div style="background-color: #71B1FF;display: inline-block;padding: 1rem;border-radius: .5rem;margin: .5rem;"><code>#71B1FF</code></div> | Neutral   | Links, selected, active, and focus states and neutral information |
| <div style="background-color: #16DB93;display: inline-block;padding: 1rem;border-radius: .5rem;margin: .5rem;"><code>#16DB93</code></div> | Success   | Primary buttons, positive messaging and successful states         |
| <div style="background-color: #FFCF23;display: inline-block;padding: 1rem;border-radius: .5rem;margin: .5rem;"><code>#FFCF23</code></div> | Attention | Active processes such as syncing and cautionary information       |
| <div style="background-color: #ED254E;display: inline-block;padding: 1rem;border-radius: .5rem;margin: .5rem;"><code>#ED254E</code></div> | Warning   | Dangerous buttons and error states                                |

### Contrast

Color contrast between text and its background must meet [required WCAG standards](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

The contrast requirements are:

- 4.5:1 for normal text
- 3:1 for large text (>24px)
- 3:1 for UI elements and graphics
- No contrast requirement for decorative and disabled elements

Use an [online contrast checker](https://webaim.org/resources/contrastchecker/) or a [Figma plugin](/guides/accessibility/tools#contrast-plugin) to test your contrast.

## Development

Colors are available in the form of CSS variables and can be used in web applications. Check out the references below for more information.
...
