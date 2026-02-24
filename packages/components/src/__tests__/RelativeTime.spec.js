import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cleanup, render } from "@testing-library/svelte";

import RelativeTimeCustomContent from "./test-components/RelativeTimeCustomContent.svelte";

import { RelativeTime } from "../..";

describe("RelativeTime", () => {
  vi.useFakeTimers();

  const baseDate = new Date(2024, 4, 20, 15, 25, 30);
  const baseProps = {
    date: new Date(baseDate.getTime() - 20_000),
  };

  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  beforeEach(() => {
    vi.setSystemTime(baseDate);
  });

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

  it('should update the relative time every second if the `autoRefresh` property is set to `true` and the time factor is "second"', async () => {
    const props = { ...baseProps, autoRefresh: true };
    const { component } = render(RelativeTime, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element.textContent).toMatchInlineSnapshot(`"20 seconds ago"`);

    await vi.advanceTimersByTimeAsync(1000);

    expect(element.textContent).toMatchInlineSnapshot(`"21 seconds ago"`);

    await vi.advanceTimersByTimeAsync(1000);

    expect(element.textContent).toMatchInlineSnapshot(`"22 seconds ago"`);
  });

  it("should adapt the refresh interval based on the relative time unit factor", async () => {
    const props = {
      ...baseProps,
      autoRefresh: true,
      date: new Date(Date.now() - 120_000),
    };
    const { component } = render(RelativeTime, { ...baseOptions, props });
    const element = component.getRootElement();

    expect(element.textContent).toMatchInlineSnapshot(`"2 minutes ago"`);

    // Empirical verification of the refresh interval: if the timer were still
    // firing every second, at the +31s mark the distance would be 151000ms.
    // Since 151000 / 60000 is approximately 2.51, the formatting logic would round
    // this up to "3 minutes ago".
    // The fact that the text remains unchanged confirms the component is correctly
    // "napping" thanks to the extended interval.
    await vi.advanceTimersByTimeAsync(31000);

    expect(element.textContent).toMatchInlineSnapshot(`"2 minutes ago"`);

    // Advancing the remaining 29 seconds to cross the minute threshold and
    // verify that the extended timer eventually wakes up and triggers the
    // update as expected.
    await vi.advanceTimersByTimeAsync(29000);

    expect(element.textContent).toMatchInlineSnapshot(`"3 minutes ago"`);
  });

  it("should allow to put custom content in the default slot", async () => {
    const { component, rerender } = render(RelativeTimeCustomContent, {
      ...baseOptions,
      props: { autoRefresh: true, date: baseProps.date },
    });
    const element = component.getRootElement().getRootElement();

    expect(element.textContent).toMatchInlineSnapshot(
      `"The relative time now is 20 seconds ago"`
    );

    await vi.advanceTimersByTimeAsync(1000);

    expect(element.textContent).toMatchInlineSnapshot(
      `"The relative time now is 21 seconds ago"`
    );

    await vi.advanceTimersByTimeAsync(1000);

    expect(element.textContent).toMatchInlineSnapshot(
      `"The relative time now is 22 seconds ago"`
    );

    await rerender({ autoRefresh: false });

    expect(element.textContent).toMatchInlineSnapshot(
      `"The relative time now is 22 seconds ago"`
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
