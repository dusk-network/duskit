<script>
	import Group from "@dusk-network/group";
	import Card from "@dusk-network/card";
	import MediaContent from "@dusk-network/media-content";
	import Heading from "@dusk-network/heading";
</script>

<Group align="center">
	<Card>
		<Heading align="center">
			<h4>Heading</h4>
		</Heading>
		<MediaContent align="center">
			<svelte:fragment slot="media">
				<img
					src="https://content.dusk.network/uploads/Group_142_6f43b6f477.svg"
					alt="sample rocket"
				/>
			</svelte:fragment>
		</MediaContent>
	</Card>
	<Card>
		<Heading align="center">
			<h4>Heading</h4>
		</Heading>
		<MediaContent align="center">
			<svelte:fragment slot="media">
				<img
					src="https://content.dusk.network/uploads/Group_703_7454d235d8.svg"
					alt="sample papers"
				/>
			</svelte:fragment>
		</MediaContent>
	</Card>
</Group>
