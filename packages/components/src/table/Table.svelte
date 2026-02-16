<script>
  /** @import {TableCellDataCustomComponentRenderer} from "./Table" */
  /** @import {TableCellCustomRenderer} from "./Table" */

  /**
   * @template {Record<string, any>} T
   * @typedef {TableCellCustomRenderer<T> | TableCellDataCustomComponentRenderer<T>} CustomRenderer
   */
  /** @typedef {import("./Table").TableSortState} TableSortState */
  /** @typedef {import("./Table").TableProps} TableProps */

  import { mdiArrowDownBold, mdiArrowUpBold, mdiArrowUpDown } from "@mdi/js";
  import { createEventDispatcher } from "svelte";
  import { getKey, sort, sorterDesc } from "lamb";

  import { makeClassName } from "@duskit/string";

  import { Button } from "../..";

  import "./Table.css";

  /**
   * @typedef {Object} Props
   * @property {TableProps["caption"]} [caption]
   * @property {TableProps["className"]} [className]
   * @property {TableProps["data"]} data
   * @property {TableProps["descriptors"]} [descriptors]
   */

  /** @type {Props & { [key: string]: any }} */
  const {
    caption = undefined,
    className = undefined,
    data,
    descriptors = undefined,
    ...rest
  } = $props();

  /** @type {HTMLTableElement} */
  let rootElement = /** @type {HTMLTableElement} */ ($state());

  export const getRootElement = () => rootElement;

  const dispatch = createEventDispatcher();

  /** @type {TableSortState} */
  let sortState = $state(null);

  /** @type {typeof data} */
  let sortedData = $state([]);

  /**
   * @template {Record<string, any>} T
   * @param {T} row
   * @param {import("./Table").TableDescriptor<T>} descriptor
   * @returns {descriptor is import("./Table").TableCustomDescriptor<T>}
   */
  function isCustomDescriptor(row, descriptor) {
    return !(descriptor.name in row);
  }

  /** @type {import("svelte/elements").MouseEventHandler<HTMLButtonElement>}*/
  function handleSortButtonClick(event) {
    const column =
      event.currentTarget.parentElement?.getAttribute("data-column");

    if (!column) {
      return;
    }

    if (column === sortState?.column) {
      if (sortState?.direction === "ascending") {
        sortState = { column, direction: "descending" };
      } else {
        sortState = null;
      }
    } else {
      sortState = { column, direction: "ascending" };
    }

    dispatch("sort", sortState ? { ...sortState } : null);
  }

  /** @type {Exclude<TableProps["descriptors"], undefined>} */
  const tableDescriptors = $derived(
    descriptors ??
      (data.length
        ? Object.keys(data[0]).map((name) => ({
            name,
            sortable: false,
          }))
        : [])
  );
  const classes = $derived(makeClassName(["duskit-table", className]));

  $effect(() => {
    if (sortState === null) {
      sortedData = data;

      return;
    }

    const sorter =
      sortState.direction === "ascending"
        ? getKey(sortState.column)
        : sorterDesc(getKey(sortState.column));

    sortedData = sort(data, [sorter]);
  });
</script>

<table bind:this={rootElement} class={classes} {...rest}>
  {#if caption}
    <caption>{caption}</caption>
  {/if}
  <thead class="duskit-table__head">
    <tr class="duskit-table__row">
      {#each tableDescriptors as descriptor (descriptor.name)}
        {@const columnText = descriptor.label ?? descriptor.name}
        {@const ariaSort =
          sortState?.column === descriptor.name ? sortState.direction : "none"}
        <th
          aria-sort={ariaSort}
          class="duskit-table__head-cell"
          class:duskit-table__head-cell--hidden={descriptor.hidden ?? false}
          data-column={descriptor.name}
          scope="col"
        >
          {#if descriptor.sortable}
            <Button
              className="duskit-table__sort-button"
              icon={{
                path:
                  ariaSort === "none"
                    ? mdiArrowUpDown
                    : ariaSort === "ascending"
                      ? mdiArrowUpBold
                      : mdiArrowDownBold,
                position: "after",
                size: "small",
              }}
              on:click={handleSortButtonClick}
              text={columnText}
            />
          {:else}
            <span class="duskit-table__head-cell-text">{columnText}</span>
          {/if}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody class="duskit-table__body">
    {#each sortedData as row (row)}
      <tr class="duskit-table__row">
        {#each tableDescriptors as descriptor (descriptor.name)}
          {@const columnName = descriptor.name}
          {#if isCustomDescriptor(row, descriptor)}
            <td
              class="duskit-table__cell"
              class:duskit-table__cell--hidden={descriptor.hidden ?? false}
              data-column={columnName}
            >
              {#if typeof descriptor.renderer === "function"}
                {descriptor.renderer(row)}
              {:else}
                <descriptor.renderer.component
                  {...descriptor.renderer.getProps(row)}
                />
              {/if}
            </td>
          {:else}
            {@const renderer = descriptor.renderer}
            <td
              class="duskit-table__cell"
              class:duskit-table__cell--hidden={descriptor.hidden ?? false}
              data-column={columnName}
            >
              {#if renderer}
                {@const value = row[columnName]}
                {#if typeof renderer === "function"}
                  {renderer(value, row)}
                {:else}
                  <renderer.component
                    {...renderer.getProps(row[columnName], row)}
                  />
                {/if}
              {:else}
                {String(row[columnName])}
              {/if}
            </td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
