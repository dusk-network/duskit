import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";
import "jsdom-worker";
// prettier-ignore
import { mockIntersectionObserver, mockResizeObserver } from "@duskit/test-helpers";

expect.extend(matchers);

vi.stubGlobal("IntersectionObserver", mockIntersectionObserver);
vi.stubGlobal("ResizeObserver", mockResizeObserver);
