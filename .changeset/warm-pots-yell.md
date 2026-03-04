---
"@duskit/components": minor
"@duskit/css": minor
---

refactor(components)!: **BREAKING CHANGE** - standardize class name modifier syntax across components

`Badge`:

- added `info` variant to match the usual `StatusType` values (in addition to `neutral`)
- fixed missing double dash as modifier value separator for variants in CSS classes

`Banner`:

- removed type `BannerVariant` as it was a duplicate of `StatusType`
- removed `--banner-<status>-color` CSS variables in favor of standard status colors variables
- added `variant` modifier name in CSS classes
- removed `banner__icon--<variant>` CSS classes
- fixed icons not getting the desired status color

`Button`:

- renamed the `active` prop to `pressed` to comply with WAI-ARIA 'Toggle Button' patterns (`aria-pressed`).
  This terminology also distinguishes a persistent toggled state from the temporary CSS `:active` state.
- renamed the CSS class `dusk-button--active` to `dusk-button--pressed`

`Card`:

- fixed missing double dash as modifier value separator for gaps in CSS classes

`ErrorAlert`:

- fixed gaps in CSS classes to follow BEM conventions

`ProgressBar`:

- added a `size` prop and the related CSS class `dusk-progress-bar--size--${size}`

`Suspense`:

- fixed gaps in CSS classes to follow BEM conventions

`Switch`:

- added CSS class names for `active` and `disabled` statuses
- updated styles to use the new BEM class names instead of attribute selectors
- renamed the `active` prop to `checked` to better align with native HTML checkbox standards and the `aria-checked` attribute

`Tabs`:

- renamed CSS class `dusk-tab-item__selected` to `dusk-tab-item--selected` to follow BEM conventions
- removed `hidden` attribute for scroll buttons in favor of `dusk-tab-scroll-button--hidden` CSS class name

`Toast`:

- added CSS class `dusk-toast__item--type--${type}` to the list item
- removed CSS class `dusk-toast__item-icon-wrapper--${type}` from the icon wrapper

`Tooltip`:

- removed CSS class `dusk-tooltip-${place}` in favor of `dusk-tooltip--place--${place}`
- removed CSS class `dusk-tooltip-${type}` in favor of `dusk-tooltip--type--${type}`
