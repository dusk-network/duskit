import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

// Vitest v4 types `expect()` off `@vitest/expect` (re-exported by `vitest`),
// so we must augment that module for jest-dom matchers to be visible to TS.
declare module "@vitest/expect" {
  interface Assertion<T = any> extends TestingLibraryMatchers<any, T> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<
    any,
    any
  > {}
}
