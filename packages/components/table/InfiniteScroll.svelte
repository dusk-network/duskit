<script>
	import { createEventDispatcher } from "svelte";
	import LoadingIndicator from "@dusk-network/loading-indicator";
	import Button from "@dusk-network/button";

	/**
	 * Sets the data used by Infinite.
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

	/**
	 * Sets the time duration for the simulated load
	 */
	export let duration = 2000;

	export let variant = "brand";

	const dispatch = createEventDispatcher();

	const nextPage = (number) => {
		pageNumber.set(number);
		dispatch("infinite");
		loading = false;
	};

	const simLoad = () => {
		if (!loading) {
			loading = true;
			setTimeout(() => {
				nextPage($pageNumber + 1);
			}, duration);
		}
	};

	$: pageCount = Array.from(Array(Math.ceil(items.length / itemsPerPage)).keys());

	let loading = false;

	function scrollHandler() {
		if (
			scrollY + 1 + window.innerHeight >= document.documentElement.scrollHeight &&
			window.scrollY !== undefined
		) {
			if ($pageNumber < pageCount.length && $pageNumber % 3 !== 0) {
				simLoad();
			}
		}
	}
</script>

<svelte:window on:scroll="{scrollHandler}" />

<div class="{$$props.class || ''} duk-infinite-scroll">
	{#if loading}
		<LoadingIndicator variant="{variant}" />
	{/if}

	{#if $pageNumber % 3 === 0 && !loading}
		<Button on:click="{() => simLoad()}" label="Load More">Load More</Button>
	{/if}
</div>
