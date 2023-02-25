<script>
	import { setContext } from "svelte";
	import Menu, { Item } from "@dusk-network/menu";
	import contexts from "@dusk-network/utilities/contexts.js";

	export let apps;
	export let appName;

	setContext("DUK:menu:context", contexts.MENU.NAVBAR);
</script>

<Menu orientation="horizontal" class="duk-navbar__apps-menu">
	{#each apps as { title, url }}
		<Item href="{url}" active="{appName === title}" external="{true}">
			{title}
		</Item>
	{/each}
</Menu>
