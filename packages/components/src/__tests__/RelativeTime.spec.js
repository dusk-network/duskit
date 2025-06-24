import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import RelativeTimeCustomContent from "./test-components/RelativeTimeCustomContent.svelte";

import { RelativeTime } from "../..";

describe("RelativeTime", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2024, 4, 20, 15, 25, 30));

  const baseProps = {
    date: new Date(2024, 4, 20, 15, 25, 10),
  };

  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  afterEach(async () => {
    await vi.runOnlyPendingTimersAsync();
    cleanup();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should render the relative time of the given date and should not update it by default", async () => {
    const { component } = render(RelativeTime, baseOptions);
    const element = component.getRootElement();
    const textContent = element.textContent;

    expect(element).toMatchSnapshot();
    expect(element).toHaveClass("dusk-relative-time");
    expect(element).toHaveAttribute("datetime", baseProps.date.toISOString());
    expect(textContent).toMatchInlineSnapshot(`"20 seconds ago"`);

    await vi.advanceTimersByTimeAsync(10000);

    expect(element.textContent).toBe(textContent);
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const props = {
      ...baseProps,
      className: "foo bar",
      "data-baz": "baz",
    };
    const { component } = render(RelativeTime, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element).toHaveClass("dusk-relative-time", "foo", "bar");
    expect(element).toHaveAttribute("data-baz", "baz");
  });

  it("should update the relative time every second if the `autoRefresh` property is set to `true`", async () => {
    const props = { ...baseProps, autoRefresh: true };
    const { component } = render(RelativeTime, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element.textContent).toMatchInlineSnapshot(`"30 seconds ago"`);

    await vi.advanceTimersByTimeAsync(1000);

    expect(element.textContent).toMatchInlineSnapshot(`"31 seconds ago"`);

    await vi.advanceTimersByTimeAsync(1000);

    expect(element.textContent).toMatchInlineSnapshot(`"32 seconds ago"`);
  });

  it("should allow to put custom content in the default slot", async () => {
    const { component, rerender } = render(RelativeTimeCustomContent, {
      ...baseOptions,
      props: { autoRefresh: true, date: baseProps.date },
    });
    const element = component.getRootElement().getRootElement();

    expect(element.textContent).toMatchInlineSnapshot(
      `"The relative time now is 33 seconds ago"`
    );

    await vi.advanceTimersByTimeAsync(1000);

    expect(element.textContent).toMatchInlineSnapshot(
      `"The relative time now is 34 seconds ago"`
    );

    await vi.advanceTimersByTimeAsync(1000);

    expect(element.textContent).toMatchInlineSnapshot(
      `"The relative time now is 35 seconds ago"`
    );

    await rerender({ autoRefresh: false });

    expect(element.textContent).toMatchInlineSnapshot(
      `"The relative time now is 35 seconds ago"`
    );
  });

  it("should react to prop changes", async () => {
    const { component, rerender } = render(RelativeTime, baseOptions);
    const element = component.getRootElement();

    await vi.advanceTimersByTimeAsync(1000 * 60 * 60);

    const date = new Date();

    await rerender({ autoRefresh: true, className: "baz", date });

    expect(element).toHaveClass("baz");
    expect(element).toHaveAttribute("datetime", date.toISOString());
    expect(element.textContent).toMatchInlineSnapshot(`"now"`);

    await vi.advanceTimersByTimeAsync(1000);

    expect(element).toHaveAttribute("datetime", date.toISOString());
    expect(element.textContent).toMatchInlineSnapshot(`"1 second ago"`);
  });
});
