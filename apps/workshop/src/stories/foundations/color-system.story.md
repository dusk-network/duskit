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

DUSKit delivers colors in the form of design tokens. Design tokens are a layer of abstraction that allows for better maintainability, consistency and theming. Within DUSKit, design tokens are represented as CSS variables for code and Figma variables for design. For a full reference table of all available design tokens, see the color [CSS variables page](./figma.story.md).

As an example of how color tokens work, when `bgColor-default` is referenced for a background color, the value of that token will automatically change depending on the color mode.

![light vs dark mode](https://private-user-images.githubusercontent.com/1636833/323608214-faf1c6a8-fb83-4bb7-85d0-457dc85e3f43.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTM3ODY2MTcsIm5iZiI6MTcxMzc4NjMxNywicGF0aCI6Ii8xNjM2ODMzLzMyMzYwODIxNC1mYWYxYzZhOC1mYjgzLTRiYjctODVkMC00NTdkYzg1ZTNmNDMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDQyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDA0MjJUMTE0NTE3WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MGZlN2JiY2FhNzQ2ZWYwZDEwY2E1MzAyOTIwMDJhMGFiMjdlN2RkYWNlYjVkM2JiYTNlNzZiMzg5MWU5NGYxMiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.CEEWkS4E5XzYBtZXUJB0CkNtvt-LRArXQrpDxHYNfsY)

## Design token categories

DUSKit design tokens are categorized into three groups:

- **Base**
- **Functional**

To read more about the naming convention, see the design token naming guidelines (to be added) page.

![Base & Functional](https://private-user-images.githubusercontent.com/1636833/324497754-5ae97f24-bfd7-44c8-9fbc-fc65f5e60c4d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTM3OTYzMjMsIm5iZiI6MTcxMzc5NjAyMywicGF0aCI6Ii8xNjM2ODMzLzMyNDQ5Nzc1NC01YWU5N2YyNC1iZmQ3LTQ0YzgtOWZiYy1mYzY1ZjVlNjBjNGQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDQyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDA0MjJUMTQyNzAzWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ZTZjOGJhMzkyYmNiMWZhNWIyODQ5ODNhY2UwZTcxNmUxMTQ5NmRkNDA1NWMzMmVlZDA0NmYzNDQ0ZTE3MjAyNyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.ycdPBVRUg9sJCaupWDARWuuUAMIhmDdmV1epzVy8mko)

**Base** color tokens are the lowest level tokens and map directly to a raw value. They are only to be used as a reference for functional and component/pattern tokens. Base color tokens don't respect color modes and should never be used directly in code or design

Example: `Color-Brand-Cornflower-5`

**Functional** color tokens represent global UI patterns such as text, borders, shadows, and backgrounds. These are the most commonly used design tokens throughout all of Primer and GitHub UI. Functional color tokens reference base color tokens under the hood, and respect color modes.

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

## Accessibility

...

## Guidelines

...

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
