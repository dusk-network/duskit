import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import {
  getAsHTMLElement,
  renderWithSimpleContent,
} from "@duskit/test-helpers";

import { Banner } from "../..";

vi.mock("../__shared__/getDeterministicId", () => ({
  default: vi.fn().mockReturnValue("dusk-banner-title-mocked-id"),
}));

describe("Banner", () => {
  const variants = /** @type {const} */ ([
    "error",
    "info",
    "success",
    "warning",
  ]);
  /** @type {import("svelte").ComponentProps<Banner>} */
  const baseProps = {
    title: "Some banner title",
    variant: "info",
  };
  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  afterAll(() => {
    vi.doUnmock("../__shared__/getDeterministicId");
  });

  it("should render the `Banner` component", () => {
    const { component } = renderWithSimpleContent(Banner, baseOptions);
    const rootElement = component.getRootElement().getRootElement();
    const titleElement = getAsHTMLElement(rootElement, ".dusk-banner__title");

    expect(rootElement).toHaveClass("dusk-banner dusk-banner--variant--info");
    expect(rootElement).toHaveAttribute(
      "aria-labelledby",
      "dusk-banner-title-mocked-id"
    );
    expect(rootElement).toHaveAttribute("role", "status");
    expect(titleElement).toHaveAttribute("id", "dusk-banner-title-mocked-id");
    expect(rootElement).toMatchSnapshot();
  });

  it("should render a warning message if no content is provided for the default slot", () => {
    const { container } = render(Banner, baseOptions);

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = { ...baseProps, className: "foo bar", id: "some-id" };
    const { component } = render(Banner, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass(
      "dusk-banner",
      "dusk-banner--variant--info",
      "foo",
      "bar"
    );
    expect(element).toHaveAttribute("id", "some-id");
  });

  it.each(variants)(
    'should be able to render the component using the "%s" variant',
    (variant) => {
      const props = { ...baseProps, variant };
      const { component } = renderWithSimpleContent(Banner, {
        ...baseOptions,
        props,
      });
      const rootElement = component.getRootElement().getRootElement();

      expect(rootElement).toHaveClass(`dusk-banner--variant--${variant}`);
      expect(rootElement).toHaveAttribute(
        "role",
        variant === "error" || variant === "warning" ? "alert" : "status"
      );

      // we use snapshots here as other than the class name
      // the component uses a different icon for each variant
      expect(rootElement).toMatchSnapshot();
    }
  );

  it.each(variants)(
    'should give priority to the received `role` prop and not assign a "%s variant" default `aria-role`',
    (variant) => {
      const props = { ...baseProps, role: "alertdialog", variant };
      const { component } = renderWithSimpleContent(Banner, {
        ...baseOptions,
        props,
      });
      const rootElement = component.getRootElement().getRootElement();

      expect(rootElement).toHaveClass(`dusk-banner--variant--${variant}`);
      expect(rootElement).toHaveAttribute("role", props.role);
    }
  );

  it("should remove the title node and apply a fallback class when the title is empty", async () => {
    const { component, rerender } = render(Banner, baseOptions);
    const rootElement = component.getRootElement();

    expect(rootElement).not.toHaveClass("dusk-banner--no-title");
    expect(rootElement).toHaveAttribute(
      "aria-labelledby",
      "dusk-banner-title-mocked-id"
    );
    expect(
      getAsHTMLElement(rootElement, ".dusk-banner__title")
    ).toHaveAttribute("id", "dusk-banner-title-mocked-id");

    await rerender({ title: "" });

    expect(rootElement).toHaveClass("dusk-banner--no-title");
    expect(rootElement).not.toHaveAttribute("aria-labelledby");
    expect(rootElement.querySelector(".dusk-banner__title")).toBeNull();
  });

  it("should react to prop changes", async () => {
    const { component, rerender } = render(Banner, baseOptions);
    const rootElement = component.getRootElement();

    await rerender({
      className: "baz",
      title: "new title",
      variant: "error",
    });

    expect(rootElement).toHaveClass("dusk-banner--variant--error", "baz");
    expect(
      getAsHTMLElement(rootElement, ".dusk-banner__title")
    ).toHaveTextContent("new title");
  });
});
