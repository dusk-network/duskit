# @duskit/test-helpers

## 0.2.0

### Minor Changes

- [#212](https://github.com/dusk-network/duskit/pull/212) [`e5443b4`](https://github.com/dusk-network/duskit/commit/e5443b4070ee6dabf569c2cbbe21d10e9bab5cc8) Thanks [@HDauven](https://github.com/HDauven)! - Improve Svelte 5 compatibility and CI stability after dependency upgrades.

  For `@duskit/components`, this tightens QR code error handling, aligns tests with current runtime behavior, and updates test coverage globs to avoid non-source files being included.

  For `@duskit/svelte-stores`, this publishes the peer dependency compatibility updates introduced in this upgrade cycle.

  For `@duskit/test-helpers`, `IntersectionObserverMock` now uses an event-driven trigger model (`trigger`/`reset`) instead of relying on mutable shared instance lists.

## 0.1.0

### Minor Changes

- [#193](https://github.com/dusk-network/duskit/pull/193) [`9c1cf4a`](https://github.com/dusk-network/duskit/commit/9c1cf4ad1a16110f05de8b7623e2304343a080f7) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Change `svelte` to a peer dependency in packages using it

## 0.0.2

### Patch Changes

- [#161](https://github.com/dusk-network/duskit/pull/161) [`46e8739`](https://github.com/dusk-network/duskit/commit/46e8739499f451a7d8caf69b9126e5e0e632ddde) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Fixed `@testing-library/svelte` not being a peer dependency in `@duskit/test-helpers`

## 0.0.1

### Patch Changes

- [#143](https://github.com/dusk-network/duskit/pull/143) [`624cc71`](https://github.com/dusk-network/duskit/commit/624cc716df63e3595e203232d6208c99115add0e) Thanks [@ascartabelli](https://github.com/ascartabelli)! - Specify which files should be packed in every package
