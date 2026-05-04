import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import { mdiAbTesting } from "@mdi/js";

/**
 * @template {"g" | "svg"} T
 * @typedef {import("../icon/Icon").IconProps<T>} IconProps<T>
 */

import IconWithSlot from "./test-components/IconWithSlot.svelte";

import { Icon } from "../..";

describe("Icon", () => {
  const sizes = /** @type {const} */ (["default", "large", "small"]);
  const baseProps = {
    path: "M3,3H21V21H3V3M5,5V19H19V5H5Z",
  };
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  it("should render the Icon component", () => {
    const { container } = render(Icon, baseOptions);

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should accept a custom role for the SVG component", () => {
    const props = {
      ...baseProps,
      role: "presentation",
    };
    const { component } = render(Icon, { ...baseOptions, props });

    expect(component.getRootElement()).toHaveRole(props.role);
  });

  it('should render the icon inside a `g` element when the `as` prop is "g"', () => {
    /** @type {IconProps<"g">} */
    const props = {
      ...baseProps,
      as: "g",
    };
    const { component } = render(Icon, { ...baseOptions, props });
    const rootElement = component.getRootElement();

    expect(rootElement).toMatchSnapshot();
    expect(rootElement.nodeName.toLowerCase()).toBe("g");
  });

  it.each(sizes)('should render the `Icon` of the "%s" size', (size) => {
    const props = { ...baseProps, size };
    const { component } = render(Icon, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-icon", `dusk-icon--size--${size}`);
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      "data-baz": "baz",
    };
    const { component } = render(Icon, { ...baseOptions, props });
    const icon = component.getRootElement();

    expect(icon.nodeName.toLowerCase()).toBe("svg");
    expect(icon).toHaveClass("foo bar");
    expect(icon).toHaveAttribute("data-baz", "baz");
    expect(icon.querySelector("path")).toHaveAttribute("d", baseProps.path);
  });

  it('should be able to render slotted content when the `as` prop is `"svg"`', () => {
    const { component, getByTestId } = render(IconWithSlot, baseOptions);
    const iconElement = component.getRootElement();
    const slottedCircle = getByTestId("slotted-circle");

    expect(iconElement.nodeName.toLowerCase()).toBe("svg");
    expect(iconElement).toContainElement(slottedCircle);
  });

  it('should be able to render slotted content when the `as` prop is `"g"`', () => {
    const props = {
      ...baseProps,
      as: "g",
    };
    const { component, getByTestId } = render(IconWithSlot, {
      ...baseOptions,
      props,
    });
    const iconElement = component.getRootElement();
    const slottedCircle = getByTestId("slotted-circle");

    expect(iconElement.nodeName.toLowerCase()).toBe("g");
    expect(iconElement).toContainElement(slottedCircle);
  });

  it("should react to prop changes", async () => {
    const { component, rerender } = render(Icon, baseOptions);

    let icon = component.getRootElement();

    expect(icon).toHaveRole("graphics-symbol");

    await rerender({ role: "img" });

    expect(component.getRootElement()).toHaveAttribute("role", "img");

    await rerender({
      as: "g",
      className: "baz",
      path: mdiAbTesting,
      role: "img",
      size: "small",
    });

    icon = component.getRootElement();

    expect(icon.nodeName.toLowerCase()).toBe("g");
    expect(icon).toHaveClass("dusk-icon--size--small", "baz");
    expect(icon).not.toHaveAttribute("role");
    expect(icon.querySelector("path")).toHaveAttribute("d", mdiAbTesting);
  });
});
