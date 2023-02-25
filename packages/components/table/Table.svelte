<script>
	import { onDestroy, setContext, getContext, createEventDispatcher } from "svelte";
	import DropDown from "@dusk-network/drop-down";
	import InfiniteScroll from "./InfiniteScroll.svelte";
	import Group from "@dusk-network/group";
	import TextField from "@dusk-network/text-field";
	import Button from "@dusk-network/button";
	import contexts from "@dusk-network/utilities/contexts.js";
	import types from "@dusk-network/utilities/types.js";
	import { getTable } from "./table.js";
	import { key } from "./key.js";
	import { createContext } from "./context.js";
	import "./styles.css";

	/**
	 * Sets the data displayed in the Table.
	 */
	export let data = [];

	/**
	 * Sets the settings available in the Table.
	 */
	export let settings = {};

	/**
	 * Sets Table mobile breakpoint.
	 * @type { "sm" | "md" | "lg" | "xl" | "xxl" }
	 */
	export let mobileBreakpoint = "sm";

	/**
	 * Sets the duration for the data load delay
	 */
	export let duration = 2000;

	/**
	 * Sets the Table style
	 * @type { "stripe" | "uniform"}
	 */
	export let type = types.TABLE.STRIPE;

	let showFilter = false;
	let filter = {
		globalValue: "",
		inputValue: "",
	};

	setContext(key, {});
	createContext();

	const table = getTable();
	const { rows, id, options, pageNumber, columns, activeRow, globalFilters } = getContext(key);
	const dispatch = createEventDispatcher();

	export const dataRows = rows;

	$: {
		table.setRows(data);
		options.update(settings);
		globalFilters.set(filter.globalValue);
	}

	onDestroy(() => table.reset());

	setContext("DUK:drop-down:context", contexts.DROP_DOWN.TABLE);
	setContext("DUK:pagination:context", contexts.PAGINATION.TABLE);
</script>

<div id="{$id}" class="{$$props.class || ''} duk-table">
	<div class="duk-table__header">
		<div class="duk-table__header--title">
			<slot name="title" />
			{#if !showFilter && $options.filter}
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"
					></path></svg
				>
			{/if}
		</div>
		{#if showFilter && $options.filter}
			<div class="duk-table__header--filter">
				<TextField bind:value="{filter.inputValue}" type="text" />
				<Group align="right">
					<Button
						variant="brand"
						size="sm"
						on:click="{() => {
							filter.globalValue = filter.inputValue;
						}}"
						label="Filter"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
							></path></svg
						>
					</Button>
					<Button
						variant="brand"
						size="sm"
						on:click="{() => {
							showFilter = !showFilter;
							filter = {
								globalValue: '',
								inputValue: '',
							};
						}}"
						label="Close filter"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
							></path></svg
						>
					</Button>
				</Group>
			</div>
		{/if}
	</div>
	<div class="duk-table__wrapper">
		<table
			class="duk-table__table"
			class:duk-table__table--sm="{mobileBreakpoint === 'sm'}"
			class:duk-table__table--md="{mobileBreakpoint === 'md'}"
			class:duk-table__table--lg="{mobileBreakpoint === 'lg'}"
			class:duk-table__table--xl="{mobileBreakpoint === 'xl'}"
			class:duk-table__table--xxl="{mobileBreakpoint === 'xxl'}"
			class:duk-table__table--stripe="{type === types.TABLE.STRIPE}"
			class:duk-table__table--uniform="{type === types.TABLE.UNIFORM}"
		>
			<slot name="head" />
			<slot />
			<slot name="foot" />
		</table>
	</div>

	<div class="duk-table__actions">
		{#if $options.infinite === true}
			<InfiniteScroll
				duration="{duration}"
				pageNumber="{pageNumber}"
				items="{data}"
				itemsPerPage="{$options.rowsPerPage}"
				on:infinite="{() => {
					columns.redraw();
					activeRow.set(null);
					dispatch('loading', {
						rowsPerPage: $options.rowsPerPage,
						pageNumber: $pageNumber,
					});
				}}"
			/>
		{/if}
		<slot name="actions" />
		{#if $options.limiter === true}
			<DropDown
				dropUp="{true}"
				items="{data}"
				options="{[10, 20, 30, 40, 50]}"
				on:select="{(event) => {
					settings = { ...settings, rowsPerPage: event.detail };
					columns.redraw();
					activeRow.set(null);
					dispatch('loading', {
						rowsPerPage: event.detail,
						pageNumber: $pageNumber,
					});
				}}"
			/>
		{/if}
	</div>
</div>
