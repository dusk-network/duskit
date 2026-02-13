---
"@duskit/components": patch
"@duskit/svelte-stores": patch
"@duskit/test-helpers": minor
---

Improve Svelte 5 compatibility and CI stability after dependency upgrades.

For `@duskit/components`, this tightens QR code error handling, aligns tests with current runtime behavior, and updates test coverage globs to avoid non-source files being included.

For `@duskit/svelte-stores`, this publishes the peer dependency compatibility updates introduced in this upgrade cycle.

For `@duskit/test-helpers`, `IntersectionObserverMock` now uses an event-driven trigger model (`trigger`/`reset`) instead of relying on mutable shared instance lists.
