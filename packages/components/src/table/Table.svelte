<svelte:options immutable={true} />

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

  /** @type {TableProps["caption"]} */
  export let caption = undefined;

  /** @type {TableProps["className"]} */
  export let className = undefined;

  /** @type {TableProps["data"]} */
  export let data;

  /** @type {TableProps["descriptors"]} */
  export let descriptors = undefined;

  /** @type {HTMLTableElement} */
  let rootElement;

  export const getRootElement = () => rootElement;

  const dispatch = createEventDispatcher();

  /** @type {TableSortState} */
  let sortState = null;

  let sortedData = data;

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

    if (sortState === null) {
      sortedData = data;
      dispatch("sort", null);
    } else {
      const sorter =
        sortState.direction === "ascending"
          ? getKey(sortState.column)
          : sorterDesc(getKey(sortState.column));

      sortedData = sort(data, [sorter]);
      dispatch("sort", { ...sortState });
    }
  }

  /** @type {Exclude<TableProps["descriptors"], undefined>} */
  $: tableDescriptors =
    descriptors ??
    (data.length
      ? Object.keys(data[0]).map((name) => ({
          name,
          sortable: false,
        }))
      : []);
  $: classes = makeClassName(["dusk-table", className]);
</script>

<table bind:this={rootElement} {...$$restProps} class={classes}>
  {#if caption}
    <caption>{caption}</caption>
  {/if}
  <thead class="dusk-table__head">
    <tr class="dusk-table__row">
      {#each tableDescriptors as descriptor (descriptor.name)}
        {@const columnText = descriptor.label ?? descriptor.name}
        {@const ariaSort =
          sortState?.column === descriptor.name ? sortState.direction : "none"}
        <th
          aria-sort={ariaSort}
          class="dusk-table__head-cell"
          class:dusk-table__head-cell--hidden={descriptor.hidden ?? false}
          data-column={descriptor.name}
          scope="col"
        >
          {#if descriptor.sortable}
            <Button
              className="dusk-table__sort-button"
              icon={{
                path:
                  ariaSort === "none"
                    ? mdiArrowUpDown
                    : ariaSort === "ascending"
                      ? mdiArrowUpBold
                      : mdiArrowDownBold,
                position: "after",
              }}
              on:click={handleSortButtonClick}
              size="small"
              text={columnText}
              variant="naked"
            />
          {:else}
            <span class="dusk-table__head-cell-text">{columnText}</span>
          {/if}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody class="dusk-table__body">
    {#each sortedData as row (row)}
      <tr class="dusk-table__row">
        {#each tableDescriptors as descriptor (descriptor.name)}
          {@const columnName = descriptor.name}
          {#if isCustomDescriptor(row, descriptor)}
            <td
              class="dusk-table__cell"
              class:dusk-table__cell--hidden={descriptor.hidden ?? false}
              data-column={columnName}
            >
              {#if typeof descriptor.renderer === "function"}
                {descriptor.renderer(row)}
              {:else}
                <svelte:component
                  this={descriptor.renderer.component}
                  {...descriptor.renderer.getProps(row)}
                />
              {/if}
            </td>
          {:else}
            {@const renderer = descriptor.renderer}
            <td
              class="dusk-table__cell"
              class:dusk-table__cell--hidden={descriptor.hidden ?? false}
              data-column={columnName}
            >
              {#if renderer}
                {@const value = row[columnName]}
                {#if typeof renderer === "function"}
                  {renderer(value, row)}
                {:else}
                  <svelte:component
                    this={renderer.component}
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
