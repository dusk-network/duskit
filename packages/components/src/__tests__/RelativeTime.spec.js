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

  it("should dynamically scale the interval as time passes without requiring the `date` prop to change", async () => {
    const props = {
      autoRefresh: true,
      date: new Date(baseDate.getTime() - 59 * 60 * 1000),
    };
    const { component } = render(RelativeTime, { ...baseOptions, props });
    const setTimeoutSpy = vi.spyOn(window, "setTimeout");

    // Advance 1 minute to cross the threshold into hours
    await vi.advanceTimersByTimeAsync(60 * 1000);

    expect(component.getRootElement().textContent).toMatchInlineSnapshot(
      `"1 hour ago"`
    );

    // The interval should have scaled up to 3600000ms (1 hour factor).
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      3600000
    );

    setTimeoutSpy.mockRestore();
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

    // Verify that changing the date prop again triggers an immediate update
    // even while the auto-refresh loop is active
    const anotherDate = new Date(Date.now() - 5 * 60 * 1000);

    await rerender({ date: anotherDate });

    expect(element).toHaveAttribute("datetime", anotherDate.toISOString());
    expect(element.textContent).toMatchInlineSnapshot(`"5 minutes ago"`);

    // Verify that the auto-refresh timer is still running correctly
    // with the newly provided date
    await vi.advanceTimersByTimeAsync(60 * 1000);

    expect(element.textContent).toMatchInlineSnapshot(`"6 minutes ago"`);
  });

  it("should react to date prop changes when `autoRefresh` is disabled", async () => {
    const { component, rerender } = render(RelativeTime, {
      ...baseOptions,
      props: { ...baseProps, autoRefresh: false },
    });
    const element = component.getRootElement();

    expect(element.textContent).toMatchInlineSnapshot(`"20 seconds ago"`);

    const newDate = new Date(baseDate.getTime() - 60 * 1000);
    await rerender({ date: newDate });

    expect(element.textContent).toMatchInlineSnapshot(`"1 minute ago"`);
  });
});
