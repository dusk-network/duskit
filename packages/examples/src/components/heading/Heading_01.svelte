<script>
	import Heading from "@dusk-network/heading";
	import Button from "@dusk-network/button";
	import Icon from "@dusk-network/icon";

	const icon = "dusk-ticker";
	const heading = "<h1>This is a heading</h1>";
	const button = "Confirm";
</script>

<Heading>
	<svelte:fragment slot="icon">
		{#if icon}
			<Icon name="{icon}" />
		{/if}
	</svelte:fragment>
	{@html heading}
	<svelte:fragment slot="button">
		{#if button}
			<Button>{button}</Button>
		{/if}
	</svelte:fragment>
</Heading>
