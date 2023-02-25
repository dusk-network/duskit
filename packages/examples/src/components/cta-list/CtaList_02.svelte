<script>
	import CtaList, { Item } from "@dusk-network/cta-list";
	import RichText from "@dusk-network/rich-text";
	import Heading from "@dusk-network/heading";
	import Icon from '@iconify/svelte';
  import emoticonHappy from '@iconify/icons-mdi/emoticon-happy';

	const type = "unordered";
</script>

<CtaList type="{type}">
	<Item>
		<svelte:fragment slot="heading">
			<Heading>
				<svelte:fragment slot="icon">
					<Icon icon={emoticonHappy} />
				</svelte:fragment>
				<h3>A new Blockchain for privacy on a public network</h3>
			</Heading>
		</svelte:fragment>
		<svelte:fragment slot="content">
			<RichText
				>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a lectus ante. Sed
				ultricies vehicula nibh, non dignissim velit convallis posuere. Sed nunc justo, tempor in
				hendrerit non, consectetur quis felis.
			</RichText>
		</svelte:fragment>
	</Item>
	<Item>
		<svelte:fragment slot="heading">
			<Heading>
				<svelte:fragment slot="icon">
					<Icon icon={emoticonHappy} />
				</svelte:fragment>
				<h3>A new Blockchain for privacy on a public network</h3>
			</Heading>
		</svelte:fragment>
	</Item>
	<Item>
		<svelte:fragment slot="heading">
			<Heading>
				<svelte:fragment slot="icon">
					<Icon icon={emoticonHappy} />
				</svelte:fragment>
				<h3>A new Blockchain for privacy on a public network</h3>
			</Heading>
		</svelte:fragment>
	</Item>
</CtaList>
