<script>
	import MediaContent from "@dusk-network/media-content";
	import Heading from "@dusk-network/heading";
	import RichText from "@dusk-network/rich-text";
</script>

<MediaContent>
	<svelte:fragment slot="text">
		<Heading align="center">
			<h3>Heading</h3>
		</Heading>
		<RichText align="center">
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, vitae ipsam saepe incidunt
				atque, dolores repellendus asperiores autem sunt minus esse est laboriosam. Quo enim
				assumenda, atque veniam ex neque.
			</p>
		</RichText>
	</svelte:fragment>
	<svelte:fragment slot="media">
		<img src="https://content.dusk.network/uploads/wallet_109fda512d.png" alt="labs explorer" />
	</svelte:fragment>
</MediaContent>

<MediaContent reverse="{true}">
	<svelte:fragment slot="text">
		<Heading align="center">
			<h3>Heading</h3>
		</Heading>
		<RichText align="center">
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, vitae ipsam saepe incidunt
				atque, dolores repellendus asperiores autem sunt minus esse est laboriosam. Quo enim
				assumenda, atque veniam ex neque.
			</p>
		</RichText>
	</svelte:fragment>
	<svelte:fragment slot="media">
		<img src="https://content.dusk.network/uploads/wallet_109fda512d.png" alt="labs explorer" />
	</svelte:fragment>
</MediaContent>
