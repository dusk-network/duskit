import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import { tick } from "svelte";

import observeResize from "../__shared__/observeResize";

import { MiddleEllipsis } from "../..";

vi.mock("../__shared__/observeResize", () => {
  return {
    default: vi.fn(),
  };
});

describe("MiddleEllipsis", () => {
  /** @type {import("../__shared__/observers").ObserveResizeCallback} */
  let currentResizeCallback;

  const unobserveMock = vi.fn();

  vi.mocked(observeResize).mockImplementation((element, callback) => {
    currentResizeCallback = callback;
    return unobserveMock;
  });

  // we return a fixed predictable width as 10px per char
  const measureTextMock = vi.fn((text) => ({ width: text.length * 10 }));

  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    font: "",
    letterSpacing: "",

    // @ts-expect-error
    measureText: measureTextMock,
  });

  /** @param {number} width */
  const triggerResize = (width) => {
    // @ts-expect-error We just need the `contentRect`
    currentResizeCallback({ contentRect: DOMRect.fromRect({ width }) });
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should render the full text when there is enough space", async () => {
    const { container } = render(MiddleEllipsis, { text: "Short text" });

    // Triggers initial calculation
    triggerResize(200);

    await tick();

    expect(container.firstElementChild?.textContent).toBe("Short text");
    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should render the correct element specified by the `as` prop", () => {
    const { container } = render(MiddleEllipsis, {
      as: "p",
      text: "Short text",
    });

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = { className: "foo bar", id: "some-id", text: "some text" };
    const { component } = render(MiddleEllipsis, props);
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-middle-ellipsis", "foo", "bar");
    expect(element).toHaveAttribute("id", "some-id");
  });

  describe("Developer Warnings", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    afterAll(() => {
      errorSpy.mockRestore();
      warnSpy.mockRestore();
    });

    it("should log an error if the element's display is `inline`", () => {
      // @ts-expect-error
      vi.spyOn(window, "getComputedStyle").mockReturnValue({
        display: "inline",
      });

      render(MiddleEllipsis, { as: "span", text: "Text" });

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining("display: inline")
      );
    });

    it("should log a console.warn if the element's display is `inline-block`", () => {
      // @ts-expect-error
      vi.spyOn(window, "getComputedStyle").mockReturnValue({
        display: "inline-block",
      });

      render(MiddleEllipsis, { as: "span", text: "Text" });

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("display: inline-block")
      );
    });

    it("should NOT log any warnings if the element's display is `block`", () => {
      // @ts-expect-error
      vi.spyOn(window, "getComputedStyle").mockReturnValue({
        display: "block",
      });

      render(MiddleEllipsis, { as: "span", text: "Text" });

      expect(errorSpy).not.toHaveBeenCalled();
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  describe("Truncation and resizing", () => {
    it("should defer calculation until the first actual measurement from the observer", async () => {
      const { component } = render(MiddleEllipsis, {
        text: "This is a very, very long string",
      });
      const element = component.getRootElement();

      // The early return blocked the execution: canvas measurement must not have occurred
      expect(measureTextMock).not.toHaveBeenCalled();

      // Since availableWidth is still < 0, the original text is rendered intact
      expect(element.textContent).toBe("This is a very, very long string");

      // Provide the actual dimensions via the observer mock
      triggerResize(150);

      await tick();

      // The calculation is now safely executed
      expect(measureTextMock).toHaveBeenCalled();
      expect(element.textContent).toBe("This is… string");
    });

    it("should truncate text when the container is too small", async () => {
      const { component } = render(MiddleEllipsis, {
        text: "This is a very, very long string",
      });
      const element = component.getRootElement();

      // Trigger calculation for 150 available pixels
      // At 10px per character, it should accommodate exactly 15 characters (including ellipsis)
      triggerResize(150);

      await tick();

      expect(element.textContent).toBe("This is… string");
    });

    it("should update the truncation when the element is resized", async () => {
      const { component } = render(MiddleEllipsis, {
        text: "This is a very, very long string",
      });
      const element = component.getRootElement();

      // Trigger initial calculation
      triggerResize(200);

      await tick();

      expect(element.textContent).toBe("This is a…ong string");

      triggerResize(2000);

      await tick();

      expect(element.textContent).toBe("This is a very, very long string");

      triggerResize(100);

      await tick();

      expect(element.textContent).toBe("This…tring");

      triggerResize(10);

      await tick();

      // not enough available space, only the ellipsis should be visible
      expect(element.textContent).toBe("…");
    });

    it("should fallback gracefully if context.letterSpacing is not supported by the browser", async () => {
      // Override the context mock to simulate an older browser without letterSpacing support
      vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValueOnce({
        font: "",
        // @ts-expect-error
        measureText: (text) => ({ width: text.length * 10 }),
      });

      const { component } = render(MiddleEllipsis, {
        text: "This is a very, very long string",
      });
      const element = component.getRootElement();

      triggerResize(200);

      await tick();

      expect(element.textContent).toBe("This is a…ong string");
    });
  });

  describe("Reactivity", () => {
    it("should react from a text change and apply truncation when necessary", async () => {
      const { component, rerender } = render(MiddleEllipsis, {
        text: "short",
      });
      const element = component.getRootElement();

      // Trigger initial calculation
      triggerResize(200);

      await tick();

      expect(element.textContent).toBe("short");

      await rerender({ text: "this is now a long text to display" });

      await tick();

      expect(element.textContent).toBe("this is n…to display");

      await rerender({ text: "short again" });

      await tick();

      expect(element.textContent).toBe("short again");
    });

    it("should react to other prop changes", async () => {
      const { component, rerender } = render(MiddleEllipsis, { text: "" });

      await rerender({
        as: "li",
        className: "baz",
      });

      const element = component.getRootElement();

      expect(element.nodeName.toLowerCase()).toBe("li");
      expect(element).toHaveClass("baz");
    });
  });
});
