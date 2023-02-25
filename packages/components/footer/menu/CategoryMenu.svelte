<script>
	import { setContext } from "svelte";
	import contexts from "@dusk-network/utilities/contexts.js";
	import Menu, { Item } from "@dusk-network/menu";

	export let category;

	setContext("DUK:menu:context", contexts.MENU.FOOTER.CATEGORY);
</script>

<Menu orientation="vertical" class="duk-footer__category-menu">
	<h3 class="duk-footer__title" slot="title">{category.title}</h3>

	{#each category.links as { title, url }}
		<Item href="{url}">{title}</Item>
	{/each}
</Menu>
