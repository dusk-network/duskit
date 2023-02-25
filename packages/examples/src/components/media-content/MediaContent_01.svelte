<script>
	import MediaContent from "@dusk-network/media-content";
	import RichText from "@dusk-network/rich-text";
</script>

<MediaContent valign="top">
	<svelte:fragment slot="text">
		<RichText>
			<h3>Heading</h3>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, vitae ipsam saepe incidunt
				atque, dolores repellendus asperiores autem sunt minus esse est laboriosam. Quo enim
				assumenda, atque veniam ex neque.
			</p>
		</RichText>
	</svelte:fragment>
	<svelte:fragment slot="media">
		<img src="https://picsum.photos/id/1/400/300" alt="picsum" />
	</svelte:fragment>
</MediaContent>
