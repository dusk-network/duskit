/** @vitest-environment node */
import { afterAll, describe, expect, it, vi } from "vitest";
import { writable } from "svelte/store";
import { render } from "svelte/server";

import { ToastContainer, createNotificationStore } from "../..";

describe("ToastContainer SSR", () => {
  const ANIM_DURATION = 300;

  vi.useFakeTimers();

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should render safely in a SSR environment without throwing", () => {
    const mockStore = createNotificationStore(
      writable([
        {
          date: new Date(),
          dismissable: true,
          iconPath: "M1 1h22v22H1z",
          id: "id-1",
          mode: "toast",
          text: "Custom body text 1",
          timeout: 4000,
          title: "Custom title 1",
          type: "info",
        },
      ])
    );

    expect(() => {
      render(ToastContainer, {
        props: { store: mockStore },
      });

      vi.advanceTimersByTime(5000 + ANIM_DURATION);
    }).not.toThrow();
  });
});
