---
"@duskit/components": minor
---

refactor(components)!: **BREAKING CHANGE** update all components to use the new design tokens

- **BREAKING CHANGE** removed `"default"` value from `GapSize` type
- **BREAKING CHANGE** removed props `gap` and `showBody` from `Card`. Added `variant` (`"layer" | "surface"`).
- **BREAKING CHANGE** renamed `IconProp` type to `IconOptions` and removed its `size` property
- **BREAKING CHANGE** removed `dusk-progress-bar--${dir}` class from `ProgressBar` as consumers can rely on logical properties (and, eventually, on the `dir` attribute)
- **BREAKING CHANGE** removed variant prop from `Stepper`
- **BREAKING CHANGE** fixed `Table` using `.duskit-*` instead of `.dusk-*` as a CSS class name prefix.
- fixed `MiddleEllipsis` not accounting for padding, borders and letter spacing
- added "naked" variant for `Button`s
- added a `dusk-icon__bounding-box` CSS class to the bounding box `rect` in `Icon`
- added the option to pass slotted content to `Icon`
