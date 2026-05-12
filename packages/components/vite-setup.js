import "@testing-library/jest-dom/vitest";
import { ResizeObserver } from "@juggle/resize-observer";
import "vitest-canvas-mock";

import { IntersectionObserverMock } from "@duskit/test-helpers";

// do not add things to JSDOM if we're in node environment for a test
// (used for SSR tests)
if (typeof window !== "undefined") {
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

  if (!Element.prototype.animate) {
    // @ts-expect-error we don't need to mimick the whole `Animation` type
    Element.prototype.animate = () => ({
      cancel: () => {},

      /** @param {any} callback */
      set onfinish(callback) {
        if (typeof callback === "function") {
          callback();
        }
      },
      play: () => {},
    });
  }

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
}
