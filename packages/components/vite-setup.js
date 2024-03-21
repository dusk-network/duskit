import * as matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import "jsdom-worker";

expect.extend(matchers);
