import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { getAsHTMLElement } from "@duskit/test-helpers";

import TableCellSimple from "./test-components/TableCellSimple.svelte";

import { Table } from "../..";

/** @typedef {{ id: number; name: string; email: string; posts: number; }} User */
/** @typedef {import("../..").TableDescriptor<User>} UserDescriptor */

/**
 * Alias to make the typechecker understand what
 * we are passing to `render`.
 *
 * @type {typeof import("../..").Table<User>}
 */
const UserTable = Table;

describe("Table", () => {
  /** @type {User[]} */
  const testData = [
    { email: "jane.doe@example.com", id: 2, name: "Jane Doe", posts: 15 },
    { email: "john.doe@example.com", id: 1, name: "John Doe", posts: 5 },
    { email: "mario.rossi@example.com", id: 3, name: "Mario Rossi", posts: 25 },
  ];

  /** @type {UserDescriptor[]} */
  const descriptors = [
    { label: "Full Name", name: "name", sortable: true },
    { label: "Email Address", name: "email", sortable: false },
    {
      label: "Post Count",
      name: "posts",
      renderer: (value, user) => `Total: ${value} (${user.id})`,
      sortable: true,
    },
    {
      label: "Actions",
      name: "actions",
      renderer: {
        component: TableCellSimple,
        getProps: (row) => ({ text: `Edit ${row.name}` }),
      },
      sortable: false,
    },
  ];

  /** @type {import("svelte").ComponentProps<Table<User>>} */
  const baseProps = {
    data: testData,
    descriptors,
  };

  afterEach(cleanup);

  it("should render the Table component using the provided descriptors", () => {
    const { container } = render(UserTable, baseProps);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("should auto-generate headers and content if descriptors are not provided", () => {
    const { component } = render(UserTable, {
      props: { data: [testData[0]] },
    });
    const table = component.getRootElement();
    const headers = table.querySelectorAll("th");
    const dataCells = table.querySelectorAll("td");
    const dataKeys = /** @type {Array<keyof User>} */ (
      Object.keys(testData[0])
    );

    expect(headers.length).toBe(dataKeys.length);
    expect(dataCells.length).toBe(dataKeys.length);

    dataKeys.forEach((key, idx) => {
      expect(headers[idx]).toHaveTextContent(key);
      expect(dataCells[idx]).toHaveTextContent(String(testData[0][key]));
    });

    expect.assertions(dataKeys.length * 2 + 2);
  });

  it("should render only the headers if descriptors are provided but the data array is empty", () => {
    const props = { ...baseProps, data: [] };
    const { component } = render(UserTable, props);
    const table = component.getRootElement();
    const headers = table.querySelectorAll("th");
    const tbody = table.querySelector("tbody");

    expect(headers.length).toBe(descriptors.length);
    expect(tbody).toBeEmptyDOMElement();
  });

  it("should render an empty table if descriptors aren't provided and the data array is empty", () => {
    const props = { ...baseProps, data: [], descriptors: undefined };
    const { component } = render(UserTable, props);
    const table = component.getRootElement();
    const headers = table.querySelectorAll("th");
    const tbody = table.querySelector("tbody");

    expect(headers.length).toBe(0);
    expect(tbody).toBeEmptyDOMElement();
  });

  it("should use descriptor names if labels are not provided", () => {
    const props = {
      ...baseProps,
      descriptors: descriptors.map((d) => ({ ...d, label: undefined })),
    };
    const { component } = render(UserTable, props);
    const table = component.getRootElement();
    const headers = table.querySelectorAll("th");

    descriptors.forEach((descriptor, idx) => {
      expect(headers[idx]).toHaveTextContent(descriptor.name);
    });

    expect.assertions(descriptors.length);
  });

  it("should pass additional class names and attributes to the rendered element", () => {
    const { component } = render(UserTable, {
      ...baseProps,
      className: "foo bar",
      id: "my-table",
    });
    const table = component.getRootElement();

    expect(table).toHaveClass("duskit-table foo bar");
    expect(table).toHaveAttribute("id", "my-table");
  });

  it("should render a caption if the consumer provides one", () => {
    const { getByText } = render(UserTable, {
      ...baseProps,
      caption: "List of users",
    });

    expect(getByText("List of users").nodeName.toLowerCase()).toBe("caption");
  });

  it("should react to prop changes", async () => {
    /** @type {UserDescriptor[]} */
    const newDescriptors = [
      {
        label: "New name label",
        name: "name",
        renderer: {
          component: TableCellSimple,
          getProps: (value, row) => ({ text: `${row.id} - ${value}` }),
        },
        sortable: false,
      },
      {
        label: "Custom",
        name: "custom",
        renderer: () => "N/A",
        sortable: false,
      },
    ];
    const newProps = {
      caption: "List of users",
      className: "foo bar",
      data: [testData[0]],
      descriptors: newDescriptors,
    };

    const { component, rerender } = render(UserTable, baseProps);
    const table = component.getRootElement();

    await rerender(newProps);

    expect(table).toMatchSnapshot();
  });

  it("should add a specific `*--hidden` class to headers and cells marked as hidden", () => {
    /** @type {UserDescriptor[]} */
    const testDescriptors = [
      { name: "name" },
      { hidden: true, name: "email" },
      { hidden: false, name: "posts" },
    ];

    const { component } = render(UserTable, {
      ...baseProps,
      descriptors: testDescriptors,
    });
    const table = component.getRootElement();
    const emailHeader = getAsHTMLElement(table, 'th[data-column="email"]');
    const nameHeader = getAsHTMLElement(table, 'th[data-column="name"]');
    const postsHeader = getAsHTMLElement(table, 'th[data-column="posts"]');
    const emailCell = getAsHTMLElement(table, 'td[data-column="email"]');
    const nameCell = getAsHTMLElement(table, 'td[data-column="name"]');
    const postsCell = getAsHTMLElement(table, 'td[data-column="posts"]');

    expect(emailHeader).toHaveClass(
      "duskit-table__head-cell",
      "duskit-table__head-cell--hidden"
    );
    expect(nameHeader).toHaveClass("duskit-table__head-cell");
    expect(nameHeader).not.toHaveClass("duskit-table__head-cell--hidden");
    expect(postsHeader).toHaveClass("duskit-table__head-cell");
    expect(postsHeader).not.toHaveClass("duskit-table__head-cell--hidden");
    expect(emailCell).toHaveClass(
      "duskit-table__cell",
      "duskit-table__cell--hidden"
    );
    expect(nameCell).toHaveClass("duskit-table__cell");
    expect(nameCell).not.toHaveClass("duskit-table__cell--hidden");
    expect(postsCell).toHaveClass("duskit-table__cell");
    expect(postsCell).not.toHaveClass("duskit-table__cell--hidden");
  });

  it("should only show sort buttons for sortable columns", () => {
    const { component } = render(UserTable, baseProps);
    const headers = component.getRootElement().querySelectorAll("th");

    descriptors.forEach(({ sortable }, idx) => {
      const btn = headers[idx].querySelector("button");

      if (sortable) {
        // eslint-disable-next-line vitest/no-conditional-expect
        expect(btn).toBeInTheDocument();
      } else {
        // eslint-disable-next-line vitest/no-conditional-expect
        expect(btn).toBeNull();
      }
    });

    expect.assertions(descriptors.length);
  });

  it("should not render a sort button when the `sortable` property is omitted", () => {
    /** @type {UserDescriptor[]} */
    const testDescriptors = [
      { label: "User ID", name: "id" },
      { label: "Full Name", name: "name", sortable: true },
    ];

    const { component } = render(UserTable, {
      ...baseProps,
      descriptors: testDescriptors,
    });
    const table = component.getRootElement();
    const idHeader = getAsHTMLElement(table, 'th[data-column="id"]');
    const nameHeader = getAsHTMLElement(table, 'th[data-column="name"]');

    expect(idHeader.querySelector("button")).toBeNull();
    expect(nameHeader.querySelector("button")).toBeInTheDocument();
  });

  it("should sort data and emit a `sort` event when a sortable column header is clicked", async () => {
    const sortHandler = vi.fn();
    const { component } = render(UserTable, baseProps);
    const table = component.getRootElement();
    const nameHeader = getAsHTMLElement(table, 'th[data-column="name"]');
    const nameSortButton = getAsHTMLElement(nameHeader, "button");
    const postsHeader = getAsHTMLElement(table, 'th[data-column="posts"]');
    const postsSortButton = getAsHTMLElement(postsHeader, "button");

    /** @param {string} name */
    const getFirstRowCellByName = (name) =>
      table.querySelector(`td[data-column="${name}"]`);

    component.$on("sort", (event) => sortHandler(event.detail));

    expect(nameHeader).toHaveAttribute("aria-sort", "none");
    expect(getFirstRowCellByName("name")).toHaveTextContent(testData[0].name);

    await fireEvent.click(nameSortButton);

    expect(sortHandler).toHaveBeenCalledTimes(1);
    expect(sortHandler).toHaveBeenCalledWith({
      column: "name",
      direction: "ascending",
    });
    expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
    expect(getFirstRowCellByName("name")).toHaveTextContent(testData[0].name);

    await fireEvent.click(nameSortButton);

    expect(sortHandler).toHaveBeenCalledTimes(2);
    expect(sortHandler).toHaveBeenCalledWith({
      column: "name",
      direction: "descending",
    });
    expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    expect(getFirstRowCellByName("name")).toHaveTextContent(testData[2].name);

    await fireEvent.click(nameSortButton);

    expect(sortHandler).toHaveBeenCalledTimes(3);
    expect(sortHandler).toHaveBeenCalledWith(null);
    expect(nameHeader).toHaveAttribute("aria-sort", "none");
    expect(getFirstRowCellByName("name")).toHaveTextContent(testData[0].name);

    await fireEvent.click(nameSortButton);
    await fireEvent.click(nameSortButton);

    expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    expect(getFirstRowCellByName("name")).toHaveTextContent(testData[2].name);

    await fireEvent.click(postsSortButton);

    expect(sortHandler).toHaveBeenCalledTimes(6);
    expect(sortHandler).toHaveBeenCalledWith({
      column: "posts",
      direction: "ascending",
    });
    expect(nameHeader).toHaveAttribute("aria-sort", "none");
    expect(postsHeader).toHaveAttribute("aria-sort", "ascending");
    expect(getFirstRowCellByName("posts")).toHaveTextContent(
      testData[1].posts.toString()
    );

    await fireEvent.click(postsSortButton);

    expect(sortHandler).toHaveBeenCalledTimes(7);
    expect(sortHandler).toHaveBeenCalledWith({
      column: "posts",
      direction: "descending",
    });
    expect(nameHeader).toHaveAttribute("aria-sort", "none");
    expect(postsHeader).toHaveAttribute("aria-sort", "descending");
    expect(getFirstRowCellByName("posts")).toHaveTextContent(
      testData[2].posts.toString()
    );
  });
});
