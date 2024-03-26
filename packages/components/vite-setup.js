import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";
import "jsdom-worker";
// prettier-ignore
import { IntersectionObserver, ResizeObserver } from "./src/mocks";

vi.mock("./src/mocks/IntersectionObserver");

global.IntersectionObserver = IntersectionObserver;
global.ResizeObserver = ResizeObserver;

expect.extend(matchers);
