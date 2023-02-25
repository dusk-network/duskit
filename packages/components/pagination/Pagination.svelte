<script>
	import { createEventDispatcher, setContext, getContext } from "svelte";
	import Button from "@dusk-network/button";
	import Menu from "@dusk-network/menu";
	import Item from "@dusk-network/menu";
	import contexts from "@dusk-network/utilities/contexts.js";
	import "./styles.css";

	/**
	 * Sets the `ref` attribute on the Pagination
	 */
	export let ref = "";

	/**
	 * Sets the data used by Pagination.
	 */
	export let items = [];

	/**
	 * Sets the number of items per page.
	 */
	export let itemsPerPage = 10;

	/**
	 * Sets the page number og Pagination
	 */
	export let pageNumber = 1;

	const dispatch = createEventDispatcher();
	const context = getContext("DUK:pagination:context");

	const slice = (arr, page) => {
		if (page < 5) {
			return arr.slice(0, 5);
		} else if (page > arr.length - 4) {
			return arr.slice(arr.length - 5, arr.length);
		}
		return arr.slice(page - 2, page + 1);
	};

	const setPage = (number) => {
		pageNumber.set(number);
		dispatch("pagination");
	};

	$: pageCount = Array.from(Array(Math.ceil(items.length / itemsPerPage)).keys());
	$: buttons = slice(pageCount, $pageNumber);

	setContext("DUK:menu:context", contexts.MENU.PAGINATION);
</script>

<nav
	class="{$$props.class || ''} duk-pagination"
	class:duk-pagination--table="{context === contexts.PAGINATION.TABLE}"
	aria-label="Pagination Navigation"
	ref="{ref}"
>
	<Button
		class="duk-pagination__button duk-pagination__button--prev"
		disabled="{$pageNumber === 1}"
		on:click="{() => setPage($pageNumber - 1)}"
		label="Previous Page"
	>
		<svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23744 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.469669 5.46967ZM19 5.25H1V6.75H19V5.25Z"
				fill="white"></path>
		</svg>
	</Button>
	<Menu class="duk-pagination__menu" orientation="horizontal">
		<Item>
			<Button
				class="duk-pagination__button"
				active="{$pageNumber === 1 || undefined}"
				label="First Page"
				on:click="{() => setPage(1)}">1</Button
			>
		</Item>
		{#if pageCount.length > 6 && $pageNumber >= 5}
			<Item class="duk-pagination__ellipsis">
				<span>…</span>
			</Item>
		{/if}
		{#each buttons as buttonNumber}
			{#if buttonNumber > 0 && buttonNumber < pageCount.length - 1}
				<Item>
					<Button
						class="duk-pagination__button"
						active="{$pageNumber === buttonNumber + 1}"
						on:click="{() => setPage(buttonNumber + 1)}"
						label="Select Page">{buttonNumber + 1}</Button
					>
				</Item>
			{/if}
		{/each}
		{#if pageCount.length > 6 && $pageNumber <= pageCount.length - 3}
			<Item class="duk-pagination__ellipsis">
				<span>…</span>
			</Item>
		{/if}
		{#if pageCount.length > 1}
			<Item>
				<Button
					class="duk-pagination__button"
					active="{$pageNumber === pageCount.length}"
					on:click="{() => setPage(pageCount.length)}"
					label="Select Page"
				>
					{pageCount.length}
				</Button>
			</Item>
		{/if}
	</Menu>
	<Button
		class="duk-pagination__button duk-pagination__button--next"
		disabled="{$pageNumber === pageCount.length}"
		on:click="{() => setPage($pageNumber + 1)}"
		label="Next Page"
	>
		<svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M18.5303 6.53033C18.8232 6.23744 18.8232 5.76256 18.5303 5.46967L13.7574 0.696698C13.4645 0.403805 12.9896 0.403805 12.6967 0.696698C12.4038 0.989591 12.4038 1.46447 12.6967 1.75736L16.9393 6L12.6967 10.2426C12.4038 10.5355 12.4038 11.0104 12.6967 11.3033C12.9896 11.5962 13.4645 11.5962 13.7574 11.3033L18.5303 6.53033ZM6.55671e-08 6.75L18 6.75L18 5.25L-6.55671e-08 5.25L6.55671e-08 6.75Z"
				fill="white"></path>
		</svg>
	</Button>
</nav>
