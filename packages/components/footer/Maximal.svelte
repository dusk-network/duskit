<script>
	import CategoryMenu from "./menu/CategoryMenu.svelte";
	import Newsletter from "./menu/Newsletter.svelte";

	export let categories;
</script>

<div class="duk-footer__maximal" {...$$restProps}>
	{#if categories}
		{#each categories as category}
			<CategoryMenu category="{category}" />
		{/each}
	{/if}
	<Newsletter />
</div>
