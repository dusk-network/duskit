import "@testing-library/jest-dom/vitest";
import { ResizeObserver } from "@juggle/resize-observer";
import "vitest-canvas-mock";

import { IntersectionObserverMock } from "@duskit/test-helpers";

// Adding missing bits in JSDOM

// Svelte's motion utilities rely on `matchMedia` for reduced-motion queries.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    addEventListener: () => {},
    // Deprecated, but some libs still call them.
    addListener: () => {},
    dispatchEvent: () => false,
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: () => {},
    removeListener: () => {},
  });
}

global.IntersectionObserver = IntersectionObserverMock;
global.ResizeObserver = ResizeObserver;

// Web Animations API (required by Svelte's built-in animations like `flip`)
// isn't implemented in jsdom.
if (!Element.prototype.getAnimations) {
  Element.prototype.getAnimations = () => [];
}

const elementMethods = /** @type {const} */ ([
  "scrollBy",
  "scrollTo",
  "scrollIntoView",
]);

elementMethods.forEach((method) => {
  if (!Element.prototype[method]) {
    Object.defineProperty(Element.prototype, method, {
      value: () => {},
      writable: true,
    });
  }
});
