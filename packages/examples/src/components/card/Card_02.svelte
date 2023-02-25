<script>
	import Card from "@dusk-network/card";
	import Heading from "@dusk-network/heading";
	import Content from "@dusk-network/content";
	import RichText from "@dusk-network/rich-text";
	import Icon from '@iconify/svelte';
  import emoticonHappy from '@iconify/icons-mdi/emoticon-happy';
</script>

<Card>
	<Heading>
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<h2>Primary Heading!</h2>
	</Heading>
	<Heading variant="danger">
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<h2>Error heading!</h2>
	</Heading>
	<Heading variant="warning">
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<h2>Warning heading!</h2>
	</Heading>
	<Heading variant="success">
		<svelte:fragment slot="icon">
			<Icon icon={emoticonHappy} />
		</svelte:fragment>
		<h2>Success heading!</h2>
	</Heading>
	<Content>
		<RichText>
			<p>Don't end on an empty Heading!</p>
		</RichText>
	</Content>
</Card>
