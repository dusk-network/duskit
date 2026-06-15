# @duskit/components

## 3.0.0

### Major Changes

- [#334](https://github.com/dusk-network/duskit/pull/334) [`ce7c9d3`](https://github.com/dusk-network/duskit/commit/ce7c9d334bf1a69c095a78422419b5f70774c7a6) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactor(css / components)!: stabilize token contracts, layout mechanics and component anatomy
  - updated styles of `Banner` and `Icon` to use the new icon size contracts
  - updated `Drawer` and `NotificationFeed` to use the new layout boundary contracts
  - added `Heading` component
  - tweaked paddings of interactive components
  - buttons in the "naked" variant now have a default padding
  - added a more distinct style to toggle buttons while pressed
  - gave a fixed line height of `1.5` to `Agreement`, `Button`, `ContentSwitch`, `ExclusiveChoice`, `Select`, `Tabs` and `Textbox` instead of inheriting it
  - icon buttons are now guaranteed to be square
  - updated `ContentSwitch` to use standard padding and font size
  - added missing `min-block-size` in `ContentSwitch` and `Tabs` interactive elements
  - updated `Tabs` to used the "naked" variant for scroll buttons
  - stabilized header height in `Notification` by deriving minimum block size from interactive density tokens
  - added a defensive layout rule to ensure card structural slots always stretch to the full available width, preventing parent flex alignment from affecting the component layout
  - added `flex: 1` to `Banner`'s content wrapper to ensure it spans the full remaining width next to the icon
  - prevented layout blowout in `Banner` and text overflow when handling long unbreakable strings

### Patch Changes

- Updated dependencies [[`ce7c9d3`](https://github.com/dusk-network/duskit/commit/ce7c9d334bf1a69c095a78422419b5f70774c7a6)]:
  - @duskit/css@1.0.0

## 2.0.0

### Patch Changes

- [#331](https://github.com/dusk-network/duskit/pull/331) [`6e2f280`](https://github.com/dusk-network/duskit/commit/6e2f280a7e92fe7cf1648b1243873200e9562121) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): fixed `Notification` and `Tabs` accessing `Button` internals in their CSS

- [#333](https://github.com/dusk-network/duskit/pull/333) [`06863a3`](https://github.com/dusk-network/duskit/commit/06863a35d066e6bc3c086c39b364c3b5e64419df) Thanks [@ascartabelli](https://github.com/ascartabelli)! - chore: update dependencies

- [#329](https://github.com/dusk-network/duskit/pull/329) [`d774107`](https://github.com/dusk-network/duskit/commit/d7741073e51d1f84e2eda748dd09499c24d3b766) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): fixed `Drawer`, `Select` and `Table` using some layer 1 tokens

- Updated dependencies [[`6e2f280`](https://github.com/dusk-network/duskit/commit/6e2f280a7e92fe7cf1648b1243873200e9562121), [`d774107`](https://github.com/dusk-network/duskit/commit/d7741073e51d1f84e2eda748dd09499c24d3b766), [`2115865`](https://github.com/dusk-network/duskit/commit/21158658564ac28b40bcf77854b3e59ef82e230f), [`4272efa`](https://github.com/dusk-network/duskit/commit/4272efa2fd1db42e8f7e3821bdd34a799ff1cbaa), [`06863a3`](https://github.com/dusk-network/duskit/commit/06863a35d066e6bc3c086c39b364c3b5e64419df)]:
  - @duskit/css@0.4.0
  - @duskit/svelte-actions@0.2.2
  - @duskit/string@0.0.3
  - @duskit/error@0.0.4
  - @duskit/date@0.1.2
  - @duskit/math@0.0.3

## 1.0.0

### Minor Changes

- [#312](https://github.com/dusk-network/duskit/pull/312) [`0055357`](https://github.com/dusk-network/duskit/commit/00553577f3c21320d912d62fa98df59986a264e8) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactor(components)!: **BREAKING CHANGE** update all components to use the new design tokens
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

- [#315](https://github.com/dusk-network/duskit/pull/315) [`181ad7a`](https://github.com/dusk-network/duskit/commit/181ad7a384d92d240426ae284333fc497a92099e) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components)!: **BREAKING CHANGE** implement complete notification and toast ecosystem and replace legacy toast

  Key additions:
  - Core logic: Event-driven emitter and a store factory to handle state, deduplication, and atomic namespace transitions.
  - Context management: A provider component to manage the application context and synchronize persistent storage.
  - Base UI: The core Notification component supporting both inline panels and floating toasts with distinct status types.
  - Toast controller: A dedicated container managing the lifecycle of floating notifications, utilizing a highly optimized requestAnimationFrame loop with visibility change detection to handle decay animations and automatic dismissal gracefully.
  - Notification Feed & Panel: A list view to display, read, and dismiss panel notifications, alongside a Drawer-based wrapper (NotificationPanel) with ARIA live region announcements for unread counts, providing a complete sliding sidebar experience.
  - Counter Icon: A reactive icon component featuring a custom bounce animation, ideal for displaying unread notification badges.

  **BREAKING CHANGE**: The legacy toast system has been completely removed and replaced by the new notification ecosystem.

### Patch Changes

- [#312](https://github.com/dusk-network/duskit/pull/312) [`7747e96`](https://github.com/dusk-network/duskit/commit/7747e96a8805573cf08ed450cd97908730fe959e) Thanks [@ascartabelli](https://github.com/ascartabelli)! - chore(license): relicense to MIT

- Updated dependencies [[`0055357`](https://github.com/dusk-network/duskit/commit/00553577f3c21320d912d62fa98df59986a264e8), [`7747e96`](https://github.com/dusk-network/duskit/commit/7747e96a8805573cf08ed450cd97908730fe959e), [`effbc9b`](https://github.com/dusk-network/duskit/commit/effbc9b87a0bb39aed406019a9224328c4c183e7)]:
  - @duskit/css@0.3.0
  - @duskit/svelte-actions@0.2.1
  - @duskit/string@0.0.2
  - @duskit/error@0.0.3
  - @duskit/date@0.1.1
  - @duskit/math@0.0.2

## 0.7.1

### Patch Changes

- [#304](https://github.com/dusk-network/duskit/pull/304) [`b07a638`](https://github.com/dusk-network/duskit/commit/b07a6389b6e403b13b6ec7e2f4fd53c307032ef5) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactored `Drawer` internal architecture to use the new `outsideClick` API

- [#300](https://github.com/dusk-network/duskit/pull/300) [`bf87775`](https://github.com/dusk-network/duskit/commit/bf87775f36ca0f8dac961b745535e155d898397d) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): resolve stale text race condition on mobile tap on `Tooltip`s

- Updated dependencies [[`b07a638`](https://github.com/dusk-network/duskit/commit/b07a6389b6e403b13b6ec7e2f4fd53c307032ef5)]:
  - @duskit/svelte-actions@0.2.0

## 0.7.0

### Minor Changes

- [#294](https://github.com/dusk-network/duskit/pull/294) [`b8fb4d1`](https://github.com/dusk-network/duskit/commit/b8fb4d19f38b7dd0a18d96f6f737d945dcfa12da) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): enrich `Drawer`'s `cancel` event with native payloads and cancelability

### Patch Changes

- Updated dependencies [[`a9e846c`](https://github.com/dusk-network/duskit/commit/a9e846cf58e3816fa0b1c3ade572c44cd9dad223), [`e548670`](https://github.com/dusk-network/duskit/commit/e548670e9e4a0fbc6665a43b1c1636f18e174d12)]:
  - @duskit/svelte-actions@0.1.0

## 0.6.0

### Minor Changes

- [#287](https://github.com/dusk-network/duskit/pull/287) [`1df897c`](https://github.com/dusk-network/duskit/commit/1df897c082ef3e10b2a30d1889bcab0ddfb3c9ae) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): add `Escape` key support in `Drawer` to emit a `cancel` event

## 0.5.0

### Minor Changes

- [#275](https://github.com/dusk-network/duskit/pull/275) [`fe3ede7`](https://github.com/dusk-network/duskit/commit/fe3ede74c676af5974550ba158fb29e7799cb1e7) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactor(components)!: **BREAKING CHANGE** replace `isInStack` with `as` prop in `Icon` component

- [#269](https://github.com/dusk-network/duskit/pull/269) [`8d07f99`](https://github.com/dusk-network/duskit/commit/8d07f99e77abc43818a196a3a2d0062cf645100d) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): expose `outclick` event on `Drawer` via `@duskit/svelte-actions`

### Patch Changes

- [#265](https://github.com/dusk-network/duskit/pull/265) [`bd41f0d`](https://github.com/dusk-network/duskit/commit/bd41f0d96d6aaaa69b1565cc47bca6ebfed8d0bd) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fixed wrong import of `OmitSvelteSpecificProps` utility type in `Table.d.ts`

- [#283](https://github.com/dusk-network/duskit/pull/283) [`1e5fd97`](https://github.com/dusk-network/duskit/commit/1e5fd97009c49216e01805fe1f1e64faa3a1932e) Thanks [@ascartabelli](https://github.com/ascartabelli)! - chore(components): remove obsolete `::-ms-expand` pseudo-element in `Select`'s CSS

- [#284](https://github.com/dusk-network/duskit/pull/284) [`dcb4fcf`](https://github.com/dusk-network/duskit/commit/dcb4fcf00a27fc1cf401030ba3c742c6980fb2bb) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactor(components): standardize HTML attribute inheritance and internal overrides

- [#277](https://github.com/dusk-network/duskit/pull/277) [`6cb3ada`](https://github.com/dusk-network/duskit/commit/6cb3ada1cfab944bfd5e1a957fff579edf862565) Thanks [@ascartabelli](https://github.com/ascartabelli)! - perf(components): optimize type checking inside `Options`' iteration block

- [#255](https://github.com/dusk-network/duskit/pull/255) [`196d592`](https://github.com/dusk-network/duskit/commit/196d5926ce752652df6ac8aee6d8433c7d07fe24) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): fixed `CopyField` not disabling the tooltip when disabled
  - Added CSS class `dusk-copy-field--disabled` to `CopyField` when disabled

- [#279](https://github.com/dusk-network/duskit/pull/279) [`23bdb1c`](https://github.com/dusk-network/duskit/commit/23bdb1cd32e1b1352d1806c311b6aba4f18e3a28) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): improve visual clarity of `Checkbox`'s checked state

- Updated dependencies [[`f050a03`](https://github.com/dusk-network/duskit/commit/f050a03e06115052843101adf6108a48187c1450)]:
  - @duskit/svelte-actions@0.0.1

## 0.4.0

### Minor Changes

- [#245](https://github.com/dusk-network/duskit/pull/245) [`59e9ec9`](https://github.com/dusk-network/duskit/commit/59e9ec9869afeac6223dc1b4e7ed1090687f4670) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): Add `Drawer` component

- [#241](https://github.com/dusk-network/duskit/pull/241) [`f582492`](https://github.com/dusk-network/duskit/commit/f5824925c682af337ed145962efabb7414d53da0) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): Add `Tooltip` support for dynamic content updates via data attributes

- [#249](https://github.com/dusk-network/duskit/pull/249) [`a2a9c8c`](https://github.com/dusk-network/duskit/commit/a2a9c8c9c6c19ca1e4744789ed17066ed9dc142c) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactor(components)!: **BREAKING CHANGE** - remove `onSurface` prop from all components

- [#253](https://github.com/dusk-network/duskit/pull/253) [`de33c31`](https://github.com/dusk-network/duskit/commit/de33c3166fe8cdcb9468bec82f635b9c3e72a79d) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): add the `ContentSwitch` component

- [#236](https://github.com/dusk-network/duskit/pull/236) [`1d1b673`](https://github.com/dusk-network/duskit/commit/1d1b6730c10de0a85853c04b59aefbc364173f1a) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): add ARIA attributes for enhanced accessibility in `ProgressBar`

- [#239](https://github.com/dusk-network/duskit/pull/239) [`eb57e4d`](https://github.com/dusk-network/duskit/commit/eb57e4d65c942bfbedc4821b8c83dd5c08ee8531) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): support custom easing and reactive motion parameters in `ProgressBar`

- [#240](https://github.com/dusk-network/duskit/pull/240) [`88282e5`](https://github.com/dusk-network/duskit/commit/88282e50088124dcf3ba5a01be4da6f4622657d5) Thanks [@ascartabelli](https://github.com/ascartabelli)! - feat(components): add direction property for filler anchoring in `ProgressBar`

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

- [#248](https://github.com/dusk-network/duskit/pull/248) [`66a960d`](https://github.com/dusk-network/duskit/commit/66a960d2d65f0c3cb5a69a24e63198745fda1c83) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactor(components)!: **BREAKING CHANGE** - rename `currentPercentage` to `value` in `ProgressBar`

### Patch Changes

- [#243](https://github.com/dusk-network/duskit/pull/243) [`5a15a70`](https://github.com/dusk-network/duskit/commit/5a15a70d9d2b6eb5dee1d2d5954fbdbd4a3a2433) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): correct ARIA attribute name from `aria-described-by` to `aria-describedby` in `Tooltip`

- [#234](https://github.com/dusk-network/duskit/pull/234) [`1d210ca`](https://github.com/dusk-network/duskit/commit/1d210caa09fa5ed37d81e51b8bbc3d5bf848413b) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): handle motion store reset for indeterminate state in `ProgressBar`

- [#212](https://github.com/dusk-network/duskit/pull/212) [`e5443b4`](https://github.com/dusk-network/duskit/commit/e5443b4070ee6dabf569c2cbbe21d10e9bab5cc8) Thanks [@HDauven](https://github.com/HDauven)! - Improve Svelte 5 compatibility and CI stability after dependency upgrades.

  For `@duskit/components`, this tightens QR code error handling, aligns tests with current runtime behavior, and updates test coverage globs to avoid non-source files being included.

  For `@duskit/svelte-stores`, this publishes the peer dependency compatibility updates introduced in this upgrade cycle.

  For `@duskit/test-helpers`, `IntersectionObserverMock` now uses an event-driven trigger model (`trigger`/`reset`) instead of relying on mutable shared instance lists.

- [#228](https://github.com/dusk-network/duskit/pull/228) [`398837c`](https://github.com/dusk-network/duskit/commit/398837c7535294c6d6607dfa5df6f627fa8f1e5d) Thanks [@ascartabelli](https://github.com/ascartabelli)! - perf(components): optimize rerender interval in `RelativeTime` using relative time factor

- [#230](https://github.com/dusk-network/duskit/pull/230) [`48e40b7`](https://github.com/dusk-network/duskit/commit/48e40b7d210449eb6786941811b93fe662edf59c) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): prevent overlapping timers and memory leaks on prop updates in `Rerender`

- [#235](https://github.com/dusk-network/duskit/pull/235) [`50728f0`](https://github.com/dusk-network/duskit/commit/50728f0c4054eba295266ef417bce71ad55589d8) Thanks [@ascartabelli](https://github.com/ascartabelli)! - fix(components): clamp percentage value in `ProgressBar`

- Updated dependencies [[`337292d`](https://github.com/dusk-network/duskit/commit/337292dc0c591fb16424de622355f304ba774c8f), [`94c421f`](https://github.com/dusk-network/duskit/commit/94c421f21697345013593d2fa8d847f850ac3f64)]:
  - @duskit/date@0.1.0

## 0.3.0

### Minor Changes

- [#201](https://github.com/dusk-network/duskit/pull/201) [`ee98d47`](https://github.com/dusk-network/duskit/commit/ee98d4704ca112e2d12153d2b5b4d50b24735a57) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Add an optional `hidden` boolean attribute in `Table`'s descriptors

### Patch Changes

- [#197](https://github.com/dusk-network/duskit/pull/197) [`9ca3805`](https://github.com/dusk-network/duskit/commit/9ca3805d32edf0b8ab2ba2fbf5994f4470c43f73) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Make the `sortable` field optional in `Table`'s descriptors

## 0.2.0

### Minor Changes

- [#193](https://github.com/dusk-network/duskit/pull/193) [`9c1cf4a`](https://github.com/dusk-network/duskit/commit/9c1cf4ad1a16110f05de8b7623e2304343a080f7) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Change `svelte` to a peer dependency in packages using it

## 0.1.0

### Minor Changes

- [#157](https://github.com/dusk-network/duskit/pull/157) [`aca59ce`](https://github.com/dusk-network/duskit/commit/aca59ce24ca68dd23a8d9ce7b6f27b1371fde33b) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Renamed the `Switch`'s `value` property to `active`

- [#172](https://github.com/dusk-network/duskit/pull/172) [`f05e0df`](https://github.com/dusk-network/duskit/commit/f05e0df943435b98c61e86ad9b7bcbb5b0cdac91) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Add the `Table` component

### Patch Changes

- [#155](https://github.com/dusk-network/duskit/pull/155) [`a2f36d9`](https://github.com/dusk-network/duskit/commit/a2f36d92b90806735be0e532c0617386cf109e63) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Fixed `MiddleEllipsis`' types not importing the `OmitSvelteSpecificProps` utility

- [#159](https://github.com/dusk-network/duskit/pull/159) [`020f5b9`](https://github.com/dusk-network/duskit/commit/020f5b9b791f755edcc14c7922673faff00c72bc) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Fixed missing export of the `toast` function in `@duskit/components`

- [#158](https://github.com/dusk-network/duskit/pull/158) [`6b6a412`](https://github.com/dusk-network/duskit/commit/6b6a4123454dab8419ad474067b19dcc1fa0778a) Thanks [@ascartabelli](https://github.com/ascartabelli)! - `@duskit/components` now exports utility types

- [#164](https://github.com/dusk-network/duskit/pull/164) [`a870b48`](https://github.com/dusk-network/duskit/commit/a870b48bf43b85c199ab36446352be3f3abc90d3) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Add instructions on how to setup tests in `@duskit/components` README

- [#169](https://github.com/dusk-network/duskit/pull/169) [`9d0ce08`](https://github.com/dusk-network/duskit/commit/9d0ce084ceb8cac9d5b432425b311d4c5cfff1c9) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Improve `Button` style for state specific variants and child elements

- [#156](https://github.com/dusk-network/duskit/pull/156) [`172c9a7`](https://github.com/dusk-network/duskit/commit/172c9a78a3012c950263931d515345da8da6296e) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Fixed `Switch` calling `preventDefault` on every keyboard input

- Updated dependencies [[`91c7505`](https://github.com/dusk-network/duskit/commit/91c75056ab0f15d7e2fe85dff06928c33ba4c9f5)]:
  - @duskit/error@0.0.2

## 0.0.1

### Patch Changes

- [#143](https://github.com/dusk-network/duskit/pull/143) [`624cc71`](https://github.com/dusk-network/duskit/commit/624cc716df63e3595e203232d6208c99115add0e) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Specify which files should be packed in every package

- Updated dependencies [[`624cc71`](https://github.com/dusk-network/duskit/commit/624cc716df63e3595e203232d6208c99115add0e)]:
  - @duskit/string@0.0.1
  - @duskit/error@0.0.1
  - @duskit/date@0.0.1
