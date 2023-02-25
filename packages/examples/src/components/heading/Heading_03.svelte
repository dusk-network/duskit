<script>
	import Heading from "@dusk-network/heading";
	import Icon from '@iconify/svelte';
  import emoticonHappy from '@iconify/icons-mdi/emoticon-happy';

	const icon = "dusk-ticker";
	const heading = "<h1>This is a heading</h1>";
</script>

<Heading>
	<svelte:fragment slot="icon">
		{#if icon}
			<Icon icon={emoticonHappy} />
		{/if}
	</svelte:fragment>
	{@html heading}
</Heading>
