import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import { ResizeObserver } from "@juggle/resize-observer";
import "vitest-canvas-mock";

import { IntersectionObserverMock } from "@duskit/test-helpers";

// Add custom Jest matchers
expect.extend(matchers);

// Adding missing bits in JSDOM

global.IntersectionObserver = IntersectionObserverMock;
global.ResizeObserver = ResizeObserver;

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
