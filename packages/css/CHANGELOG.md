# @duskit/css

## 0.2.0

### Minor Changes

- [#279](https://github.com/dusk-network/duskit/pull/279) [`23bdb1c`](https://github.com/dusk-network/duskit/commit/23bdb1cd32e1b1352d1806c311b6aba4f18e3a28) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): improve visual clarity of `Checkbox`'s checked state

## 0.1.0

### Minor Changes

- [#250](https://github.com/dusk-network/duskit/pull/250) [`cd337a1`](https://github.com/dusk-network/duskit/commit/cd337a10569e775e814129e84b349141827a96c1) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactor(components)!: **BREAKING CHANGE** - standardize class name modifier syntax across components

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

### Patch Changes

- [#249](https://github.com/dusk-network/duskit/pull/249) [`a2a9c8c`](https://github.com/dusk-network/duskit/commit/a2a9c8c9c6c19ca1e4744789ed17066ed9dc142c) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactor(components)!: **BREAKING CHANGE** - remove `onSurface` prop from all components

- [#253](https://github.com/dusk-network/duskit/pull/253) [`de33c31`](https://github.com/dusk-network/duskit/commit/de33c3166fe8cdcb9468bec82f635b9c3e72a79d) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): add the `ContentSwitch` component

## 0.0.1

### Patch Changes

- [#167](https://github.com/dusk-network/duskit/pull/167) [`e812369`](https://github.com/dusk-network/duskit/commit/e8123691f1fc225622bf0fba70857b97d95d52b6) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Update `Button` story to allow changing all props

- [#170](https://github.com/dusk-network/duskit/pull/170) [`d977a84`](https://github.com/dusk-network/duskit/commit/d977a844711df3a244358ca0a23efb253445544b) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Add missing `clean` script in `@duskit/css`
