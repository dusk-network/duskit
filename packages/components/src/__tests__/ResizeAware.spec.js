import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import { tick } from "svelte";

import observeResize from "../__shared__/observeResize";

import ResizeAwareWrapper from "./test-components/ResizeAwareWrapper.svelte";

import { ResizeAware } from "../..";

vi.mock("../__shared__/observeResize", () => {
  return {
    default: vi.fn(),
  };
});

describe("ResizeAware", () => {
  /** @type {import("../__shared__/observeResize").ObserveResizeCallback} */
  let currentResizeCallback;

  const unobserveMock = vi.fn();

  vi.mocked(observeResize).mockImplementation((element, callback) => {
    currentResizeCallback = callback;

    return unobserveMock;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should render the root div element with 100% inline dimensions", () => {
    const { component } = render(ResizeAware);
    const root = component.getRootElement();

    expect(root.tagName.toLowerCase()).toBe("div");
    expect(root.style.height).toBe("100%");
    expect(root.style.width).toBe("100%");
  });

  it("should observe the root element upon mounting", () => {
    const { component } = render(ResizeAware);
    const root = component.getRootElement();

    expect(observeResize).toHaveBeenCalledTimes(1);
    expect(observeResize).toHaveBeenCalledWith(root, expect.any(Function));
  });

  it("should propagate rect, height, and width to the slot when resized", async () => {
    const { getByTestId } = render(ResizeAwareWrapper);

    // Initial state derived from empty DOMRect
    expect(getByTestId("height").textContent).toBe("0");
    expect(getByTestId("width").textContent).toBe("0");

    // @ts-expect-error We only provide the partial contentRect payload
    currentResizeCallback({ contentRect: { height: 150, width: 300, x: 10 } });

    // Wait for Svelte reactivity to propagate the slot variables
    await tick();

    expect(getByTestId("height").textContent).toBe("150");
    expect(getByTestId("width").textContent).toBe("300");
    expect(getByTestId("rect-x").textContent).toBe("10");
  });

  it("should correctly unobserve the element when unmounted", () => {
    const { unmount } = render(ResizeAware);

    expect(unobserveMock).not.toHaveBeenCalled();

    unmount();

    expect(unobserveMock).toHaveBeenCalledTimes(1);
  });
});
