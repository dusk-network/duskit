<script>
	import { setContext, getContext, onMount } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import variants from "@dusk-network/utilities/variants.js";
	import { key } from "./key.js";

	export let variant = variants.TABLE.DEFAULT;
	export let dataKey = undefined;
	export let hidden = false;
	export let colspan = null;
	export let id = "__DUK-table-datum" + Math.random().toString(36);

	const { activeRow } = getContext(key);

	let context = getContext("DUK:table:row:datum:context");
	let h, ref, activeRowId;

	setContext("DUK:loading-indicator:context", contexts.LOADING_INDICATOR.DATUM);
	setContext("DUK:truncate-text:context", contexts.TRUNCATE_TEXT.DATUM);
	setContext("DUK:heading:context", contexts.HEADING.DATUM);
	setContext("DUK:chip:context", contexts.CHIP.DATUM);

	const setCellHeight = (el) => {
		if (el !== undefined && el !== null && el.hasAttribute("colspan")) {
			let dataRowIndex = Array.prototype.indexOf.call(
				el.parentNode.parentNode.children,
				el.parentNode,
			);
			let headRowIndex = dataRowIndex === 1 ? 0 : (dataRowIndex - 1) / 2;
			let filteredHeadRows = Array.prototype.filter.call(
				el.parentNode.parentNode.previousElementSibling.childNodes,
				(n) => n.nodeType === 1,
			);
			let headRow = filteredHeadRows[headRowIndex];
			let filteredHeadRowCells = Array.prototype.filter.call(
				headRow.childNodes,
				(n) => n.nodeType === 1,
			);

			let headDataIndex = filteredHeadRowCells.length - 1;
			let headDataCell = filteredHeadRowCells[headDataIndex];
			if (headDataCell !== undefined && headDataCell !== null) {
				headDataCell.style.height = `${h}px`;
			}
		}
	};

	const handleActivateRow = () => {
		if (ref && context === contexts.DATUM.ROW.BODY) {
			activeRowId = ref.parentNode.nextElementSibling?.id;
			$activeRow === activeRowId ? activeRow.set(null) : activeRow.set(activeRowId);
		}
	};

	onMount(() => {
		if (ref && colspan && context === contexts.DATUM.ROW.BODY) {
			ref.parentNode.previousElementSibling.classList.add("duk-table__row--expand");
			ref.parentNode.classList.add("duk-table__row--extra-information");
			setCellHeight(ref);

			ref.parentNode.parentNode.parentNode.classList.add("duk-table__table--expandable");
		}

		const triggerTableResize = new CustomEvent("triggerTableResive"); // eslint-disable-line
		window.addEventListener("triggerTableResize", () => {
			setTimeout(() => {
				setCellHeight(ref);
			}, 20);
		});
	});

	$: h,
		setTimeout(() => {
			setCellHeight(ref);
		}, 50);
</script>

<svelte:window on:resize="{setCellHeight(ref)}" />
{#if context === contexts.DATUM.ROW.HEAD}
	<th
		class="{$$props.class || ''} duk-table__datum duk-table__datum--head"
		class:duk-table__datum--cta="{variant === variants.TABLE.CTA}"
		class:duk-table__datum--success="{variant === variants.TABLE.SUCCESS}"
		class:duk-table__datum--warning="{variant === variants.TABLE.WARNING}"
		class:duk-table__datum--danger="{variant === variants.TABLE.DANGER}"
		class:duk-table__datum--sortable="{dataKey}"
		class:duk-table__datum--hidden="{hidden}"
		data-key="{dataKey}"
	>
		<div class="duk-table__datum--content">
			<slot />
		</div>
	</th>
{:else if context === contexts.DATUM.ROW.FOOT}
	<td
		class="{$$props.class || ''} duk-table__datum duk-table__datum--foot"
		class:duk-table__datum--cta="{variant === variants.TABLE.CTA}"
		class:duk-table__datum--success="{variant === variants.TABLE.SUCCESS}"
		class:duk-table__datum--warning="{variant === variants.TABLE.WARNING}"
		class:duk-table__datum--danger="{variant === variants.TABLE.DANGER}"
	>
		<slot />
	</td>
{:else if colspan}
	<td
		class="{$$props.class || ''} duk-table__datum"
		class:duk-table__datum--cta="{variant === variants.TABLE.CTA}"
		class:duk-table__datum--success="{variant === variants.TABLE.SUCCESS}"
		class:duk-table__datum--warning="{variant === variants.TABLE.WARNING}"
		class:duk-table__datum--danger="{variant === variants.TABLE.DANGER}"
		id="{id}"
		colspan="{colspan}"
		bind:this="{ref}"
		bind:clientHeight="{h}"
	>
		<div class="duk-table__datum--content">
			<slot />
		</div>
	</td>
{:else}
	<td
		class="{$$props.class || ''} duk-table__datum"
		class:duk-table__datum--cta="{variant === variants.TABLE.CTA}"
		class:duk-table__datum--success="{variant === variants.TABLE.SUCCESS}"
		class:duk-table__datum--warning="{variant === variants.TABLE.WARNING}"
		class:duk-table__datum--danger="{variant === variants.TABLE.DANGER}"
		class:duk-table__datum--extra-information="{hidden}"
		id="{id}"
		on:click="{handleActivateRow}"
		on:keypress="{handleActivateRow}"
		bind:this="{ref}"
	>
		<div class="duk-table__datum--content">
			<slot />
		</div>
	</td>
{/if}
