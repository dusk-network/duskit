<script>
	import Card from "@dusk-network/card";
	import Content from "@dusk-network/content";
	import Menu, { Item } from "@dusk-network/menu";
	import Heading from "@dusk-network/heading";
	import { base } from "$app/paths";
	import { page } from "$app/stores";

	export let title;
	export let components;
</script>

<Card class="sticky top-5 mb-10">
	<Heading size="sm"><h2>{title}</h2></Heading>
	<Content>
		<Menu>
			{#each Object.entries(components) as component}
				<Item
					active="{$page.url.pathname.includes($page.params.package)}"
					href="{base}/components/{component[0]}/{Object.keys(component[1])[0]}"
				>
					{component[0]}
				</Item>
			{/each}
		</Menu>
	</Content>
</Card>
