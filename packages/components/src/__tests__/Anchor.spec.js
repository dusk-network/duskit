import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";

import { renderWithSimpleContent } from "@duskit/test-helpers";

import { Anchor } from "../..";

describe("Anchor", () => {
  const baseProps = {
    href: "https://example.com",
  };

  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(cleanup);

  it("should render the Anchor component", () => {
    const { container } = renderWithSimpleContent(Anchor, baseOptions);

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should forward the `on:click` handler", async () => {
    const handleClick = vi.fn((evt) => evt.preventDefault());
    const { component } = render(Anchor, {
      ...baseOptions,
      events: { click: handleClick },
    });
    const element = component.getRootElement();

    await fireEvent.click(element);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      title: "Some title",
    };
    const { component } = renderWithSimpleContent(Anchor, {
      ...baseOptions,
      props,
    });

    const element = component.getRootElement().getRootElement();

    expect(element).toHaveClass("dusk-anchor", "foo", "bar");
    expect(element).toHaveAttribute("title", props.title);
  });

  it("should react to prop changes", async () => {
    /**
     * `rerender` returned by `renderWithSimpleContent` doesn't
     * trigger a rerender of the underlying component.
     */
    const { component, rerender } = render(Anchor, baseOptions);
    const element = component.getRootElement();

    await rerender({
      className: "baz",
      href: `${baseProps.href}/some-path`,
    });

    expect(element).toHaveClass("baz");
    expect(element).toHaveAttribute("href", "https://example.com/some-path");
  });
});
