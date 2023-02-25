<script>
	import Heading from "@dusk-network/heading";
	import Icon from "@dusk-network/icon";

	const icon = "dusk-ticker";
	const heading = "<h1>This is a heading</h1>";
</script>

<Heading>
	<svelte:fragment slot="icon">
		{#if icon}
			<Icon name="{icon}" />
		{/if}
	</svelte:fragment>
	{@html heading}
</Heading>
