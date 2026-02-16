import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { mdiAbTesting, mdiFolderOutline } from "@mdi/js";
import { skipIn } from "lamb";

import { getAsHTMLElement } from "@duskit/test-helpers";

import { AnchorButton } from "../..";

/** @type {(container: HTMLElement) => [SVGSVGElement, HTMLElement]} */
function getIconAndText(container) {
  const svgElement = /** @type {SVGSVGElement} */ (
    container.querySelector(".dusk-anchor-button__icon")
  );
  const spanElement = getAsHTMLElement(container, ".dusk-anchor-button__text");

  return [svgElement, spanElement];
}

describe("AnchorButton", () => {
  const baseProps = {
    href: "/some-url",
    text: "some text",
  };
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };
  const iconPositions = /** @type {const} */ (["after", "before", undefined]);
  const sizes = /** @type {const} */ (["default", "small"]);
  const variants = /** @type {const} */ (["primary", "secondary", "tertiary"]);

  afterEach(cleanup);

  it("should render the `AnchorButton` component", () => {
    const { container } = render(AnchorButton, baseOptions);

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should add a disabled class and set its `tabindex` to `-1` if the related property is `true`", () => {
    const props = {
      ...baseProps,
      disabled: true,
    };
    const { component } = render(AnchorButton, { ...baseOptions, props });
    const element = component.getRootElement().getRootElement();

    expect(element).toHaveClass("dusk-anchor-button--disabled");
    expect(element).toHaveAttribute("tabindex", "-1");
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      id: "some-id",
      tabindex: 2,
    };
    const { component } = render(AnchorButton, { ...baseOptions, props });
    const element = component.getRootElement().getRootElement();

    expect(element).toHaveClass(
      "dusk-anchor-button",
      "dusk-anchor-button--variant--primary",
      "dusk-anchor-button--size--default",
      "foo",
      "bar"
    );
    expect(element).toHaveAttribute("id", props.id);
    expect(element).toHaveAttribute("tabindex", props.tabindex.toString());
  });

  it.each(variants)(
    'should render the `AnchorButton` in the "%s" variant',
    (variant) => {
      const props = { ...baseProps, variant };
      const { component } = render(AnchorButton, { ...baseOptions, props });
      const element = component.getRootElement().getRootElement();

      expect(element).toHaveClass(
        "dusk-anchor-button",
        `dusk-anchor-button--variant--${variant}`,
        "dusk-anchor-button--size--default"
      );
    }
  );

  it.each(sizes)(
    'should render the `AnchorButton` of the "%s" size',
    (size) => {
      const props = { ...baseProps, size };
      const { component } = render(AnchorButton, { ...baseOptions, props });
      const element = component.getRootElement().getRootElement();

      expect(element).toHaveClass(
        "dusk-anchor-button",
        "dusk-anchor-button--variant--primary",
        `dusk-anchor-button--size--${size}`
      );
    }
  );

  it("should be able to render a `AnchorButton` without a text", () => {
    const propsA = { ...baseProps, text: "" };
    const propsB = skipIn(baseProps, ["text"]);
    const resultA = render(AnchorButton, { ...baseOptions, props: propsA });
    const resultB = render(AnchorButton, { ...baseOptions, props: propsB });

    expect(
      resultA.container.querySelector(".dusk-anchor-button__text")
    ).toBeNull();
    expect(
      resultB.container.querySelector(".dusk-anchor-button__text")
    ).toBeNull();
  });

  it.each(iconPositions)(
    'should be able to render a `AnchorButton` with an icon in "%s" position in respect to the text',
    (position) => {
      const props = {
        ...baseProps,
        icon: {
          path: mdiFolderOutline,
          position,
        },
      };
      const { component } = render(AnchorButton, { ...baseOptions, props });
      const element = component.getRootElement().getRootElement();
      const [svgElement, spanElement] = getIconAndText(element);
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
    'should be able to render a `AnchorButton` with an icon only ignoring the icon position ("%s") property',
    (position) => {
      const props = {
        ...baseProps,
        icon: {
          path: mdiFolderOutline,
          position,
        },
        text: "",
      };
      const { component } = render(AnchorButton, { ...baseOptions, props });
      const element = component.getRootElement().getRootElement();

      expect(element).toHaveClass("dusk-icon-button");
      expect(element).not.toHaveClass("dusk-icon-button--labeled");
      expect(element.querySelector(".dusk-anchor-button__text")).toBeNull();
      expect(element.querySelector(".dusk-icon > path")).toHaveAttribute(
        "d",
        mdiFolderOutline
      );
    }
  );

  it("should forward the `on:click` handler to the underlying element", async () => {
    const handleEvent = vi.fn((evt) => evt.preventDefault());
    const { component } = render(AnchorButton, {
      ...baseOptions,
      events: { click: handleEvent },
    });
    const element = component.getRootElement().getRootElement();

    await fireEvent.click(element);

    expect(handleEvent).toHaveBeenCalledTimes(1);
  });

  describe("Reactivity", () => {
    it("should react to property changes", async () => {
      /** @type {import("svelte").ComponentProps<AnchorButton>} */
      const props = {
        ...baseProps,
        disabled: false,
        variant: "primary",
      };
      const { component, rerender } = render(AnchorButton, {
        ...baseOptions,
        props,
      });
      const element = component.getRootElement().getRootElement();

      await rerender({
        disabled: true,
        href: "#",
        size: "small",
        text: "some new text",
        variant: "secondary",
      });

      expect(element).toHaveClass("dusk-anchor-button--variant--secondary");
      expect(element).toHaveClass("dusk-anchor-button--size--small");
      expect(element).toHaveClass("dusk-anchor-button--disabled");
      expect(element).toHaveAttribute("aria-disabled", "true");
      expect(element).toHaveAttribute("tabindex", "-1");
    });

    it("should update icon and text props correctly in all conditional rendering branches", async () => {
      // the default props have text only
      const { component, rerender } = render(AnchorButton, baseOptions);
      const element = component.getRootElement().getRootElement();

      expect(element).toHaveTextContent(baseProps.text);

      await rerender({ text: "Updated Text Only" });

      expect(element).toHaveTextContent("Updated Text Only");

      /** @type {Partial<import("svelte").ComponentProps<AnchorButton>>} */
      const propsIconBefore = {
        icon: { path: mdiFolderOutline, position: "before" },
        text: "Initial Before",
      };

      await rerender(propsIconBefore);

      expect(
        element.querySelector(".dusk-anchor-button__text")
      ).toHaveTextContent("Initial Before");

      await rerender({
        ...propsIconBefore,
        icon: { ...propsIconBefore.icon, path: mdiAbTesting },
        text: "Updated Before",
      });

      expect(
        element.querySelector(".dusk-anchor-button__text")
      ).toHaveTextContent("Updated Before");
      expect(element.querySelector("path")).toHaveAttribute("d", mdiAbTesting);

      /** @type {Partial<import("svelte").ComponentProps<AnchorButton>>} */
      const propsIconAfter = {
        icon: { path: mdiFolderOutline, position: "after" },
        text: "Initial After",
      };

      await rerender(propsIconAfter);

      expect(
        element.querySelector(".dusk-anchor-button__text")
      ).toHaveTextContent("Initial After");

      await rerender({
        ...propsIconAfter,
        icon: { ...propsIconAfter.icon, path: mdiAbTesting, size: "small" },
        text: "Updated After",
      });

      expect(
        element.querySelector(".dusk-anchor-button__text")
      ).toHaveTextContent("Updated After");
      expect(element.querySelector("path")).toHaveAttribute("d", mdiAbTesting);

      // with undefined icon position and size
      await rerender({
        ...propsIconAfter,
        icon: { path: mdiFolderOutline, size: "large" },
        text: "",
      });

      await rerender({
        ...baseProps,
        text: "asd",
      });

      await rerender({
        ...baseProps,
        text: "",
      });
    });
  });
});
