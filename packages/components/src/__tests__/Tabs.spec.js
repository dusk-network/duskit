import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { mdiHome } from "@mdi/js";
import { getAsHTMLElement } from "@duskit/test-helpers";

/** @typedef {import("../tabs/Tabs").TabsProps} TabsProps */

import observeResize from "../__shared__/observeResize";

import { Tabs } from "../..";

vi.mock("../__shared__/observeResize", () => {
  return {
    default: vi.fn(),
  };
});

describe("Tabs", () => {
  const TEST_CLIENT_WIDTH = 320;
  const rafSpy = vi.spyOn(window, "requestAnimationFrame");
  const cafSpy = vi.spyOn(window, "cancelAnimationFrame");
  const scrollBySpy = vi.spyOn(HTMLUListElement.prototype, "scrollBy");
  const scrollIntoViewSpy = vi.spyOn(HTMLLIElement.prototype, "scrollIntoView");
  const scrollLeftSpy = vi
    .spyOn(HTMLUListElement.prototype, "scrollLeft", "get")
    .mockReturnValue(0);
  const scrollWidthSpy = vi
    .spyOn(HTMLUListElement.prototype, "scrollWidth", "get")
    .mockReturnValue(TEST_CLIENT_WIDTH * 2);

  vi.spyOn(HTMLUListElement.prototype, "scrollTo");
  vi.spyOn(HTMLUListElement.prototype, "clientWidth", "get").mockReturnValue(
    TEST_CLIENT_WIDTH
  );

  const items = [
    "Dashboard",
    "User Settings",
    "User Profile",
    "Notifications",
    "Direct Messaging",
    "Task Manager",
    "Event Calendar",
    "Analytics",
    "Team Management",
    "Help",
  ].map((v) => ({ id: v.toLowerCase().replace(/ /g, "-"), label: v }));

  /** @type {TabsProps["items"]} */
  const itemsWithTextAndIcon = items.map((item, idx) => ({
    ...item,
    icon: { path: mdiHome, position: idx % 2 === 0 ? "before" : "after" },
  }));

  /** @type {TabsProps["items"]} */
  const itemsWithIcon = itemsWithTextAndIcon.map(({ id, icon }) => ({
    icon,
    id,
  }));
  const itemsWithIdOnly = items.map(({ id }) => ({ id }));

  const baseProps = {
    items,
    selectedTab: "user-settings",
  };

  const baseOptions = {
    props: baseProps,
    target: document.body,
  };

  /**
   * @param {import("svelte").ComponentProps<Tabs>} props
   * @param {Record<string, any>} [options]
   */
  const renderTabs = async (props, options = {}) => {
    const renderResult = render(Tabs, { ...baseOptions, ...options, props });

    // @ts-expect-error We just need the `contentRect`
    currentResizeCallback({
      contentRect: DOMRect.fromRect({
        height: TEST_CLIENT_WIDTH,
        width: TEST_CLIENT_WIDTH,
      }),
    });

    return renderResult;
  };

  /** @type {import("../__shared__/observeResize").ObserveResizeCallback} */
  let currentResizeCallback;

  const unobserveMock = vi.fn();

  vi.mocked(observeResize).mockImplementation((element, callback) => {
    currentResizeCallback = callback;

    return unobserveMock;
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
    vi.doUnmock("../__shared__/observeResize");
  });

  it('should render a "Tabs" component and reset its scroll status if no tab is selected', async () => {
    const { container } = await renderTabs({
      ...baseProps,
      selectedTab: undefined,
    });
    const tabsList = getAsHTMLElement(container, ".dusk-tabs-list");

    expect(tabsList.scrollTo).toHaveBeenCalledTimes(1);
    expect(tabsList.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should scroll the selected tab into view if there's a selection", async () => {
    const { container } = await renderTabs(baseProps);
    const tab = getAsHTMLElement(
      container,
      `[data-tabid="${baseProps.selectedTab}"]`
    );

    expect(tab.scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it("should be able to render tabs with icon and text", async () => {
    const { container } = await renderTabs({
      ...baseProps,
      items: itemsWithTextAndIcon,
    });

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should be able to render tabs with icons only", async () => {
    const { container } = await renderTabs({
      ...baseProps,
      items: itemsWithIcon,
    });

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should use the id as label if the tab hasn't one and is without icon", async () => {
    const { container } = await renderTabs({
      ...baseProps,
      items: itemsWithIdOnly,
    });

    expect(container.firstElementChild).toMatchSnapshot();
  });

  it("should observe the tab list resize on mounting and stop observing when unmounting", async () => {
    const { container, unmount } = await renderTabs(baseProps);
    const tabsList = container.querySelector(".dusk-tabs-list");

    expect(observeResize).toHaveBeenCalledExactlyOnceWith(
      tabsList,
      expect.any(Function)
    );

    unmount();

    expect(unobserveMock).toHaveBeenCalledTimes(1);
  });

  it("should pass additional class names and attributes to the root element", async () => {
    const { component } = await renderTabs({
      ...baseProps,
      className: "foo bar",
      id: "some-id",
    });

    expect(component.getRootElement()).toMatchSnapshot();
  });

  it("should fire a change event when a tab is selected and it's not the current selection", async () => {
    /** @type {HTMLElement | null} */
    let expectedTab = null;

    /** @param {CustomEvent<string>} event */
    const onChange = (event) => {
      expect(event.detail).toBe(expectedTab?.dataset.tabid ?? "");
    };

    const { getAllByRole } = await renderTabs(baseProps, {
      events: { change: onChange },
    });
    const tabs = getAllByRole("tab");

    expectedTab = tabs[0];

    expect.assertions(3);

    // does nothing as it's currently selected
    await fireEvent.click(tabs[1]);

    await fireEvent.click(expectedTab);

    expectedTab = tabs[1];

    await fireEvent.keyDown(expectedTab, { key: "Enter" });

    expectedTab = tabs[2];

    await fireEvent.keyDown(expectedTab, { key: " " });

    // does nothing as neither space or Enter are pressed
    await fireEvent.keyDown(tabs[1], { key: "f" });
  });

  it("should scroll a tab into view when it gains focus", async () => {
    const { getAllByRole } = await renderTabs(baseProps);
    const tabs = getAllByRole("tab");

    scrollIntoViewSpy.mockClear();

    await fireEvent.focusIn(tabs[0]);

    expect(tabs[0].scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it("should hide and disable the scroll buttons if there is enough horizontal space", async () => {
    scrollWidthSpy.mockReturnValueOnce(0);

    const { container } = await renderTabs(baseProps);
    const leftBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:first-of-type"
    );
    const rightBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:last-of-type"
    );

    expect(leftBtn).toHaveClass(
      "dusk-tab-scroll-button",
      "dusk-tab-scroll-button--hidden"
    );
    expect(leftBtn.getAttribute("disabled")).toBe("");
    expect(rightBtn).toHaveClass(
      "dusk-tab-scroll-button",
      "dusk-tab-scroll-button--hidden"
    );
    expect(rightBtn.getAttribute("disabled")).toBe("");
  });

  it("should show the scroll buttons when there isn't enough horizontal space and enable the appropriate ones", async () => {
    const { container } = await renderTabs(baseProps);
    const tabsList = getAsHTMLElement(container, ".dusk-tabs-list");

    let leftBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:first-of-type"
    );
    let rightBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:last-of-type"
    );

    expect(leftBtn).not.toHaveClass("dusk-tab-scroll-button--hidden");
    expect(leftBtn.getAttribute("disabled")).toBe("");
    expect(rightBtn).not.toHaveClass("dusk-tab-scroll-button--hidden");
    expect(rightBtn.getAttribute("disabled")).toBeNull();

    await fireEvent.mouseDown(rightBtn, { buttons: 1 });

    expect(rafSpy).toHaveBeenCalledTimes(1);
    expect(tabsList.scrollBy).toHaveBeenCalledTimes(1);
    expect(tabsList.scrollBy).toHaveBeenCalledWith(5, 0);

    scrollBySpy.mockClear();
    rafSpy.mockClear();

    await fireEvent.mouseUp(rightBtn);

    expect(cafSpy).toHaveBeenCalledTimes(1);

    scrollLeftSpy.mockReturnValueOnce(TEST_CLIENT_WIDTH);

    await fireEvent.scroll(tabsList);

    leftBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:first-of-type"
    );
    rightBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:last-of-type"
    );

    expect(leftBtn).not.toHaveClass("dusk-tab-scroll-button--hidden");
    expect(leftBtn.getAttribute("disabled")).toBeNull();
    expect(rightBtn).not.toHaveClass("dusk-tab-scroll-button--hidden");
    expect(rightBtn.getAttribute("disabled")).toBe("");

    scrollBySpy.mockClear();
    rafSpy.mockClear();

    await fireEvent.mouseDown(leftBtn, { buttons: 1 });

    expect(rafSpy).toHaveBeenCalledTimes(1);
    expect(tabsList.scrollBy).toHaveBeenCalledTimes(1);
    expect(tabsList.scrollBy).toHaveBeenCalledWith(-5, 0);

    await fireEvent.mouseUp(rightBtn);
  });

  it("should keep scrolling while the scroll button is pressed", async () => {
    const { container } = await renderTabs(baseProps);
    const tabsList = getAsHTMLElement(container, ".dusk-tabs-list");
    const rightBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:last-of-type"
    );

    expect(rightBtn).not.toHaveClass("dusk-tab-scroll-button--hidden");
    expect(rightBtn.getAttribute("disabled")).toBeNull();

    await fireEvent.mouseDown(rightBtn, { buttons: 1 });

    const frames = 10;

    for (let i = 0; i < frames - 1; i++) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }

    expect(tabsList.scrollBy).toHaveBeenCalledTimes(frames);

    for (let i = 1; i <= frames; i++) {
      expect(tabsList.scrollBy).toHaveBeenNthCalledWith(i, 5, 0);
    }

    await fireEvent.mouseUp(rightBtn);
  });

  it("should ignore mouse down events if the primary button isn't the only one pressed", async () => {
    const { container } = await renderTabs(baseProps);
    const tabsList = getAsHTMLElement(container, ".dusk-tabs-list");
    const leftBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:first-of-type"
    );
    const rightBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:last-of-type"
    );

    await fireEvent.mouseDown(leftBtn, { buttons: 2 });

    await fireEvent.mouseDown(leftBtn, { buttons: 3 });

    await fireEvent.mouseDown(rightBtn, { buttons: 2 });

    await fireEvent.mouseDown(rightBtn, { buttons: 3 });

    expect(rafSpy).not.toHaveBeenCalled();
    expect(tabsList.scrollBy).not.toHaveBeenCalled();
  });

  it("should bring the nearest tab into view on mouse clicks on scroll buttons", async () => {
    const { container } = await renderTabs(baseProps);
    const tabsList = getAsHTMLElement(container, ".dusk-tabs-list");
    const leftBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:first-of-type"
    );
    const rightBtn = getAsHTMLElement(
      container,
      ".dusk-tab-scroll-button:last-of-type"
    );
    const firstTab = getAsHTMLElement(container, "[role='tab']:first-of-type");
    const lastTab = getAsHTMLElement(container, "[role='tab']:last-of-type");

    const tabsListGetRectSpy = vi
      .spyOn(tabsList, "getBoundingClientRect")
      .mockReturnValue(DOMRect.fromRect({ width: tabsList.clientWidth, x: 0 }));
    const firstTabGetRectSpy = vi
      .spyOn(firstTab, "getBoundingClientRect")
      .mockReturnValue(DOMRect.fromRect({ width: 100, x: -100 }));
    const lastTabGetRectSpy = vi
      .spyOn(lastTab, "getBoundingClientRect")
      .mockReturnValue(
        DOMRect.fromRect({ width: 100, x: tabsList.clientWidth })
      );

    scrollIntoViewSpy.mockClear();

    await fireEvent.click(rightBtn);

    expect(lastTab.scrollIntoView).toHaveBeenCalledTimes(1);

    scrollIntoViewSpy.mockClear();

    await fireEvent.click(leftBtn);

    expect(firstTab.scrollIntoView).toHaveBeenCalledTimes(1);

    tabsListGetRectSpy.mockRestore();
    firstTabGetRectSpy.mockRestore();
    lastTabGetRectSpy.mockRestore();
  });
});
