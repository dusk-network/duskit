<script>
	import { page } from "$app/stores";
	import { base } from "$app/paths";
	import Navbar from "@dusk-network/navbar";
	import Menu, { Item } from "@dusk-network/menu";
	import { isSettingsVisible } from "$lib/store.js";

	// export let components;
</script>

<Navbar
	variant="brand"
	id="__app-top-nav"
	appName="Dusk UI Kit"
	on:settings="{() => {
		isSettingsVisible.update(() => true);
	}}"
>
	<svelte:fragment slot="apps">
		<Menu orientation="horizontal" name="Portal Navigation">
			<Item href="{base}/" active="{true}">UI Kit Documentation</Item>
		</Menu>
	</svelte:fragment>
	<svelte:fragment slot="navigation">
		<Menu orientation="horizontal" name="App Navigation">
			<Item href="{base}/components" active="{$page.url.pathname.includes('components')}"
				>Components</Item
			>
		</Menu>
	</svelte:fragment>
</Navbar>
