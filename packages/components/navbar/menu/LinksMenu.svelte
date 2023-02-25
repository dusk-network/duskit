<script>
	import { setContext } from "svelte";
	import Menu, { Item } from "@dusk-network/menu";
	import contexts from "@dusk-network/utilities/contexts.js";

	export let links;

	setContext("DUK:menu:context", contexts.MENU.NAVBAR);
</script>

<Menu orientation="horizontal" class="duk-navbar__links-menu">
	{#each links as { title, url }}
		<Item
			href="{url}"
			target="{url.lastIndexOf('dusk.network') === -1 && '_blank'}"
			external="{true}"
		>
			<span>{title}</span>
		</Item>
	{/each}
</Menu>
