---
title: Layouts
group: "foundations"
icon: "mi:layout"
---

# Layouts

## Overview

...

## Responsive foundations

Duskit provides two levels of abstraction for handling responsive designs:

- **Viewport ranges**, for defining the layout and navigation affordance of a page at a high level.
- **Breakpoints**, for fine-tuning custom experiences.

### Viewport ranges

...
Viewport range | Width range | Columns | Description
---------------|---------------|----------|------------
`narrow` | < 768px | 1 | Supports a single-column layout. Also known as “mobile”.
`regular` | >= 768px | Up to 2 | All desktop-friendly patterns start at this range.
`wide` | >= 1400px | Up to 3 | Optional range when a 3rd layout column is needed.

### Breakpoints

Breakpoints enable designers to fine-tune their responsive experiences, adjusting any specific responsive scenarios that are not addressed by viewport ranges.

Breakpoint sizes should be simply seen as a unit in a ruler. The numbers are not opinionated into how they should be used when applied to a media query. That is, they don't refer to ranges that go upwards or downwards.

| Breakpoint | Size   |
| ---------- | ------ |
| `xsmall`   | 320px  |
| `small`    | 544px  |
| `medium`   | 768px  |
| `large`    | 1012px |
| `xlarge`   | 1280px |
| `xxlarge`  | 1400px |

## Anatomy of a page

### App Header

App header is Dusk’s topmost bar. This header contains global navigation and actions, but also contextual navigation elements.

App header is never fixed to the top of the viewport. It scrolls with the rest of the page.

...

### App Footer

App footer contains useful links and legal information about GitHub. It remains “after the fold” in smaller pages to keep the focus on the main content.

The App footer should be present in all core pages. Experiences that require rich interactions, such as when manipulating large amounts of data, may opt-out of the App footer.

...
