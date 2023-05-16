<script>
	import Heading from "@dusk-network/heading";
	import Button from "@dusk-network/button";
	import Icon from "@iconify/svelte";
	import emoticonHappy from "@iconify/icons-mdi/emoticon-happy";

	const icon = "dusk-ticker";
	const heading = "<h1>This is a heading</h1>";
	const button = "Confirm";
</script>

<Heading>
	<svelte:fragment slot="icon">
		{#if icon}
			<Icon icon="{emoticonHappy}" />
		{/if}
	</svelte:fragment>
	{@html heading}
	<svelte:fragment slot="button">
		{#if button}
			<Button>{button}</Button>
		{/if}
	</svelte:fragment>
</Heading>
