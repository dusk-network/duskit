import * as matchers from "@testing-library/jest-dom/matchers";
import { IntersectionObserverMock, ResizeObserverMock } from "@duskit/test-helpers";
import { expect } from "vitest";
import "jsdom-worker";
// prettier-ignore

expect.extend(matchers);

global.IntersectionObserver = IntersectionObserverMock;
global.ResizeObserver = ResizeObserverMock;
