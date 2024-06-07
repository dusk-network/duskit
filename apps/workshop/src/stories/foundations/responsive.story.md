---
title: Responsive Design
icon: "mdi:monitor-smartphone"
group: "foundations"
---

# Responsive Design

## Definition

[Responsive web design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) is the practice of building a website suitable to work on every device and every screen size, no matter how large or small, mobile or desktop. Responsive web design is an accessibility requirement, focused around providing an intuitive and gratifying experience for everyone.

...

## Viewport size

To guarantee maximum compatibility, pages should adapt to the [browser’s viewport size](https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts), without loss of information or functionality, starting at the following dimensions:

- **Minimum viewport width**: 320px
- **Minimum viewport height**: 256px

To understand how to break down a page to work on smaller viewports, check out [Responsive foundations](/foundations/layout#responsive-foundations) and [Responsive behavior](/foundations/layout#responsive-behavior) sections in the [Layout](/foundations/layout) page.

## Figma Templates

...

## Minimum Target

The AA accessibility standard Dusk aims for requires a minimum target size of `24px`.
However, it is recommended to aim for the AAA standard when possible. For more information on Target Size at the AAA level, refer to the [W3C documentation](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html).

## Hover Support

Browsers report if the primary input mechanism can hover over elements with the `hover` media feature.

Devices that don’t support hovering such as smartphones and tablets may need adapted experiences so that the user can interact with the page without hovering over elements.

Features that rely on hover such as tooltips may not be available on these devices. Make sure the information presented is still accessible through other means, such as a direct link to a page with the information.

## User Preferences

People may set system preferences to change the way they prefer to interact with their devices. By default, Dusk must respect these preferences. Providing a way to override these options through the application UI is also recommended.

On the web, these user preference media features include:

- [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast)
- [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
- [`inverted-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors)

### Browser default font size

Users may set their operating system or browsers to use larger or smaller fonts. Dusk should respect these preferences.

Duskit design tokens are made with `rem` units, which are relative to the browser’s default font size. Use Duskit's design tokens to ensure consistency across the system.
