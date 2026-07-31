import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { mdiAbTesting, mdiFolderOutline } from "@mdi/js";
import { skipIn } from "lamb";

import { getAsHTMLElement } from "@duskit/test-helpers";

import { Button } from "../..";

describe("Button", () => {
  const types = /** @type {const} */ (["button", "reset", "submit", "toggle"]);
  const iconPositions = /** @type {const} */ (["after", "before"]);
  const sizes = /** @type {const} */ (["default", "small"]);
  const variants = /** @type {const} */ ([
    "naked",
    "primary",
    "secondary",
    "tertiary",
  ]);

  const baseProps = {
    text: "some text",
  };
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  it('should render the Button component using the type "button" as a default', () => {
    const { container } = render(Button, baseOptions);

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it.each(types)('should render a button with type "%s"', (type) => {
    const props = { ...baseProps, type };
    const { component } = render(Button, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass(`dusk-button--type--${type}`);
    expect(element.getAttribute("type")).toBe(
      type === "toggle" ? "button" : type
    );
    expect(element.getAttribute("aria-pressed")).toBe(
      type === "toggle" ? "false" : null
    );
  });

  it("should reflect a toggle button's pressed state through aria-pressed", async () => {
    /** @type {import("svelte").ComponentProps<Button>} */
    const props = { ...baseProps, type: "toggle" };
    const { component, rerender } = render(Button, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-button--type--toggle");
    expect(element).not.toHaveClass("dusk-button--pressed");
    expect(element).toHaveAttribute("type", "button");
    expect(element).toHaveAttribute("aria-pressed", "false");

    await rerender({ pressed: true });

    expect(element).toHaveClass("dusk-button--pressed");
    expect(element).toHaveAttribute("aria-pressed", "true");
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "some-id",
    };
    const { component } = render(Button, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass(
      "dusk-button",
      "dusk-button--type--button",
      "dusk-button--variant--primary",
      "dusk-button--size--default",
      "foo",
      "bar"
    );
    expect(element).toHaveAttribute("id", props.id);
  });

  it.each(variants)(
    'should render the `Button` in the "%s" variant',
    (variant) => {
      const props = { ...baseProps, variant };
      const { component } = render(Button, { ...baseOptions, props });
      const element = component.getRootElement();

      expect(element).toHaveClass(
        "dusk-button",
        "dusk-button--type--button",
        `dusk-button--variant--${variant}`,
        "dusk-button--size--default"
      );
    }
  );

  it.each(sizes)(
    'should render the `Button` of the "%s" size, passing the correct size to the underlying icon',
    (size) => {
      const props = { ...baseProps, icon: { path: mdiFolderOutline }, size };
      const { component, getByRole } = render(Button, {
        ...baseOptions,
        props,
      });
      const element = component.getRootElement();
      const icon = getByRole("graphics-symbol");

      expect(element).toHaveClass(
        "dusk-button",
        "dusk-button--type--button",
        "dusk-button--variant--primary",
        `dusk-button--size--${size}`
      );
      expect(icon).toHaveClass(`dusk-icon--size--${size}`);
    }
  );

  it("should be able to render a `Button` without a text", () => {
    const propsA = { ...baseProps, text: "" };
    const propsB = skipIn(baseProps, ["text"]);
    const resultA = render(Button, { ...baseOptions, props: propsA });
    const resultB = render(Button, { ...baseOptions, props: propsB });

    expect(resultA.container.querySelector(".dusk-button__text")).toBeNull();
    expect(resultB.container.querySelector(".dusk-button__text")).toBeNull();
  });

  it.each(iconPositions)(
    'should be able to render a `Button` with an icon in "%s" position in respect to the text',
    (position) => {
      const props = {
        ...baseProps,
        icon: {
          path: mdiFolderOutline,
          position,
        },
      };
      const { component } = render(Button, { ...baseOptions, props });
      const element = component.getRootElement();
      const svgElement = /** @type {SVGSVGElement} */ (
        element.querySelector("svg")
      );
      const spanElement = getAsHTMLElement(element, ".dusk-button__text");
      const iconPosition = spanElement.compareDocumentPosition(svgElement);
      const expectedFlag =
        position === "after"
          ? Node.DOCUMENT_POSITION_FOLLOWING
          : Node.DOCUMENT_POSITION_PRECEDING;

      expect(iconPosition & expectedFlag).toBeTruthy();
      expect(element).toHaveClass("dusk-icon-button--labeled");
      expect(element).not.toHaveClass("dusk-icon-button");
      expect(svgElement.querySelector("path")).toHaveAttribute(
        "d",
        mdiFolderOutline
      );
    }
  );

  it.each(iconPositions)(
    'should be able to render a `Button` with an icon only ignoring the icon position ("%s") property',
    (position) => {
      const props = {
        ...baseProps,
        icon: {
          path: mdiFolderOutline,
          position,
        },
        text: "",
      };
      const { component } = render(Button, { ...baseOptions, props });
      const element = component.getRootElement();

      expect(element).toHaveClass("dusk-icon-button");
      expect(element).not.toHaveClass("dusk-icon-button--labeled");
      expect(element.querySelector(".dusk-button__text")).toBeNull();
      expect(element.querySelector(".dusk-icon > path")).toHaveAttribute(
        "d",
        mdiFolderOutline
      );
    }
  );

  it("should forward the `on:click`, `on:mousedown` and `on:mouseup` handlers to the underlying element", async () => {
    const handleEvent = vi.fn((evt) => evt.preventDefault());
    const { component } = render(Button, {
      ...baseOptions,
      events: {
        click: handleEvent,
        mousedown: handleEvent,
        mouseup: handleEvent,
      },
    });

    const element = component.getRootElement();

    await fireEvent.click(element);
    await fireEvent.mouseDown(element);
    await fireEvent.mouseUp(element);

    expect(handleEvent).toHaveBeenCalledTimes(3);
  });

  describe("Reactivity", () => {
    it("should react to property changes", async () => {
      /** @type {import("svelte").ComponentProps<Button>} */
      const props = {
        ...baseProps,
        type: "submit",
        variant: "primary",
      };
      const { component, rerender } = render(Button, { ...baseOptions, props });
      const element = component.getRootElement();

      await rerender({
        disabled: true,
        size: "small",
        text: "some new text",
        type: "toggle",
        variant: "secondary",
      });

      expect(element).toHaveClass("dusk-button--variant--secondary");
      expect(element).toHaveClass("dusk-button--size--small");
      expect(element).toBeDisabled();
      expect(element).toHaveAttribute("type", "button");
    });

    it("should update icon and text props correctly in all conditional rendering branches", async () => {
      // the default props have text only
      const { component, rerender } = render(Button, baseOptions);
      const element = component.getRootElement();

      expect(element).toHaveTextContent(baseProps.text);

      await rerender({ text: "Updated Text Only" });

      expect(element).toHaveTextContent("Updated Text Only");

      /** @type {Partial<import("svelte").ComponentProps<Button>>} */
      const propsIconBefore = {
        icon: { path: mdiFolderOutline, position: "before" },
        text: "Initial Before",
      };

      await rerender(propsIconBefore);

      expect(element.querySelector(".dusk-button__text")).toHaveTextContent(
        "Initial Before"
      );

      await rerender({
        ...propsIconBefore,
        icon: { ...propsIconBefore.icon, path: mdiAbTesting },
        text: "Updated Before",
      });

      expect(element.querySelector(".dusk-button__text")).toHaveTextContent(
        "Updated Before"
      );
      expect(element.querySelector("path")).toHaveAttribute("d", mdiAbTesting);

      /** @type {Partial<import("svelte").ComponentProps<Button>>} */
      const propsIconAfter = {
        icon: { path: mdiFolderOutline, position: "after" },
        text: "Initial After",
      };

      await rerender(propsIconAfter);

      expect(element.querySelector(".dusk-button__text")).toHaveTextContent(
        "Initial After"
      );

      await rerender({
        ...propsIconAfter,
        icon: { ...propsIconAfter.icon, path: mdiAbTesting },
        text: "Updated After",
      });

      expect(element.querySelector(".dusk-button__text")).toHaveTextContent(
        "Updated After"
      );
      expect(element.querySelector("path")).toHaveAttribute("d", mdiAbTesting);
    });
  });
});
