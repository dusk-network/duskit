<script>
	import { onDestroy } from "svelte";
	import { setContext, getContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import Control from "@dusk-network/control";
	import TextField from "@dusk-network/text-field";
	import Button from "@dusk-network/button";
	import { key } from "./key.js";
	import { createContext } from "./context.js";
	import "./styles.css";

	/**
	 * Provides the dataset to be searched over.
	 */
	export let data = [];

	/**
	 * Used to add a search button to the input field when true
	 */
	export let fieldButton = false;

	let searchValue;

	setContext(key, {});
	createContext();
	const { store, searchTerm, searchResults } = getContext(key);

	export const dataSearchResults = searchResults;

	$: store.set(data);

	onDestroy(() => {
		store.reset();
	});

	const onClick = () => {
		searchTerm.set(searchValue);
	};

	setContext("DUK:control:context", contexts.CONTROL.SEARCH_LIST);
	setContext("DUK:detail-list:context", contexts.DETAIL_LIST.SEARCH_LIST);
</script>

<div class="{$$props.class || ''} duk-search-list">
	{#if fieldButton}
		<Control width="full">
			<Button slot="buttonPostfix" on:click="{onClick}" label="Search">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"
					></path></svg
				>
			</Button>
			<TextField placeholder="Search" bind:value="{searchValue}" />
		</Control>
	{:else}
		<Control width="full">
			<TextField placeholder="Search" bind:value="{$searchTerm}" />
		</Control>
	{/if}
	<div class="duk-search-list__results">
		<slot />
	</div>
</div>
