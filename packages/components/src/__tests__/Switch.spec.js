import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { cleanup, fireEvent, render } from "@testing-library/svelte";

import { Switch } from "../..";

describe("Switch", () => {
  const baseProps = {};

  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  it("should preserve its footprint along either flex axis", () => {
    const { getByRole } = render(Switch, baseOptions);
    const styleElement = document.createElement("style");
    styleElement.textContent = readFileSync("src/switch/Switch.css", "utf8");
    document.head.append(styleElement);

    expect(getComputedStyle(getByRole("switch")).flexShrink).toBe("0");

    styleElement.remove();
  });

  it('should render the "Switch" component with a default tab index of `0`', async () => {
    const { component, rerender } = render(Switch, baseOptions);
    const rootElement = component.getRootElement();

    expect(rootElement).toHaveAttribute("aria-checked", "false");
    expect(rootElement).not.toHaveClass("dusk-switch--checked");
    expect(rootElement).toMatchSnapshot();

    await rerender({ ...baseProps, checked: true });

    expect(rootElement).toHaveAttribute("aria-checked", "true");
    expect(rootElement).toHaveClass("dusk-switch--checked");
    expect(rootElement).toMatchSnapshot();
  });

  it("should use the received tab index", () => {
    const props = {
      ...baseProps,
      tabindex: 5,
    };
    const { container } = render(Switch, { ...baseOptions, props });

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should render the component in a disabled status with a tabindex of `-1`", async () => {
    const props = {
      ...baseProps,
      disabled: true,
      tabindex: 5,
    };
    const { component, rerender } = render(Switch, { ...baseOptions, props });
    const rootElement = component.getRootElement();

    expect(rootElement).toHaveAttribute("aria-checked", "false");
    expect(rootElement).toHaveAttribute("aria-disabled", "true");
    expect(rootElement).toHaveAttribute("tabindex", "-1");
    expect(rootElement).toHaveClass("dusk-switch--disabled");
    expect(rootElement).not.toHaveClass("dusk-switch--checked");
    expect(rootElement).toMatchSnapshot();

    await rerender({ ...props, checked: true });

    expect(rootElement).toHaveAttribute("aria-checked", "true");
    expect(rootElement).toHaveAttribute("aria-disabled", "true");
    expect(rootElement).toHaveAttribute("tabindex", "-1");
    expect(rootElement).toHaveClass("dusk-switch--disabled");
    expect(rootElement).toHaveClass("dusk-switch--checked");
    expect(rootElement).toMatchSnapshot();
  });

  it("should pass additional class names and attributes to the root element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "some-id",
    };
    const { container } = render(Switch, { ...baseOptions, props });

    expect(container.firstElementChild).toMatchSnapshot();
  });

  /**
   * For `event.preventDefault` testing see
   * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent#return_value
   * as `fireEvent.<something>` returns a promise holding the return
   * value of `dispatchEvent`.
   */
  describe("Event handlers", () => {
    it("should dispatch a `change` event when the switch is clicked", async () => {
      const handler = vi.fn();
      const { getByRole } = render(Switch, {
        ...baseOptions,
        events: { change: handler },
      });
      const switchElement = getByRole("switch");

      await fireEvent.click(switchElement);
      await fireEvent.click(switchElement);

      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ detail: true })
      );
      expect(handler).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ detail: false })
      );
    });

    it("should dispatch a `change` event when the user presses space on the switch", async () => {
      const handler = vi.fn();
      const { getByRole } = render(Switch, {
        ...baseOptions,
        events: { change: handler },
      });
      const switchElement = getByRole("switch");

      await expect(
        fireEvent.keyDown(switchElement, { key: " " })
      ).resolves.toBe(false);
      await expect(
        fireEvent.keyDown(switchElement, { key: " " })
      ).resolves.toBe(false);

      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ detail: true })
      );
      expect(handler).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ detail: false })
      );
    });

    it("should not dispatch an event if the user presses another key", async () => {
      const handler = vi.fn();
      const { getByRole } = render(Switch, {
        ...baseOptions,
        events: { change: handler },
      });
      const switchElement = getByRole("switch");

      await expect(
        fireEvent.keyDown(switchElement, { key: "Enter" })
      ).resolves.toBe(true);
      await expect(
        fireEvent.keyDown(switchElement, { key: "a" })
      ).resolves.toBe(true);

      expect(handler).not.toHaveBeenCalled();
    });

    it("should not dispatch an event if the switch is disabled", async () => {
      const props = {
        ...baseProps,
        disabled: true,
      };
      const handler = vi.fn();
      const { getByRole } = render(Switch, {
        ...baseOptions,
        events: { change: handler },
        props,
      });
      const switchElement = getByRole("switch");

      await fireEvent.click(switchElement);
      await expect(
        fireEvent.keyDown(switchElement, { key: " " })
      ).resolves.toBe(true);

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
