import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import {
  getAsHTMLElement,
  renderWithSimpleContent,
} from "@duskit/test-helpers";

import { Banner } from "../..";

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

  it("should render the `Banner` component", () => {
    const { container } = renderWithSimpleContent(Banner, baseOptions);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render a warning message if no content is provided for the default slot", () => {
    const { container } = render(Banner, baseOptions);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = { ...baseProps, className: "foo bar", id: "some-id" };
    const { component } = render(Banner, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass(
      "dusk-banner",
      "dusk-banner--info",
      "foo",
      "bar"
    );
    expect(element).toHaveAttribute("id", "some-id");
  });

  it.each(variants)(
    'should be able to render the component using the "%s" variant',
    (variant) => {
      const props = { ...baseProps, variant };
      const { component, container } = renderWithSimpleContent(Banner, {
        ...baseOptions,
        props,
      });
      const element = component.getRootElement().getRootElement();

      expect(element).toHaveClass(`dusk-banner--${variant}`);

      // we use snapshots here as other than the class name
      // the component uses a different icon for each variant
      expect(container.firstChild).toMatchSnapshot();
    }
  );

  it("should react to prop changes", async () => {
    const { component, rerender } = render(Banner, baseOptions);
    const element = component.getRootElement();

    await rerender({
      className: "baz",
      title: "new title",
      variant: "error",
    });

    expect(element).toHaveClass("dusk-banner--error", "baz");
    expect(getAsHTMLElement(element, ".dusk-banner__title")).toHaveTextContent(
      "new title"
    );
  });
});
