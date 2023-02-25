<script>
	import { setContext } from "svelte";
	import Menu, { Item } from "@dusk-network/menu";
	import contexts from "@dusk-network/utilities/contexts.js";

	export let navigation;
	export let activePath;

	setContext("DUK:menu:context", contexts.MENU.NAVBAR);
</script>

<Menu orientation="horizontal" name="App Navigation">
	{#each navigation as item}
		<Item href="{item.path}" active="{activePath.startsWith(item.path)}">{item.title}</Item>
	{/each}
</Menu>
