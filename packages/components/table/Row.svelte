<script>
	import { onMount, setContext, getContext, createEventDispatcher } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import variants from "@dusk-network/utilities/variants.js";
	import { key } from "./key.js";

	/**
	 * Sets the type of table row
	 * @type { "head" | "foot"}
	 */
	export let type = null;

	/**
	 * Sets the row as hidden to be used as the expandable information
	 */
	export let hidden = false;

	/**
	 * Sets the variant of the table row
	 */
	export let variant = variants.TABLE.DEFAULT;

	/**
	 * Sets the `id` of the Row if set, otherwise the ID is generated.
	 * @type {string}
	 */
	export let id = "__DUK-table-row" + Math.random().toString(36);

	/**
	 * Sets the data that will be passed to the `on:selected` event.
	 */
	export let data = {};

	/**
	 * Used to define that the next sibling Row is expandable. Must be set to `true` if Row is to be expandable.
	 */
	export let info = false;

	/**
	 * Used to set the active Row on mount.
	 */
	export let active = false;

	/**
	 * Used to make the Row highlight on selection.
	 */
	export let highlight = true;

	const dispatch = createEventDispatcher();

	const { activeRow } = getContext(key);

	let ref;

	function getDatumContext(type) {
		let context = contexts.DATUM.ROW.BODY;
		if (type === "head") context = contexts.DATUM.ROW.HEAD;
		if (type === "foot") context = contexts.DATUM.ROW.FOOT;
		return context;
	}

	const setActiveHeadRow = (el, highlight) => {
		if (el !== undefined && el !== null) {
			let rowIndex = Array.prototype.indexOf.call(el.parentNode.children, el);
			if (el.parentNode.previousElementSibling) {
				let filterArr = Array.prototype.filter.call(
					el.parentNode.previousElementSibling.childNodes,
					(n) => n.nodeType === 1,
				);
				let selectedHeadRow = filterArr[rowIndex];

				filterArr.forEach((element) => {
					if (element.classList) {
						if (element.classList.contains("duk-table__header-row--selected")) {
							element.classList.remove("duk-table__header-row--selected");
						}
					}
				});
				if (highlight) {
					selectedHeadRow.classList.add("duk-table__header-row--selected");
				}
			}
		}
	};
	const setActiveExtraInfoHeadRow = (el, highlight) => {
		if (el !== undefined && el !== null) {
			let rowIndex = Array.prototype.indexOf.call(el.parentNode.children, el);
			if (el.parentNode.previousElementSibling) {
				let filterArr = Array.prototype.filter.call(
					el.parentNode.previousElementSibling.childNodes,
					(n) => n.nodeType === 1,
				);
				let selectedHeadRow = el.parentNode.previousElementSibling.childNodes[rowIndex];

				filterArr.forEach((element) => {
					if (element.classList) {
						if (element.classList.contains("duk-table__header-row--selected")) {
							element.classList.remove("duk-table__header-row--selected");
						}
					}
				});
				if (highlight) {
					selectedHeadRow.classList.add("duk-table__header-row--selected");
				}
			}

			el.parentNode.childNodes.forEach((element) => {
				if (element.classList) {
					if (element.classList.contains("duk-table__body-row--selected")) {
						element.classList.remove("duk-table__body-row--selected");
					}
				}
			});
			if (highlight) {
				el.classList.add("duk-table__body-row--selected");
				el.nextElementSibling.classList.add("duk-table__body-row--selected");
			}
		}
	};

	function handleSelect(id) {
		if (Object.entries(data).length !== 0) {
			if (highlight) {
				ref.parentNode.parentNode.classList.add("duk-table__table--selectable");
			}
			if (!info) {
				activeRow.set(id);
				setActiveHeadRow(ref, highlight);
			} else {
				setActiveExtraInfoHeadRow(ref, highlight);
			}
			dispatch("selected", data);
		}
	}

	onMount(() => {
		if (active) {
			handleSelect(id);
		}
	});

	setContext("DUK:table:row:datum:context", getDatumContext(type));
</script>

<tr
	class="{$$props.class || ''} duk-table__row"
	class:duk-table__row--cta="{variant === variants.TABLE.CTA}"
	class:duk-table__row--success="{variant === variants.TABLE.SUCCESS}"
	class:duk-table__row--warning="{variant === variants.TABLE.WARNING}"
	class:duk-table__row--danger="{variant === variants.TABLE.DANGER}"
	class:duk-table__row--active="{$activeRow === id}"
	class:duk-table__row--selected="{$activeRow === id &&
		Object.entries(data).length !== 0 &&
		highlight}"
	class:duk-table__row--hidden="{hidden}"
	id="{id}"
	on:click="{handleSelect(id)}"
	on:keypress="{handleSelect(id)}"
	bind:this="{ref}"
>
	<slot />
</tr>
