import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import "jsdom-worker";
// prettier-ignore
import { IntersectionObserverMock, ResizeObserverMock } from "@duskit/test-helpers";

expect.extend(matchers);

// @ts-ignore
global.IntersectionObserver = IntersectionObserverMock;
global.ResizeObserver = ResizeObserverMock;
