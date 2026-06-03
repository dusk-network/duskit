# @duskit/svelte-stores

## 0.3.2

### Patch Changes

- [#333](https://github.com/dusk-network/duskit/pull/333) [`06863a3`](https://github.com/dusk-network/duskit/commit/06863a35d066e6bc3c086c39b364c3b5e64419df) Thanks [@ascartabelli](https://github.com/ascartabelli)! - chore: update dependencies

- Updated dependencies [[`06863a3`](https://github.com/dusk-network/duskit/commit/06863a35d066e6bc3c086c39b364c3b5e64419df)]:
  - @duskit/promise@0.0.3
  - @duskit/error@0.0.4

## 0.3.1

### Patch Changes

- [#312](https://github.com/dusk-network/duskit/pull/312) [`7747e96`](https://github.com/dusk-network/duskit/commit/7747e96a8805573cf08ed450cd97908730fe959e) Thanks [@ascartabelli](https://github.com/ascartabelli)! - chore(license): relicense to MIT

- Updated dependencies [[`7747e96`](https://github.com/dusk-network/duskit/commit/7747e96a8805573cf08ed450cd97908730fe959e), [`effbc9b`](https://github.com/dusk-network/duskit/commit/effbc9b87a0bb39aed406019a9224328c4c183e7)]:
  - @duskit/promise@0.0.2
  - @duskit/error@0.0.3

## 0.3.0

### Minor Changes

- [#307](https://github.com/dusk-network/duskit/pull/307) [`6bc2de3`](https://github.com/dusk-network/duskit/commit/6bc2de3f2cf7fc2e9d3f7b3f47e0b8d021fa4ec5) Thanks [@ascartabelli](https://github.com/ascartabelli)! - refactor(svelte-stores): introduce rebind capability for dynamic storage keys in `createPersistedStore`

  docs(svelte-stores): comprehensively update and refine JSDoc comments across API definitions

## 0.2.2

### Patch Changes

- [#212](https://github.com/dusk-network/duskit/pull/212) [`e5443b4`](https://github.com/dusk-network/duskit/commit/e5443b4070ee6dabf569c2cbbe21d10e9bab5cc8) Thanks [@HDauven](https://github.com/HDauven)! - Improve Svelte 5 compatibility and CI stability after dependency upgrades.

  For `@duskit/components`, this tightens QR code error handling, aligns tests with current runtime behavior, and updates test coverage globs to avoid non-source files being included.

  For `@duskit/svelte-stores`, this publishes the peer dependency compatibility updates introduced in this upgrade cycle.

  For `@duskit/test-helpers`, `IntersectionObserverMock` now uses an event-driven trigger model (`trigger`/`reset`) instead of relying on mutable shared instance lists.

## 0.2.1

### Patch Changes

- [#204](https://github.com/dusk-network/duskit/pull/204) [`087f180`](https://github.com/dusk-network/duskit/commit/087f180d014ce43911e4c4d8de48b215a782810d) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Fix: merge initial state with stored data in `createPersistedStore` to support schema updates

## 0.2.0

### Minor Changes

- [#193](https://github.com/dusk-network/duskit/pull/193) [`9c1cf4a`](https://github.com/dusk-network/duskit/commit/9c1cf4ad1a16110f05de8b7623e2304343a080f7) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Change `svelte` to a peer dependency in packages using it

- [#191](https://github.com/dusk-network/duskit/pull/191) [`a8765a9`](https://github.com/dusk-network/duskit/commit/a8765a9938ef18147f979f9cfa0aa950ceaa86a0) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Add the `onStoreChange` helper

## 0.1.1

### Patch Changes

- [#187](https://github.com/dusk-network/duskit/pull/187) [`506c2b3`](https://github.com/dusk-network/duskit/commit/506c2b3b9e64ac9a96b887545ae50d8f05def482) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Fixed `@duskit/promise` not being a dependency in `@duskit/svelte-stores` (was a "dev" one)

## 0.1.0

### Minor Changes

- [#179](https://github.com/dusk-network/duskit/pull/179) [`fe44058`](https://github.com/dusk-network/duskit/commit/fe44058e785b689a321fee4ce7205c29c8ba1d6b) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Add `createPersistedStore` utility in `svelte-stores` package

### Patch Changes

- [#181](https://github.com/dusk-network/duskit/pull/181) [`736447a`](https://github.com/dusk-network/duskit/commit/736447a90316c0a76dba4443f37d44fe61260663) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Make `createPollingDataStore` compatible with SSR

## 0.0.2

### Patch Changes

- Updated dependencies [[`91c7505`](https://github.com/dusk-network/duskit/commit/91c75056ab0f15d7e2fe85dff06928c33ba4c9f5)]:
  - @duskit/error@0.0.2

## 0.0.1

### Patch Changes

- [#143](https://github.com/dusk-network/duskit/pull/143) [`624cc71`](https://github.com/dusk-network/duskit/commit/624cc716df63e3595e203232d6208c99115add0e) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Specify which files should be packed in every package

- Updated dependencies [[`624cc71`](https://github.com/dusk-network/duskit/commit/624cc716df63e3595e203232d6208c99115add0e)]:
  - @duskit/error@0.0.1
